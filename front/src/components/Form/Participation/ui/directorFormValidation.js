/** Validation et helpers pour le formulaire réalisateur. */

export function calcAge(birthdayISO) {
  if (!birthdayISO) return null;
  const d = new Date(birthdayISO);
  if (Number.isNaN(d.getTime())) return null;

  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

/** Parse "+33 6 12 34..." en indicatif + numéro local. */
export function splitMobile(mobileStr) {
  const s = String(mobileStr || "").trim();
  if (!s) return { dial: "", local: "" };

  const m = s.match(/^(\+\d+)\s*(.*)$/);
  if (m) return { dial: m[1], local: (m[2] || "").trim() };

  return { dial: "", local: s };
}

export function canSubmitDirectorForm(form, ageError) {
  return Boolean(
    form.name.trim() &&
      form.last_name.trim() &&
      form.email.trim() &&
      (form.gender === "Mr" || form.gender === "Mrs") &&
      form.production_role.trim() &&
      form.birthday.trim() &&
      !ageError &&
      form.director_country.trim() &&
      form.address.trim() &&
      form.discovery_source.trim() &&
      form.mobile_number.trim(),
  );
}
