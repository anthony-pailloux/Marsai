import { getApiUrl } from "../../utils/apiBase.js";
import { getAuthHeaders } from "../../utils/authHeaders.js";
import { newsletterFullUrl } from "../../utils/newsletterEditorUtils.js";

export async function fetchNewsletter(newsletterId) {
  const res = await fetch(`${getApiUrl()}/admin/newsletters/${newsletterId}`, {
    headers: getAuthHeaders({ Accept: "application/json" }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Erreur chargement");
  return data;
}

export async function saveNewsletter(newsletterId, payload) {
  const res = await fetch(`${getApiUrl()}/admin/newsletters/${newsletterId}`, {
    method: "PUT",
    headers: getAuthHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Erreur sauvegarde");
  return data;
}

export async function sendTestNewsletter(newsletterId, to) {
  const res = await fetch(
    `${getApiUrl()}/admin/newsletters/${newsletterId}/send-test`,
    {
      method: "POST",
      headers: getAuthHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({ to }),
    },
  );

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Erreur envoi test");
  return data;
}

export async function scheduleNewsletter(newsletterId, scheduledAt) {
  const res = await fetch(
    `${getApiUrl()}/admin/newsletters/${newsletterId}/schedule`,
    {
      method: "POST",
      headers: getAuthHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        scheduled_at: new Date(scheduledAt).toISOString(),
      }),
    },
  );

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Erreur programmation");
  return data;
}

export async function cancelScheduleNewsletter(newsletterId) {
  const res = await fetch(
    `${getApiUrl()}/admin/newsletters/${newsletterId}/cancel-schedule`,
    {
      method: "POST",
      headers: getAuthHeaders({ Accept: "application/json" }),
    },
  );

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Erreur annulation");
  return data;
}

export async function sendNowNewsletter(newsletterId) {
  const res = await fetch(
    `${getApiUrl()}/admin/newsletters/${newsletterId}/send-now`,
    {
      method: "POST",
      headers: getAuthHeaders({ Accept: "application/json" }),
    },
  );

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Erreur envoi");
  return data;
}

export async function uploadNewsletterImage(file) {
  const form = new FormData();
  form.append("image", file);

  const res = await fetch(`${getApiUrl()}/admin/newsletters/upload-image`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: form,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Erreur upload");
  return newsletterFullUrl(data?.file?.url);
}
