export const VIDEO_STATUS_OPTIONS = [
  "All",
  "Pending",
  "Published",
  "Rejected",
  "Uploading",
  "Processing",
  "Failed",
];

export const VIDEO_STATUS_EDIT_OPTIONS = VIDEO_STATUS_OPTIONS.filter(
  (s) => s !== "All",
);

export function formatVideoDuration(seconds) {
  const s = Number(seconds);
  if (!Number.isFinite(s) || s <= 0) return "—";
  const minutes = Math.round(s / 60);
  return `${minutes} min`;
}

export function formatVideoDate(value) {
  if (!value) return "—";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return String(value);
  return dt.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export function filterAdminVideos(videos, { q, statusFilter }) {
  const s = q.trim().toLowerCase();

  return videos
    .filter((v) => {
      if (statusFilter === "All") return true;
      return String(v.upload_status) === statusFilter;
    })
    .filter((v) => {
      if (!s) return true;
      const hay = [
        v.title,
        v.title_en,
        v.director_name,
        v.director_lastname,
        v.country,
        v.language,
        v.email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(s);
    });
}
