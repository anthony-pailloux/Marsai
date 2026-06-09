import { useEffect, useMemo, useState } from "react";
import {
  getAdminVideos,
  patchAdminVideoFeatured,
  patchAdminVideoStatus,
} from "../services/Videos/adminVideosApi";
import { decodeToken } from "../utils/decodeToken.js";
import { filterAdminVideos } from "../utils/adminVideosUtils.js";
import { toast } from "../utils/toast.js";

export default function useAdminVideos() {
  const user = decodeToken();
  const isSelector = user?.role === "selector";

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState("");

  async function refresh() {
    try {
      setLoading(true);
      setError("");
      const data = await getAdminVideos();
      setVideos(Array.isArray(data?.videos) ? data.videos : []);
    } catch (e) {
      const msg = e?.message || "Erreur chargement";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(
    () => filterAdminVideos(videos, { q, statusFilter }),
    [videos, q, statusFilter],
  );

  async function onChangeStatus(id, upload_status) {
    const prev = videos;
    setBusyId(id);
    setVideos((arr) =>
      arr.map((v) => (v.id === id ? { ...v, upload_status } : v)),
    );

    try {
      await patchAdminVideoStatus(id, upload_status);
      toast.success("Statut de la vidéo mis à jour");
    } catch (e) {
      setVideos(prev);
      toast.error(e?.message || "Impossible de changer le statut");
    } finally {
      setBusyId(null);
    }
  }

  async function onToggleFeatured(id, next) {
    const prev = videos;
    setBusyId(id);
    setVideos((arr) =>
      arr.map((v) => (v.id === id ? { ...v, featured: next ? 1 : 0 } : v)),
    );

    try {
      await patchAdminVideoFeatured(id, next);
      toast.success(
        next ? "Vidéo mise en avant" : "Mise en avant retirée",
      );
    } catch (e) {
      setVideos(prev);
      toast.error(e?.message || "Impossible de modifier la mise en avant");
    } finally {
      setBusyId(null);
    }
  }

  return {
    isSelector,
    videos,
    loading,
    busyId,
    q,
    setQ,
    statusFilter,
    setStatusFilter,
    error,
    filtered,
    refresh,
    onChangeStatus,
    onToggleFeatured,
  };
}
