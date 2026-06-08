import { fetchJson } from "../../utils/apiBase.js";

/**
 * Récupère la liste des vidéos depuis le backend
 */
export async function fetchVideos(options = {}) {
  return fetchJson("/videos", {
    method: "GET",
    headers: { Accept: "application/json" },
    ...options,
  });
}
