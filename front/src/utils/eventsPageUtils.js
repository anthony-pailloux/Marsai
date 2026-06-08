/** Libellé jour pour les onglets programme (ex. « Lundi 8 juin »). */
export function formatDayLabel(dayStr, locale = "fr") {
  if (!dayStr) return "—";
  const d = new Date(`${dayStr}T12:00:00`);
  if (Number.isNaN(d.getTime())) return dayStr;
  const s = d.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getProgramDays(programItems) {
  return [...new Set(programItems.map((item) => item.day).filter(Boolean))].sort();
}

export function filterProgramByDay(programItems, day) {
  if (!day) return programItems;
  return programItems.filter((item) => item.day === day);
}
