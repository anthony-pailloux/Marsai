import { useEffect, useState } from "react";
import { getAuthHeaders } from "../utils/authHeaders.js";
import { getApiUrl } from "../utils/apiBase.js";

const PAGE_LIMIT = 20;

export default function useAdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  async function loadAll(nextPage = page) {
    setLoading(true);
    try {
      const subsUrl = `${getApiUrl()}/admin/newsletter/subscribers?status=${status}&q=${encodeURIComponent(
        q,
      )}&limit=${PAGE_LIMIT}&offset=${nextPage * PAGE_LIMIT}`;

      const [subsRes, statsRes] = await Promise.all([
        fetch(subsUrl, {
          headers: getAuthHeaders({ Accept: "application/json" }),
        }),
        fetch(`${getApiUrl()}/admin/newsletter/stats`, {
          headers: getAuthHeaders({ Accept: "application/json" }),
        }),
      ]);

      const subsData = await subsRes.json();
      const statsData = await statsRes.json();

      setSubscribers(subsData?.items || []);
      setStats(statsData?.stats || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- recharge quand filtre ou page change
  }, [status, page]);

  function onSearch(e) {
    e.preventDefault();
    setPage(0);
    loadAll(0);
  }

  function onStatusChange(value) {
    setStatus(value);
    setPage(0);
  }

  return {
    subscribers,
    stats,
    status,
    q,
    setQ,
    loading,
    page,
    setPage,
    pageLimit: PAGE_LIMIT,
    onSearch,
    onStatusChange,
  };
}
