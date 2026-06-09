import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../utils/apiBase.js";
import useActiveFeedIndex from "./useActiveFeedIndex.js";
import { toast } from "../utils/toast.js";

export default function useVideoFeed(startId) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useActiveFeedIndex(
    containerRef,
    items.length,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");

    const apply = () => {
      if (mq.matches) {
        navigate(`/gallery/${startId}`, { replace: true });
      }
    };

    apply();

    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, [startId, navigate]);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);

        const res = await fetch(`${getApiUrl()}/videos`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Erreur chargement vidéos");

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

  const startIndex = useMemo(() => {
    const idx = items.findIndex((v) => String(v.id) === startId);
    return idx >= 0 ? idx : 0;
  }, [items, startId]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root || !items.length) return;

    const el = root.querySelector(`[data-index="${startIndex}"]`);
    if (el) el.scrollIntoView({ behavior: "auto", block: "start" });

    setActiveIndex(startIndex);
  }, [items.length, startIndex, setActiveIndex]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    function scrollToIndex(next) {
      const clamped = Math.max(0, Math.min(items.length - 1, next));
      const el = root.querySelector(`[data-index="${clamped}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function onKeyDown(e) {
      if (e.key === "Escape") {
        navigate("/gallery");
      }
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(activeIndex + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(activeIndex - 1);
      }
    }

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, items.length, navigate]);

  return {
    items,
    loading,
    containerRef,
    activeIndex,
    goBack: () => navigate("/gallery"),
  };
}
