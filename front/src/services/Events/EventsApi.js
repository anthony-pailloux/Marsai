import { getApiUrl } from "../../utils/apiBase.js";

/**
 * Récupère la liste des événements / ateliers (avec stock = places restantes).
 * @returns {Promise<Array<{ id, title, description, date, length, stock, illustration, location }>>}
 */
export async function getEvents() {
  const res = await fetch(`${getApiUrl()}/events`);
  if (!res.ok) throw new Error("Failed to load events");
  return res.json();
}

/**
 * Envoie une réservation pour un événement.
 * @param {number} eventId - ID de l'événement
 * @param {{ first_name: string, last_name: string, email: string }} data
 * @returns {Promise<Object>} - la réservation créée
 */
export async function createBooking(eventId, data) {
  const res = await fetch(`${getApiUrl()}/events/${eventId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || "Error while booking");
  }
  return json;
}
