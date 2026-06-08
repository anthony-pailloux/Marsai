import { getApiBaseUrl } from "../../utils/apiBase.js";

function getUsersUrl(path) {
  const base = (getApiBaseUrl() || "").trim().replace(/\/$/, "");
  return base ? `${base}/api/users${path}` : `/api/users${path}`;
}

async function parseResponse(res) {
  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text ? { error: text.slice(0, 200) } : null;
  }

  if (!res.ok) {
    const message =
      data?.error ||
      data?.message ||
      (Array.isArray(data?.errors) ? data.errors.map((e) => e.message).join(" ") : null) ||
      `Erreur ${res.status}`;
    throw new Error(message);
  }

  return data;
}

export async function requestPasswordReset(email) {
  const res = await fetch(getUsersUrl("/forgot-password"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return parseResponse(res);
}

export async function resetPassword(token, password) {
  const res = await fetch(getUsersUrl("/reset-password"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ token, password }),
  });

  return parseResponse(res);
}
