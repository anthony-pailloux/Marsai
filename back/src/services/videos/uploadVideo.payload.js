const REQUIRED_FIELDS = [
  "title",
  "title_en",
  "synopsis",
  "synopsis_en",
  "language",
  "country",
  "duration",
  "tech_resume",
  "ai_tech",
  "creative_resume",
  "email",
  "director_name",
  "director_lastname",
  "director_gender",
  "birthday",
  "address",
  "director_country",
  "discovery_source",
];

function parseJsonArray(raw, fallback = []) {
  try {
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function toNullIfEmpty(v) {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
}

export function normalizeDirectorGender(director_gender) {
  const genderRaw = String(director_gender || "")
    .trim()
    .toLowerCase();

  if (["m", "mr", "male", "homme", "man", "monsieur"].includes(genderRaw)) {
    return "Mr";
  }
  if (
    ["f", "mrs", "female", "femme", "woman", "madame"].includes(genderRaw)
  ) {
    return "Mrs";
  }
  if (director_gender === "Mr" || director_gender === "Mrs") {
    return director_gender;
  }

  return null;
}

export function parseUploadBody(body) {
  const contributorsList = parseJsonArray(body.contributors);
  const tagsList = parseJsonArray(body.tags);

  return {
    ...body,
    contributorsList,
    tagsList,
    ownershipCertifiedBool: body.ownership_certified === "1",
    promoConsentBool: body.promo_consent === "1",
  };
}

export function validateUploadBody(parsed) {
  const missing = REQUIRED_FIELDS.filter((key) => {
    const value = parsed[key];
    return value === undefined || value === null || String(value).trim() === "";
  });

  if (missing.length) {
    return { ok: false, status: 400, body: { error: "Champs manquants", missing } };
  }

  const durationNum = Number(parsed.duration);
  if (!Number.isFinite(durationNum) || durationNum <= 0) {
    return {
      ok: false,
      status: 400,
      body: {
        error: "duration invalide",
        details: "duration doit être un nombre > 0",
        received: parsed.duration,
      },
    };
  }

  const directorGenderDb = normalizeDirectorGender(parsed.director_gender);
  if (!directorGenderDb) {
    return {
      ok: false,
      status: 400,
      body: {
        error: "director_gender invalide",
        details:
          "Valeurs acceptées : Mr / Mrs (ou m/f, male/female, homme/femme).",
        received: parsed.director_gender,
      },
    };
  }

  return { ok: true, durationNum, directorGenderDb };
}

export function buildVideoDbPayload(parsed, s3Video, s3Cover, durationNum, directorGenderDb) {
  return {
    youtube_video_id: toNullIfEmpty(parsed.youtube_video_id),
    video_file_name: s3Video.key,
    cover: s3Cover.key,
    title: String(parsed.title).trim(),
    title_en: String(parsed.title_en).trim(),
    synopsis: String(parsed.synopsis).trim(),
    synopsis_en: String(parsed.synopsis_en).trim(),
    language: String(parsed.language).trim(),
    country: String(parsed.country).trim(),
    duration: durationNum,
    tech_resume: String(parsed.tech_resume).trim(),
    ai_tech: String(parsed.ai_tech).trim(),
    creative_resume: String(parsed.creative_resume).trim(),
    email: String(parsed.email).trim(),
    director_name: String(parsed.director_name).trim(),
    director_lastname: String(parsed.director_lastname).trim(),
    director_gender: directorGenderDb,
    birthday: String(parsed.birthday).trim(),
    mobile_number: toNullIfEmpty(parsed.mobile_number),
    home_number: toNullIfEmpty(parsed.home_number),
    address: String(parsed.address).trim(),
    director_country: String(parsed.director_country).trim(),
    discovery_source: String(parsed.discovery_source).trim(),
    upload_status: "Pending",
  };
}
