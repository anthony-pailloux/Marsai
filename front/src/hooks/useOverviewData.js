import { useEffect, useMemo, useState } from "react";
import { getApiBaseUrl } from "../utils/apiBase.js";
import { getAuthHeaders } from "../utils/authHeaders.js";
import {
  TOP_FILMS_ENDPOINT,
  buildTopFilms,
  computeOverviewKpi,
} from "../utils/overviewUtils.js";
import { toast } from "../utils/toast.js";

export default function useOverviewData() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    try {
      setLoading(true);

      const res = await fetch(`${getApiBaseUrl()}${TOP_FILMS_ENDPOINT}`, {
        headers: getAuthHeaders({ Accept: "application/json" }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur chargement data");

      const arr = Array.isArray(data?.videos)
        ? data.videos
        : Array.isArray(data)
          ? data
          : [];

      setList(arr);
    } catch (e) {
      toast.error(e?.message || "Erreur");
      setList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  const kpi = useMemo(() => computeOverviewKpi(list), [list]);
  const topFilms = useMemo(() => buildTopFilms(list), [list]);

  return { loading, kpi, topFilms };
}
