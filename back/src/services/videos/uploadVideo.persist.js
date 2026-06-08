import stillsModel from "../../models/stills.model.js";
import videosModel from "../../models/videos.model.js";
import subtitlesModel from "../../models/subtitles.model.js";
import { normalizeTags, upsertTags } from "../../models/tags.model.js";
import { insertVideoTags } from "../../models/videoTags.model.js";
import { uploadToYouTube } from "../youtube.service.js";

export async function insertContributors(conn, videoId, contributorsList) {
  for (const c of contributorsList) {
    const fullNameRaw = String(c?.full_name || "").trim();
    const profession = String(c?.profession || "").trim();
    const cEmail = String(c?.email || "").trim();
    const cGender = c?.gender === "Mrs" ? "Mrs" : "Mr";

    if (!fullNameRaw || !profession || !cEmail) continue;

    const parts = fullNameRaw.split(/\s+/);
    const firstName = parts.shift();
    const lastName = parts.join(" ") || null;

    await conn.query(
      `
      INSERT INTO contributor
        (video_id, name, last_name, gender, email, profession)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [videoId, firstName, lastName, cGender, cEmail, profession],
    );
  }
}

export async function persistVideoUpload(conn, options) {
  const {
    payload,
    contributorsList,
    tagsList,
    stillsPayloadForDb,
    subtitlesPayloadForDb,
    ownershipCertifiedBool,
    promoConsentBool,
    coverFile,
    subtitleFiles,
  } = options;

  const videoId = await videosModel.createVideo(payload, conn);

  let youtubeVideoId = null;
  try {
    youtubeVideoId = await uploadToYouTube({
      videoFile: payload.video_file_name,
      title: payload.title,
      description: payload.synopsis,
      coverFile: coverFile.filename,
      subtitlesFile: subtitleFiles[0]?.filename || null,
    });

    await conn.query("UPDATE videos SET youtube_video_id = ? WHERE id = ?", [
      youtubeVideoId,
      videoId,
    ]);
  } catch {
    // pas bloquant
  }

  await conn.query(
    `
    UPDATE videos
    SET
      ownership_certified = ?,
      ownership_certified_at = ?,
      promo_consent = ?,
      promo_consent_at = ?
    WHERE id = ?
    `,
    [
      ownershipCertifiedBool ? 1 : 0,
      ownershipCertifiedBool ? new Date() : null,
      promoConsentBool ? 1 : 0,
      promoConsentBool ? new Date() : null,
      videoId,
    ],
  );

  await insertContributors(conn, videoId, contributorsList);

  const cleanTags = normalizeTags(tagsList);
  if (cleanTags.length > 0) {
    const tagRows = await upsertTags(cleanTags, conn);
    await insertVideoTags(videoId, tagRows, conn);
  }

  await stillsModel.insertStills(videoId, stillsPayloadForDb, conn);
  await subtitlesModel.insertSubtitles(videoId, subtitlesPayloadForDb, conn);

  return { videoId, youtubeVideoId, cleanTags };
}
