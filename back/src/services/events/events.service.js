import {
  findEventById,
  insertEvent,
  updateEvent as updateEventModel,
  deleteEventById,
  updateEventPublished,
  findAllPublishedEventsWithRegistered,
  findAllEventsForAdmin,
} from "../../models/event.js";
import {
  insertBooking,
  countBookingsByEventId,
  findBookingsByEventId,
} from "../../models/booking.js";
import {
  buildEventPayload,
  validateBookingBody,
} from "./events.helpers.js";

export async function createEventRecord(body) {
  return insertEvent(buildEventPayload(body));
}

export async function updateEventRecord(id, body) {
  await updateEventModel(id, buildEventPayload(body));
  return findEventById(id);
}

export async function deleteEventRecord(id) {
  return deleteEventById(id);
}

export async function getPublishedEvents() {
  return findAllPublishedEventsWithRegistered();
}

export async function getEventById(id) {
  return findEventById(id);
}

export async function getAdminEvents() {
  return findAllEventsForAdmin();
}

export async function publishEvent(id, published) {
  const event = await findEventById(id);
  if (!event) return null;

  await updateEventPublished(id, published);
  return findEventById(id);
}

export async function createEventBooking(eventId, body) {
  const event = await findEventById(eventId);
  if (!event) {
    return { error: "Événement introuvable", status: 404 };
  }

  const booked = await countBookingsByEventId(eventId);
  const capacity = event.stock != null ? Number(event.stock) : null;

  if (capacity != null && booked >= capacity) {
    return {
      error: "Complet : plus de place disponible pour cet atelier.",
      status: 409,
    };
  }

  const validated = validateBookingBody(body);
  if (validated.error) return validated;

  try {
    const booking = await insertBooking({
      event_id: eventId,
      ...validated.data,
    });
    return { booking, status: 201 };
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return {
        error: "Cet email est déjà inscrit pour cet atelier.",
        status: 409,
      };
    }
    throw err;
  }
}

export async function getEventBookings(id) {
  const event = await findEventById(id);
  if (!event) return null;

  const bookings = await findBookingsByEventId(id);
  return { event, bookings };
}
