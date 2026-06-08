import { pool } from "../../db/index.js";
import {
  safeUnlink,
  uploadMediaToS3,
  validateUploadFiles,
} from "./uploadVideo.helpers.js";
import {
  buildVideoDbPayload,
  parseUploadBody,
  validateUploadBody,
} from "../../services/videos/uploadVideo.payload.js";
import { persistVideoUpload } from "../../services/videos/uploadVideo.persist.js";

async function uploadVideoController(req, res) {
  const conn = await pool.getConnection();

  try {
    const fileCheck = validateUploadFiles(req.files);
    if (!fileCheck.ok) {
      return res.status(fileCheck.status).json(fileCheck.body);
    }

    const { videoFile, coverFile, stillFiles, subtitleFiles } = fileCheck;

    const s3Result = await uploadMediaToS3({
      videoFile,
      coverFile,
      stillFiles,
      subtitleFiles,
    });
    if (!s3Result.ok) {
      return res.status(s3Result.status).json(s3Result.body);
    }

    const {
      s3Video,
      s3Cover,
      stillsPayloadForDb,
      subtitlesPayloadForDb,
      filesToDeleteLater,
    } = s3Result;

    const parsed = parseUploadBody(req.body);
    const bodyCheck = validateUploadBody(parsed);
    if (!bodyCheck.ok) {
      return res.status(bodyCheck.status).json(bodyCheck.body);
    }

    const payload = buildVideoDbPayload(
      parsed,
      s3Video,
      s3Cover,
      bodyCheck.durationNum,
      bodyCheck.directorGenderDb,
    );

    await conn.beginTransaction();

    const { videoId, youtubeVideoId, cleanTags } = await persistVideoUpload(
      conn,
      {
        payload,
        contributorsList: parsed.contributorsList,
        tagsList: parsed.tagsList,
        stillsPayloadForDb,
        subtitlesPayloadForDb,
        ownershipCertifiedBool: parsed.ownershipCertifiedBool,
        promoConsentBool: parsed.promoConsentBool,
        coverFile,
        subtitleFiles,
      },
    );

    await conn.commit();

    for (const p of filesToDeleteLater) {
      await safeUnlink(p);
    }

    return res.status(201).json({
      message: "Upload OK",
      videoId,
      youtube_video_id: youtubeVideoId,
      tags: cleanTags,
      s3: {
        video: s3Video.key,
        cover: s3Cover.key,
        stills: stillsPayloadForDb.map((s) => s.filename),
        subtitles: subtitlesPayloadForDb.map((s) => s.file_name),
      },
    });
  } catch (e) {
    try {
      await conn.rollback();
    } catch {}

    return res
      .status(500)
      .json({ error: "Erreur serveur", details: e.message });
  } finally {
    conn.release();
  }
}

export default uploadVideoController;
