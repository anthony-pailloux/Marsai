import { getAuthHeaders } from "../../utils/authHeaders.js";
import { fetchJson } from "../../utils/apiBase.js";

export async function fetchPublicAwards(options = {}) {
  const data = await fetchJson("/awards", options);
  return data?.awards ?? [];
}

export async function fetchAdminAwards() {
  const data = await fetchJson("/awards/admin", {
    headers: getAuthHeaders({ Accept: "application/json" }),
  });
  return data?.awards ?? [];
}
