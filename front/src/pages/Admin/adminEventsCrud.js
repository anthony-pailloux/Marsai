import { getDayKeyFromDate } from "./AdminEvents.utils.js";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  togglePublish,
} from "../../services/Events/AdminEventApi.js";

export function buildEventApiPayload(form, editing) {
  const startAtRaw =
    form.startAt && String(form.startAt).trim() ? form.startAt.trim() : null;
  const capacity = Number(form.capacity) || 0;
  const dateForApi = startAtRaw
    ? new Date(startAtRaw).toISOString().slice(0, 19).replace("T", " ")
    : new Date().toISOString().slice(0, 19).replace("T", " ");

  const duration = Number(form.length);

  const apiPayload = {
    title: form.title,
    description: form.description || null,
    date: dateForApi,
    length: duration > 0 ? duration : 90,
    stock: capacity,
    illustration: "",
    location: form.location || null,
  };

  if (editing) {
    return {
      ...apiPayload,
      date: editing.date || dateForApi,
      length: duration > 0 ? duration : (editing.length ?? 90),
      stock: editing.stock ?? capacity,
    };
  }

  return apiPayload;
}

export async function saveAdminEvent({ form, editing }) {
  const capacity = Number(form.capacity) || 0;
  const apiPayload = buildEventApiPayload(form, editing);

  if (editing) {
    const updated = await updateEvent(editing.id, apiPayload);
    const updatedDay = getDayKeyFromDate(updated.date);

    return {
      type: "update",
      event: {
        id: editing.id,
        patch: {
          ...updated,
          day: updatedDay,
          capacity,
          startAt: updated.date,
        },
      },
      day: updatedDay,
    };
  }

  const created = await createEvent(apiPayload);
  const createdDay = getDayKeyFromDate(created.date);

  return {
    type: "create",
    event: {
      ...created,
      day: createdDay,
      type: form.type,
      capacity,
      startAt: created.date,
      published: false,
    },
    day: createdDay,
  };
}

export async function removeAdminEvent(eventId) {
  await deleteEvent(eventId);
}

export async function toggleAdminEventPublish(eventId, published) {
  return togglePublish(eventId, published);
}
