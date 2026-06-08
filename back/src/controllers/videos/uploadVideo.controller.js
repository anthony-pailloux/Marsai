import stillsModel from "../../models/stills.model.js";
import videosModel from "../../models/videos.model.js";
import subtitlesModel from "../../models/subtitles.model.js";
import { pool } from "../../db/index.js";
import { normalizeTags, upsertTags } from "../../models/tags.model.js";
import { insertVideoTags } from "../../models/videoTags.model.js";
import { uploadToYouTube } from "../../services/youtube.service.js";
import {
  safeUnlink,
  uploadMediaToS3,
  validateUploadFiles,
} from "./uploadVideo.helpers.js";

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

    const {
      youtube_video_id,
      title,
      title_en,
      synopsis,
      synopsis_en,
      language,
      country,
      duration,
      tech_resume,
      ai_tech,
      creative_resume,
      email,
      director_name,
      director_lastname,
      director_gender,
      birthday,
      mobile_number,
      home_number,
      address,
      director_country,
      discovery_source,
      contributors,
      ownership_certified,
      promo_consent,
      tags,
    } = req.body;

    let contributorsList = [];
    try {
      const parsed = JSON.parse(contributors || "[]");
      contributorsList = Array.isArray(parsed) ? parsed : [];
    } catch {
      contributorsList = [];
    }

    const ownershipCertifiedBool = ownership_certified === "1";
    const promoConsentBool = promo_consent === "1";

    let tagsList = [];
    try {
      const parsedTags = JSON.parse(tags || "[]");
      tagsList = Array.isArray(parsedTags) ? parsedTags : [];
    } catch {
      tagsList = [];
    }

    const required = {
      title,
      title_en,
      synopsis,
      synopsis_en,
      language,
      country,
      duration,
      tech_resume,
      ai_tech,
      creative_resume,
      email,
      director_name,
      director_lastname,
      director_gender,
      birthday,
      address,
      director_country,
      discovery_source,
    };

    const missing = Object.entries(required)
      .filter(
        ([, v]) => v === undefined || v === null || String(v).trim() === "",
      )
      .map(([k]) => k);

    if (missing.length) {
      return res.status(400).json({ error: "Champs manquants", missing });
    }

    const durationNum = Number(duration);
    if (!Number.isFinite(durationNum) || durationNum <= 0) {
      return res.status(400).json({
        error: "duration invalide",
        details: "duration doit être un nombre > 0",
        received: duration,
      });
    }

    const genderRaw = String(director_gender || "")
      .trim()
      .toLowerCase();
    let directorGenderDb = null;

    if (["m", "mr", "male", "homme", "man", "monsieur"].includes(genderRaw)) {
      directorGenderDb = "Mr";
    }
    if (
      ["f", "mrs", "female", "femme", "woman", "madame"].includes(genderRaw)
    ) {
      directorGenderDb = "Mrs";
    }
    if (director_gender === "Mr" || director_gender === "Mrs") {
      directorGenderDb = director_gender;
    }

    if (!directorGenderDb) {
      return res.status(400).json({
        error: "director_gender invalide",
        details:
          "Valeurs acceptées : Mr / Mrs (ou m/f, male/female, homme/femme).",
        received: director_gender,
      });
    }

    const toNullIfEmpty = (v) => {
      if (v === undefined || v === null) return null;
      const s = String(v).trim();
      return s === "" ? null : s;
    };

    const payload = {
      youtube_video_id: toNullIfEmpty(youtube_video_id),
      video_file_name: s3Video.key,
      cover: s3Cover.key,
      title: String(title).trim(),
      title_en: String(title_en).trim(),
      synopsis: String(synopsis).trim(),
      synopsis_en: String(synopsis_en).trim(),
      language: String(language).trim(),
      country: String(country).trim(),
      duration: durationNum,
      tech_resume: String(tech_resume).trim(),
      ai_tech: String(ai_tech).trim(),
      creative_resume: String(creative_resume).trim(),
      email: String(email).trim(),
      director_name: String(director_name).trim(),
      director_lastname: String(director_lastname).trim(),
      director_gender: directorGenderDb,
      birthday: String(birthday).trim(),
      mobile_number: toNullIfEmpty(mobile_number),
      home_number: toNullIfEmpty(home_number),
      address: String(address).trim(),
      director_country: String(director_country).trim(),
      discovery_source: String(discovery_source).trim(),
      upload_status: "Pending",
    };

    await conn.beginTransaction();

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

    const cleanTags = normalizeTags(tagsList);

    if (cleanTags.length > 0) {
      const tagRows = await upsertTags(cleanTags, conn);
      await insertVideoTags(videoId, tagRows, conn);
    }

    await stillsModel.insertStills(videoId, stillsPayloadForDb, conn);
    await subtitlesModel.insertSubtitles(videoId, subtitlesPayloadForDb, conn);

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
