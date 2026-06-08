import { getApiBaseUrl } from "./apiBase.js";

export function resolveJuryImg(src) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  if (src.startsWith("/imgs/")) return src;
  if (src.startsWith("/uploads/")) return `${getApiBaseUrl()}${src}`;
  return `${getApiBaseUrl()}/uploads/jury/${src}`;
}

export function getJuryPresident(jury) {
  return jury.find((j) => Number(j.is_president) === 1) || null;
}

export function getJuryMembers(jury) {
  return jury
    .filter((j) => Number(j.is_president) !== 1)
    .slice()
    .sort((a, b) => Number(a.sort_order ?? 999) - Number(b.sort_order ?? 999));
}

export function juryMemberName(member) {
  return `${member.first_name || ""} ${member.name || ""}`.trim();
}
