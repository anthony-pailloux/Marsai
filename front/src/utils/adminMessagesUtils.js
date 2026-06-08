export const CONTACT_MESSAGES_ENDPOINTS = {
  list: "/api/contact/admin/messages",
  markRead: (id) => `/api/contact/admin/messages/${id}/read`,
  reply: (id) => `/api/contact/admin/messages/${id}/reply`,
};

export function fmtContactDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return String(d);
  return dt.toLocaleString("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function getMessageStatus(message) {
  if (message?.replied_at) return "replied";
  if (message?.is_read) return "read";
  return "new";
}
