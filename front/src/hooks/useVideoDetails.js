import { useEffect, useMemo, useState } from "react";
import { getApiUrl, getApiBaseUrl } from "../utils/apiBase.js";

export const PLACEHOLDER_COVER = "/cover-fallback.jpg";

function parseAiTags(raw) {
  const value = (raw || "").trim();
  if (!value) return [];
  return value
    .split(/[,;|]/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Charge une vidéo par id et calcule les champs affichés. */
export default function useVideoDetails(id) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const res = await fetch(`${getApiUrl()}/videos/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Erreur chargement vidéo");
        if (alive) setVideo(data.video);
      } catch (e) {
        if (alive) setErr(e?.message || "Erreur");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [id]);

  const viewLang = useMemo(
    () => (video?.language || "fr").toLowerCase(),
    [video],
  );

  const title = useMemo(() => {
    if (!video) return "";
    return viewLang === "en"
      ? video.title_en || video.title
      : video.title || video.title_en;
  }, [video, viewLang]);

  const synopsis = useMemo(() => {
    if (!video) return "";
    return viewLang === "en"
      ? video.synopsis_en || video.synopsis || ""
      : video.synopsis || video.synopsis_en || "";
  }, [video, viewLang]);

  const director = useMemo(() => {
    if (!video) return "";
    return `${video.director_name || ""} ${video.director_lastname || ""}`.trim();
  }, [video]);

  const country = video?.director_country || video?.country || "—";

  const coverUrl =
    video?.cover && String(video.cover).trim()
      ? `${getApiBaseUrl()}/uploads/covers/${video.cover}`
      : PLACEHOLDER_COVER;

  const streamUrl = `${getApiUrl()}/videos/${id}/stream`;
  const aiTags = useMemo(() => parseAiTags(video?.ai_tech), [video]);

  return {
    video,
    loading,
    err,
    title,
    synopsis,
    director,
    country,
    coverUrl,
    streamUrl,
    directLink: streamUrl,
    aiTags,
  };
}
