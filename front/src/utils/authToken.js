/** Lecture du token JWT depuis localStorage / sessionStorage. */

function normalizeToken(t) {
  if (!t) return "";
  return String(t)
    .trim()
    .replace(/^"(.+)"$/, "$1")
    .replace(/\s+/g, "");
}

export function getAuthToken() {
  const candidates = [
    localStorage.getItem("token"),
    localStorage.getItem("jwt"),
    localStorage.getItem("accessToken"),
    localStorage.getItem("authToken"),
    sessionStorage.getItem("token"),
    sessionStorage.getItem("jwt"),
    sessionStorage.getItem("accessToken"),
    sessionStorage.getItem("authToken"),
  ];

  for (const c of candidates) {
    const tok = normalizeToken(c);
    if (tok) return tok;
  }

  const userStr = localStorage.getItem("user") || localStorage.getItem("auth");
  if (userStr) {
    try {
      const u = JSON.parse(userStr);
      const tok = normalizeToken(
        u?.token ||
          u?.jwt ||
          u?.accessToken ||
          u?.data?.token ||
          u?.user?.token,
      );
      if (tok) return tok;
    } catch {
      // ignore
    }
  }

  return "";
}

export function isSelectorFromToken() {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const rawRole =
      payload?.role || payload?.user?.role || payload?.status || payload?.type;
    const role = String(rawRole || "")
      .trim()
      .toLowerCase();
    return role === "selector";
  } catch {
    return false;
  }
}
