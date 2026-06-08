/** Utilitaires pays / téléphone (API restcountries + drapeaux). */

export function flagUrl(code, size = 24) {
  const c = String(code || "").toLowerCase();
  return `https://flagcdn.com/${size}x${Math.round(size * 0.75)}/${c}.png`;
}

/** restcountries: idd = { root:"+33", suffixes:["1"] } => +331 */
export function buildDialCode(idd) {
  if (!idd?.root) return "";
  const suffix =
    Array.isArray(idd?.suffixes) && idd.suffixes.length ? idd.suffixes[0] : "";
  return `${idd.root}${suffix}`;
}
