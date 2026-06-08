import { getApiBaseUrl } from "./apiBase.js";

export function resolveJuryImgUrl(src) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  return `${getApiBaseUrl()}/uploads/jury/${src}`;
}

/** Président en premier, puis sort_order, puis id. */
export function sortJuryMembers(jury) {
  const list = [...(jury || [])];
  list.sort((a, b) => {
    const ap = Number(a.is_president || 0);
    const bp = Number(b.is_president || 0);
    if (bp !== ap) return bp - ap;
    const aso = Number(a.sort_order || 0);
    const bso = Number(b.sort_order || 0);
    if (aso !== bso) return aso - bso;
    return Number(a.id) - Number(b.id);
  });
  return list;
}

export function mapMemberToEditForm(member) {
  return {
    name: member.name || "",
    first_name: member.first_name || "",
    bio: member.bio || "",
    profession: member.profession || "",
    role_label: member.role_label || "",
    is_president: Number(member.is_president || 0),
    filmography_url: member.filmography_url || "",
    sort_order: Number(member.sort_order || 1),
    imgFile: null,
  };
}

export function buildJuryFormData(form) {
  const fd = new FormData();
  fd.append("name", form.name.trim());
  fd.append("first_name", form.first_name.trim());
  fd.append("bio", form.bio || "");
  fd.append("profession", form.profession || "");
  fd.append("role_label", form.role_label || "");
  fd.append("is_president", String(Number(form.is_president || 0)));
  fd.append("filmography_url", form.filmography_url || "");
  fd.append("sort_order", String(Number(form.sort_order || 1)));
  if (form.imgFile) fd.append("img", form.imgFile);
  return fd;
}
