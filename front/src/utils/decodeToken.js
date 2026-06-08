// Lit le payload du token stocké dans localStorage (id, email, role, name, last_name) pour l'utilisateur connecté.

export function decodeToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload?.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}