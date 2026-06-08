import { getApiBaseUrl } from "../utils/apiBase.js";
const HOME_ICON_ALIASES = {
    "iconstars.svg": "IconStars.svg",
    "iconclock.svg": "IconClock.svg",
    "arrowright.svg": "arrowRight.svg",
    "plus.svg": "plus.svg",
    "ticket.svg": "ticket.svg",
};

function normalizeHomeIconFilename(filename = "") {
    const base = filename.split("?")[0];
    return HOME_ICON_ALIASES[base.toLowerCase()] || base;
}

/** Chemins statiques servis depuis /public (icônes locales, fallbacks i18n). */
export function resolveStaticIcon(src) {
    if (!src || typeof src !== "string") return "";

    const trimmed = src.trim();
    if (!trimmed || trimmed === "+") return "/icons/home/plus.svg";
    if (/^https?:\/\//.test(trimmed)) return trimmed;
    if (trimmed.startsWith("/icons/")) return trimmed;

    const filename = normalizeHomeIconFilename(trimmed.split("/").pop() || "");
    const isLocalAsset =
        trimmed.startsWith("/src/") ||
        trimmed.includes("assets/imgs/icones") ||
        trimmed.startsWith("../") ||
        trimmed.startsWith("../../");

    if (isLocalAsset && filename) {
        return `/icons/home/${filename}`;
    }

    return trimmed;
}

export function resolveCmsAsset(src) {
    if (!src) return "";

    if (/^https?:\/\//.test(src)) return src;

    if (src.startsWith("/uploads/")) {
        const path = src.replace(/^\/uploads\/?/, "");
        const normalized = path.includes("/") ? src : `/uploads/medias/${path}`;
        return `${getApiBaseUrl()}${normalized}`;
    }

    if (typeof src === "string" && src.trim() && !src.includes("/")) {
        return `${getApiBaseUrl()}/uploads/medias/${src.trim()}`;
    }

    return resolveStaticIcon(src);
}

export function resolveCmsAssetWithFallback(cmsValue, fallback) {
    const resolved = resolveCmsAsset(cmsValue);
    if (resolved) return resolved;
    return resolveStaticIcon(fallback);
}

/** Variante logo navbar : "light" (MARS blanc) sur vidéo / fond sombre, "dark" (MARS foncé) sur fond clair. */
export function resolveLogoVariant(src, variant = "light") {
    if (!src) return "";

    if (variant === "dark") {
        const darkSrc = src.replace(/(\.[^./]+)$/, "-dark$1");
        return resolveCmsAsset(darkSrc);
    }

    return resolveCmsAsset(src);
}

/** Logo navbar : MARS foncé uniquement sur fond clair (hors hero). Sinon MARS blanc, AI inchangé. */
export function resolveNavbarLogoVariant(src, { isOnHero, prefersDark }) {
    const variant = !isOnHero && !prefersDark ? "dark" : "light";
    return resolveLogoVariant(src, variant);
}