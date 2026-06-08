import { getApiBaseUrl } from "./apiBase.js";

/** Tri par score décroissant, puis nombre de votes, puis id. */
export function sortLeaderboardItems(items) {
  const arr = Array.isArray(items) ? [...items] : [];
  return arr.sort((a, b) => {
    const sa = a?.score == null ? -1 : Number(a.score);
    const sb = b?.score == null ? -1 : Number(b.score);
    if (sb !== sa) return sb - sa;

    const ca = a?.reviews_count == null ? 0 : Number(a.reviews_count);
    const cb = b?.reviews_count == null ? 0 : Number(b.reviews_count);
    if (cb !== ca) return cb - ca;

    return Number(b?.video_id ?? b?.id ?? 0) - Number(a?.video_id ?? a?.id ?? 0);
  });
}

export function filterLeaderboardItems(sorted, query) {
  const s = String(query || "").trim().toLowerCase();
  if (!s) return sorted;

  return sorted.filter((v) => {
    const hay = [
      v.title,
      v.title_en,
      v.director_name,
      v.director_lastname,
      v.country,
      v.director_country,
      v.ai_tech,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return hay.includes(s);
  });
}

export function getBestLeaderboardEntry(sorted) {
  return sorted.find((v) => v?.score != null) || null;
}

export function buildLeaderboardCoverUrl(cover) {
  if (!cover) return "";
  if (cover.startsWith("http")) return cover;
  return `${getApiBaseUrl()}/uploads/covers/${cover}`;
}

export function parseAiTechTools(aiTech, limit = 2) {
  return String(aiTech || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, limit);
}
