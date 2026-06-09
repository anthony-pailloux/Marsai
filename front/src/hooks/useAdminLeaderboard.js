import { useEffect, useMemo, useState } from "react";
import { getApiUrl } from "../utils/apiBase.js";
import { getAuthHeaders } from "../utils/authHeaders.js";
import {
  filterLeaderboardItems,
  getBestLeaderboardEntry,
  sortLeaderboardItems,
} from "../utils/leaderboardUtils.js";
import { toast } from "../utils/toast.js";

export default function useAdminLeaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  async function refresh() {
    try {
      setLoading(true);

      const res = await fetch(`${getApiUrl()}/videos/admin/leaderboard`, {
        headers: getAuthHeaders({ Accept: "application/json" }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "Erreur chargement leaderboard");
      }

      const list = Array.isArray(data?.videos)
        ? data.videos
        : Array.isArray(data)
          ? data
          : [];

      setItems(list);
    } catch (e) {
      toast.error(e?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const sorted = useMemo(() => sortLeaderboardItems(items), [items]);

  const filtered = useMemo(
    () => filterLeaderboardItems(sorted, q),
    [sorted, q],
  );

  const best = useMemo(() => getBestLeaderboardEntry(sorted), [sorted]);

  return {
    loading,
    q,
    setQ,
    filtered,
    best,
    refresh,
  };
}
