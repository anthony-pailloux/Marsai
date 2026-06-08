export const COLORS = [
  { value: "bg-sky-400", labelKey: "colorBlue" },
  { value: "bg-emerald-400", labelKey: "colorGreen" },
];

export const DEFAULT_FORM = {
  day: "",
  time: "09:00",
  title: "",
  speaker: "",
  color: "bg-sky-400",
};

export function normalizeWeekday(raw) {
  if (!raw) return null;
  const map = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
    Lundi: "Monday",
    Mardi: "Tuesday",
    Mercredi: "Wednesday",
    Jeudi: "Thursday",
    Vendredi: "Friday",
    Samedi: "Saturday",
    Dimanche: "Sunday",
  };
  return map[raw] ?? null;
}

export function formatDayLabel(dayStr) {
  if (!dayStr) return "—";
  const d = new Date(dayStr + "T12:00:00");
  if (Number.isNaN(d.getTime())) return dayStr;
  const s = d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function dayForApi(form, editing) {
  if (form.day && form.day.includes("-")) {
    const d = new Date(form.day + "T12:00:00");
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString("en-GB", { weekday: "long" });
    }
  }
  if (editing?.day) return normalizeWeekday(editing.day);
  return null;
}
