/**
 * Constantes partagées — validation participation film (front + back).
 * Modifier ici pour garder les deux côtés synchronisés.
 */

export const VIDEO_FORMATS = [".mp4", ".mov"];
export const VIDEO_MIME_TYPES = ["video/mp4", "video/quicktime"];

export const PICTURE_FORMATS = [".jpg", ".jpeg", ".webp", ".png"];
export const PICTURE_MIME_TYPES = [
  "image/jpeg",
  "image/jpeg",
  "image/webp",
  "image/png",
];

export const MAX_VIDEO_FILE_SIZE = 350 * 1024 * 1024;
export const MAX_VIDEO_FILE_SIZE_MB = 350;
export const MIN_VIDEO_FILE_SIZE = 20 * 1024 * 1024;
export const MIN_VIDEO_FILE_SIZE_MB = 20;
export const MAX_VIDEO_DURATION_SECONDS = 130;

export const MIN_PICTURE_FILE_SIZE = 100 * 1024;
export const MIN_PICTURE_FILE_SIZE_LABEL = "0.1 Mb (100 Kb)";
export const MAX_PICTURE_FILE_SIZE = 15 * 1024 * 1024;
export const MAX_PICTURE_FILE_SIZE_LABEL = "15 Mb";
