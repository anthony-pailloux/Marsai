import { getAuthHeaders } from "../../utils/authHeaders.js";
import { getApiUrl } from "../../utils/apiBase.js";

export async function fetchSelectors() {
  const res = await fetch(`${getApiUrl()}/admin/assignments/selectors`, {
    headers: getAuthHeaders({ Accept: "application/json" }),
  });
  if (!res.ok) throw new Error("Erreur chargement sélecteurs");
  const data = await res.json();
  return data?.selectors ?? [];
}

export async function fetchAssignments() {
  const res = await fetch(`${getApiUrl()}/admin/assignments`, {
    headers: getAuthHeaders({ Accept: "application/json" }),
  });
  if (!res.ok) throw new Error("Erreur chargement assignations");
  const data = await res.json();
  return data?.assignments ?? [];
}

export async function createAssignment(selectorId, videoId) {
  const res = await fetch(`${getApiUrl()}/admin/assignments`, {
    method: "POST",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ selector_id: selectorId, video_id: videoId }),
  });
  if (!res.ok) throw new Error("Erreur assignation");
  return res.json();
}

export async function deleteAssignment(selectorId, videoId) {
  const res = await fetch(`${getApiUrl()}/admin/assignments`, {
    method: "DELETE",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ selector_id: selectorId, video_id: videoId }),
  });
  if (!res.ok) throw new Error("Erreur suppression assignation");
  return res.json();
}
