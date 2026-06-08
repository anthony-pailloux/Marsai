import { VIDEO_UPLOAD_DRAFT_KEY } from "./videoUploadFormConfig.js";

export function restoreVideoUploadDraft() {
  const savedDraft = localStorage.getItem(VIDEO_UPLOAD_DRAFT_KEY);
  if (!savedDraft) return { form: null, tags: null };

  try {
    const d = JSON.parse(savedDraft);
    return {
      form: d?.form || null,
      tags: Array.isArray(d?.tags) ? d.tags : null,
    };
  } catch {
    return { form: null, tags: null };
  }
}

export function saveVideoUploadDraft(form, tags) {
  localStorage.setItem(VIDEO_UPLOAD_DRAFT_KEY, JSON.stringify({ form, tags }));
}

export function mergeDirectorProfileIntoForm(prevForm) {
  const saved = localStorage.getItem("directorProfile");
  if (!saved) return prevForm;

  try {
    const p = JSON.parse(saved);
    return {
      ...prevForm,
      email: p.email || prevForm.email,
      director_name: p.firstName || prevForm.director_name,
      director_lastname: p.lastName || prevForm.director_lastname,
      director_gender: p.gender || prevForm.director_gender,
      birthday: p.birthday || prevForm.birthday,
      address: p.address || prevForm.address,
      director_country: p.director_country || prevForm.director_country,
      discovery_source: p.discovery_source || prevForm.discovery_source,
      mobile_number: p.mobile_number || prevForm.mobile_number,
      home_number: p.home_number || prevForm.home_number,
    };
  } catch {
    return prevForm;
  }
}
