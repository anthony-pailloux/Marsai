/** Fusionne des classes Tailwind (filtre les valeurs falsy). */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
