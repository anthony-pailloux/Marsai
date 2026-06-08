/** Règles de validation du formulaire d'upload vidéo (étape 2 → 3 et envoi final). */

export function readOwnershipFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("ownership") || "{}");
  } catch {
    return {};
  }
}

/** Champs texte + fichiers requis pour passer à l'étape 3. */
export function canProceedToStep3(form, files) {
  const durationNum = Number(form.duration);

  return Boolean(
    form.title.trim() &&
      form.title_en.trim() &&
      form.synopsis.trim() &&
      form.synopsis_en.trim() &&
      form.language.trim() &&
      form.country.trim() &&
      Number.isFinite(durationNum) &&
      durationNum > 0 &&
      form.tech_resume.trim() &&
      form.ai_tech.trim() &&
      form.creative_resume.trim() &&
      form.email.trim() &&
      form.director_name.trim() &&
      form.director_lastname.trim() &&
      (form.director_gender === "Mr" || form.director_gender === "Mrs") &&
      form.birthday.trim() &&
      form.address.trim() &&
      form.director_country.trim() &&
      form.discovery_source.trim() &&
      form.mobile_number.trim() &&
      files.video &&
      files.cover &&
      files.stills[0] &&
      files.subtitles.length > 0,
  );
}

/** Validation complète avant envoi (formulaire + cases ownership + captcha). */
export function canSubmitUpload(form, files, ownership) {
  const termsOk = !!ownership?.termsAccepted;
  const ageOk = !!ownership?.ageConfirmed;
  const robotOk = !!ownership?.recaptchaToken;

  return canProceedToStep3(form, files) && termsOk && ageOk && robotOk;
}
