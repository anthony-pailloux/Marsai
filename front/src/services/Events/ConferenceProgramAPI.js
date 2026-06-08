import { getAuthHeaders } from "../../utils/authHeaders.js";
import { getApiUrl } from "../../utils/apiBase.js";

/**  (page Events publique) */
export async function getProgram() {
  const res = await fetch(`${getApiUrl()}/conference-program`);
  if (!res.ok) throw new Error("Erreur chargement programme");
  return res.json();
}

/** Liste admin */
export async function getProgramAdmin() {
  const res = await fetch(`${getApiUrl()}/admin/conference-program`, {
    headers: getAuthHeaders({ Accept: "application/json" }),
  });
  if (!res.ok) throw new Error("Erreur chargement programme");
  return res.json();
}

/** Creer programme */
export async function createItem(payload) {
  const res = await fetch(`${getApiUrl()}/admin/conference-program`, {
    method: "POST",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur création");
  return res.json();
}

/** Modifier  */
export async function updateItem(id, payload) {
  const res = await fetch(`${getApiUrl()}/admin/conference-program/${id}`, {
    method: "PUT",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur modification");
  return res.json();
}

/** Supprimer  */
export async function deleteItem(id) {
  const res = await fetch(`${getApiUrl()}/admin/conference-program/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erreur suppression");
}
