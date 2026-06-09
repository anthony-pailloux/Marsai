import { useEffect, useMemo, useState } from "react";
import { fetchJson } from "../utils/apiBase.js";
import {
  filterGalleryVideos,
  paginateItems,
} from "../utils/galleryPageUtils.js";
import { toast } from "../utils/toast.js";

export default function useGalleryPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);

        const data = await fetchJson("/videos");
        const list = Array.isArray(data) ? data : data?.videos || [];
        if (alive) setItems(list);
      } catch (e) {
        if (alive) toast.error(e?.message || "Erreur");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(
    () => filterGalleryVideos(items, query),
    [items, query],
  );

  const pagination = useMemo(
    () => paginateItems(filtered, page),
    [filtered, page],
  );

  useEffect(() => {
    if (page > pagination.totalPages) setPage(1);
  }, [page, pagination.totalPages]);

  return {
    query,
    setQuery,
    page,
    setPage,
    loading,
    pageItems: pagination.pageItems,
    total: pagination.total,
    totalPages: pagination.totalPages,
  };
}
