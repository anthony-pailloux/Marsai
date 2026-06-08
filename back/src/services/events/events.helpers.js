export function toMySQLDateTime(dateStr) {
  if (!dateStr) return null;
  const s = String(dateStr).trim();
  if (s.length <= 10 && !s.includes("T")) {
    return `${s} 00:00:00`;
  }
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 19).replace("T", " ");
}

export function buildEventPayload(body) {
  const { title, description, date, length, stock, illustration, location } = body;

  return {
    title,
    description: description || null,
    date: toMySQLDateTime(date),
    length: length ?? 0,
    stock: stock ?? null,
    illustration: illustration ?? "",
    location: location || null,
  };
}

export function validateBookingBody(body) {
  const { first_name, last_name, email } = body;

  if (!first_name?.trim() || !last_name?.trim() || !email?.trim()) {
    return { error: "Prénom, nom et email sont obligatoires.", status: 400 };
  }

  return {
    data: {
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: email.trim().toLowerCase(),
    },
  };
}
