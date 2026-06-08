import { toBackendBirthday } from "../../../../../../shared/validation/filmValidationHelpers.js";
import { getApiUrl } from "../../../../utils/apiBase.js";
import { validateFilmUpload } from "./videoUploadValidation.js";

function readContributorsFromStorage() {
  try {
    const saved = JSON.parse(localStorage.getItem("contributors") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function buildVideoUploadFormData({ form, files, tags, ownership }) {
  const safeTags = Array.isArray(tags) ? tags : [];
  const contributors = readContributorsFromStorage();

  const zodCheck = validateFilmUpload({
    form,
    files,
    tags: safeTags,
    contributors,
  });

  if (!zodCheck.ok) {
    throw new Error(zodCheck.message);
  }

  const fd = new FormData();

  Object.entries(form).forEach(([k, v]) => {
    if (v === "" || v === null || v === undefined) return;
    fd.append(k, k === "birthday" ? toBackendBirthday(v) : v);
  });

  localStorage.setItem("video_tags", JSON.stringify(safeTags));
  fd.append("tags", JSON.stringify(safeTags));
  fd.append("contributors", JSON.stringify(contributors));
  fd.append("ownership_certified", ownership?.ownershipCertified ? "1" : "0");
  fd.append("promo_consent", ownership?.promoConsent ? "1" : "0");
  fd.append("terms_accepted", ownership?.termsAccepted ? "1" : "0");
  fd.append("age_confirmed", ownership?.ageConfirmed ? "1" : "0");

  const recaptchaToken = ownership?.recaptchaToken || "";
  if (!recaptchaToken) throw new Error("Captcha missing");
  fd.append("recaptcha_token", recaptchaToken);

  fd.append("video", files.video);
  fd.append("cover", files.cover);
  files.stills.forEach((f) => {
    if (f) fd.append("stills", f);
  });
  files.subtitles.forEach((f) => fd.append("subtitles", f));

  return fd;
}

export async function submitVideoUpload({ form, files, tags, ownership, t }) {
  const fd = buildVideoUploadFormData({ form, files, tags, ownership });

  const res = await fetch(`${getApiUrl()}/videos`, {
    method: "POST",
    body: fd,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(
      data?.details ||
        data?.error ||
        `${t("upload.uploadError")} (${res.status})`,
    );
  }

  return data;
}
