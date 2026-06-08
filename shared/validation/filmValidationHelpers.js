/**
 * Helpers pour préparer les données avant validation Zod côté front.
 */

/** Convertit YYYY-MM-DD (input date) vers DD-MM-YYYY attendu par l'API. */
export function toBackendBirthday(value) {
  const raw = String(value || "").trim();
  if (!raw) return raw;

  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return `${iso[3]}-${iso[2]}-${iso[1]}`;

  return raw;
}

/** Objet formulaire prêt pour createFilmSchema.parse(). */
export function buildCreateFilmPayload(form, { tags = [], contributors = [] } = {}) {
  return {
    ...form,
    birthday: toBackendBirthday(form.birthday),
    tags: JSON.stringify(tags),
    contributors: JSON.stringify(contributors),
    ownership_certified: "0",
    promo_consent: "0",
  };
}

/** Formate les File du navigateur comme le middleware multer côté back. */
export function buildUploadFilesPayload(files) {
  const toImageEntry = (file) =>
    file ? { mimetype: file.type, size: file.size } : null;

  const stills = (files.stills || []).filter(Boolean).map(toImageEntry);
  const subtitles = (files.subtitles || []).map((file) => ({
    originalname: file.name,
  }));

  return {
    video: files.video
      ? [{ mimetype: files.video.type, size: files.video.size }]
      : [],
    cover: files.cover
      ? [{ mimetype: files.cover.type, size: files.cover.size }]
      : [],
    ...(stills.length ? { stills } : {}),
    ...(subtitles.length ? { subtitles } : {}),
  };
}
