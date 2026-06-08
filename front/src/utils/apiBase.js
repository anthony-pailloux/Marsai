const DEFAULT_API_URL = "http://localhost:3000";
const DEFAULT_FETCH_TIMEOUT_MS = 15000;

/** URL de base de l'API (sans suffixe /api). */
export function getApiBaseUrl() {
  const raw = import.meta.env.VITE_API_URL || DEFAULT_API_URL;
  return raw.endsWith("/api") ? raw.slice(0, -4) : raw.replace(/\/$/, "");
}

/** Préfixe complet des routes API (/api). */
export function getApiUrl() {
  const base = getApiBaseUrl();
  return base.endsWith("/api") ? base : `${base}/api`;
}

function buildApiUrl(path) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${getApiUrl()}${suffix}`;
}

/**
 * fetch JSON avec timeout — évite un spinner infini si l'API ne répond pas.
 */
export async function fetchJson(path, options = {}) {
  const { timeoutMs = DEFAULT_FETCH_TIMEOUT_MS, signal: externalSignal, ...init } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    else externalSignal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const res = await fetch(buildApiUrl(path), {
      ...init,
      signal: controller.signal,
    });

    let data = null;
    const text = await res.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!res.ok) {
      const msg =
        (typeof data === "object" && data && (data.details || data.error)) ||
        (typeof data === "string" ? data : "") ||
        res.statusText;
      throw new Error(`Erreur API (${res.status}) ${msg}`.trim());
    }

    return data;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(
        externalSignal?.aborted
          ? "Requête annulée"
          : "Délai dépassé — vérifiez que le backend tourne (npm run dev dans back/)",
      );
    }
    if (error?.message === "Failed to fetch") {
      throw new Error("API inaccessible — démarrez le backend sur le port 3000");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
