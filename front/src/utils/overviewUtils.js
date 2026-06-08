import { getApiBaseUrl } from "./apiBase.js";

export const TOP_FILMS_ENDPOINT = "/api/videos/admin/leaderboard";

export const publicUrl = (p) => `${import.meta.env.BASE_URL}${p}`;

export const ICON_FALLBACK = publicUrl("vite.svg");

export function pickNumber(obj, keys, fallback = 0) {
  for (const k of keys) {
    const v = obj?.[k];
    if (v === 0) return 0;
    if (v != null && v !== "" && !Number.isNaN(Number(v))) return Number(v);
  }
  return fallback;
}

export function pickTitle(v) {
  return v?.title || v?.title_en || v?.name || v?.video_title || "Sans titre";
}

export function pickCountry(v) {
  return v?.country || v?.director_country || v?.pays || v?.country_name || "";
}

export function pickCoverUrl(v) {
  const cover = v?.cover || v?.thumbnail || v?.poster || v?.cover_path;
  if (!cover) return "";
  if (String(cover).startsWith("http")) return String(cover);
  if (String(cover).startsWith("/uploads/")) return `${getApiBaseUrl()}${cover}`;
  return `${getApiBaseUrl()}/uploads/covers/${cover}`;
}

export function formatK(n) {
  const num = Number(n);
  if (Number.isNaN(num)) return "0";
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

export function computeOverviewKpi(list) {
  const arr = Array.isArray(list) ? list : [];

  const filmsEvaluated = arr.filter(
    (v) => v?.score != null && v?.score !== "",
  ).length;

  const completion =
    filmsEvaluated === 0 ? 0 : Math.min(100, (filmsEvaluated / 600) * 100);

  const countriesSet = new Set(
    arr
      .map((v) => pickCountry(v))
      .filter(Boolean)
      .map((c) => String(c).trim().toLowerCase()),
  );

  return {
    films: filmsEvaluated,
    completion: Number(completion.toFixed(1)),
    quota: "0/0",
    quotaState: "EN ATTENTE",
    countries: countriesSet.size,
    zone: countriesSet.size ? "TOP ZONE : EUROPE" : "TOP ZONE : —",
    occupancy: 0,
  };
}

export function buildTopFilms(list) {
  const arr = Array.isArray(list) ? list : [];
  return arr.slice(0, 3).map((v, idx) => {
    const likes = pickNumber(v, ["likes", "likes_count", "like_count", "upvotes"], 0);
    const votesNum = pickNumber(
      v,
      ["votes", "votes_count", "vote_count", "jury_votes"],
      0,
    );

    return {
      id: v.video_id || v.id || v.videoId || `${idx}-${Math.random()}`,
      title: pickTitle(v),
      likes: formatK(likes),
      votes: votesNum ? String(votesNum) : "—",
      coverUrl: pickCoverUrl(v),
    };
  });
}
