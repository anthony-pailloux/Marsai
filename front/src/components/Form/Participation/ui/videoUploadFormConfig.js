export const VIDEO_UPLOAD_DRAFT_KEY = "videoUploadDraft";

export const INITIAL_UPLOAD_FILES = {
  video: null,
  cover: null,
  stills: [null, null, null],
  subtitles: [],
};

export const INITIAL_UPLOAD_FORM = {
  youtube_video_id: "",
  title: "",
  title_en: "",
  synopsis: "",
  synopsis_en: "",
  language: "",
  country: "",
  duration: "",
  tech_resume: "",
  ai_tech: "",
  creative_resume: "",
  email: "",
  director_name: "",
  director_lastname: "",
  director_gender: "Mr",
  birthday: "",
  mobile_number: "",
  home_number: "",
  address: "",
  director_country: "",
  discovery_source: "",
};

export function readTagsFromStorage() {
  try {
    const saved = JSON.parse(localStorage.getItem("video_tags") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}
