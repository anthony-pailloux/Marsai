import { getAuthHeaders } from "../../utils/authHeaders.js";
import { getApiUrl } from "../../utils/apiBase.js";

// ADMIN — récupérer tous les events (publiés + brouillons)
export async function getAdminEvents() {
  const res = await fetch(`${getApiUrl()}/admin/events`, {
    headers: getAuthHeaders({ Accept: "application/json" }),
  });
  if (!res.ok) throw new Error("Erreur chargement events admin");
  return res.json();
}

// ADMIN — créer un event
export async function createEvent(payload) {
  const res = await fetch(`${getApiUrl()}/admin/events`, {
    method: "POST",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur création event");
  return res.json();
}

// ADMIN — modifier un event
export async function updateEvent(id, payload) {
  const res = await fetch(`${getApiUrl()}/admin/events/${id}`, {
    method: "PUT",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur update event");
  return res.json();
}

// ADMIN — supprimer
export async function deleteEvent(id) {
  const res = await fetch(`${getApiUrl()}/admin/events/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erreur suppression event");
  return true;
}

// ADMIN — publier / dépublier
export async function togglePublish(id, published) {
  const res = await fetch(`${getApiUrl()}/admin/events/${id}/publish`, {
    method: "PATCH",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ published }),
  });
  if (!res.ok) throw new Error("Erreur publication");
  return res.json();
}

// ADMIN — liste des participants (réservations) d’un événement
export async function getEventBookings(eventId) {
  const res = await fetch(`${getApiUrl()}/admin/events/${eventId}/bookings`, {
    headers: getAuthHeaders({ Accept: "application/json" }),
  });
  if (!res.ok) throw new Error("Erreur chargement participants");
  return res.json();
}
