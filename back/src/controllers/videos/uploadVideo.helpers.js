import path from "path";
import fs from "fs";
import {
  uploadVideoFromDisk,
  uploadCoverFromDisk,
  uploadStillFromDisk,
  uploadSubtitleFromDisk,
} from "../../services/scalewayS3.service.js";

export function normalizeLangFromFilename(filename) {
  const lower = String(filename || "").toLowerCase();
  const m = lower.match(/[\W_.-](fr|en|es|it|de|pt|ar|nl|ru|zh|ja|ko)[\W_.-]/);
  return m ? m[1] : null;
}

export function isSrtFile(file) {
  const ext = path.extname(file?.originalname || "").toLowerCase();
  return ext === ".srt";
}

export async function safeUnlink(filePath) {
  try {
    if (filePath) await fs.promises.unlink(filePath);
  } catch {
    // ignore
  }
}

/** Vérifie la présence et le type des fichiers uploadés (Multer). */
export function validateUploadFiles(files) {
  const videoFile = files?.video?.[0];
  const coverFile = files?.cover?.[0];
  const stillFiles = files?.stills || [];
  const subtitleFiles = files?.subtitles || [];

  if (!videoFile) {
    return {
      ok: false,
      status: 400,
      body: { error: "Fichier vidéo manquant (video)." },
    };
  }
  if (!coverFile) {
    return {
      ok: false,
      status: 400,
      body: { error: "Image cover manquante (cover)." },
    };
  }
  if (stillFiles.length === 0) {
    return {
      ok: false,
      status: 400,
      body: { error: "Au moins 1 still requis (stills)." },
    };
  }
  if (subtitleFiles.length === 0) {
    return {
      ok: false,
      status: 400,
      body: { error: "Au moins 1 sous-titre requis (subtitles)." },
    };
  }

  const nonSrt = subtitleFiles.find((f) => !isSrtFile(f));
  if (nonSrt) {
    return {
      ok: false,
      status: 400,
      body: {
        error: "SRT_TYPE_NOT_ALLOWED",
        details: "Seuls les fichiers .srt sont autorisés pour subtitles.",
        file: nonSrt.originalname,
      },
    };
  }

  return {
    ok: true,
    videoFile,
    coverFile,
    stillFiles,
    subtitleFiles,
  };
}

/** Envoie vidéo, cover, stills et sous-titres vers S3. */
export async function uploadMediaToS3({
  videoFile,
  coverFile,
  stillFiles,
  subtitleFiles,
}) {
  const filesToDeleteLater = [];

  let s3Video;
  try {
    s3Video = await uploadVideoFromDisk({
      localPath: videoFile.path,
      filename: videoFile.filename,
      mimetype: videoFile.mimetype,
    });
    filesToDeleteLater.push(videoFile.path);
  } catch (err) {
    return {
      ok: false,
      status: 500,
      body: { error: "S3_VIDEO_UPLOAD_FAILED", details: err.message },
    };
  }

  let s3Cover;
  try {
    s3Cover = await uploadCoverFromDisk({
      localPath: coverFile.path,
      filename: coverFile.filename,
      mimetype: coverFile.mimetype,
    });
    filesToDeleteLater.push(coverFile.path);
  } catch (err) {
    return {
      ok: false,
      status: 500,
      body: { error: "S3_COVER_UPLOAD_FAILED", details: err.message },
    };
  }

  const stillsPayloadForDb = [];
  try {
    for (const sf of stillFiles) {
      const s3Still = await uploadStillFromDisk({
        localPath: sf.path,
        filename: sf.filename,
        mimetype: sf.mimetype,
      });

      stillsPayloadForDb.push({
        ...sf,
        filename: s3Still.key,
      });

      filesToDeleteLater.push(sf.path);
    }
  } catch (err) {
    return {
      ok: false,
      status: 500,
      body: { error: "S3_STILLS_UPLOAD_FAILED", details: err.message },
    };
  }

  const subtitlesPayloadForDb = [];
  try {
    for (const sub of subtitleFiles) {
      const s3Sub = await uploadSubtitleFromDisk({
        localPath: sub.path,
        filename: sub.filename,
        mimetype: sub.mimetype,
      });

      subtitlesPayloadForDb.push({
        file_name: s3Sub.key,
        language: normalizeLangFromFilename(sub.originalname) || null,
      });

      filesToDeleteLater.push(sub.path);
    }
  } catch (err) {
    return {
      ok: false,
      status: 500,
      body: { error: "S3_SUBTITLES_UPLOAD_FAILED", details: err.message },
    };
  }

  return {
    ok: true,
    s3Video,
    s3Cover,
    stillsPayloadForDb,
    subtitlesPayloadForDb,
    filesToDeleteLater,
  };
}
