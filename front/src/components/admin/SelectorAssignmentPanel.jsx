import { useEffect, useState } from "react";
import {
  fetchSelectors,
  fetchAssignments,
  createAssignment,
  deleteAssignment,
} from "../../services/Admin/AssignmentApi.js";
import { getAuthHeaders } from "../../utils/authHeaders.js";
import { typeAdminSection } from "../../utils/typography.js";

import { getApiUrl } from "../../utils/apiBase.js";

export default function SelectorAssignmentPanel() {
  const [assignments, setAssignments] = useState([]);
  const [selectors, setSelectors] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectorId, setSelectorId] = useState("");
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [assigns, selectorList, videosRes] = await Promise.all([
        fetchAssignments(),
        fetchSelectors(),
        fetch(`${getApiUrl()}/videos/admin`, {
          headers: getAuthHeaders({ Accept: "application/json" }),
        }),
      ]);

      setSelectors(selectorList);
      setAssignments(assigns);

      const videosData = await videosRes.json();
      setVideos(videosData?.videos ?? []);
    } catch (e) {
      setError(e?.message || "Erreur chargement");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onAssign(e) {
    e.preventDefault();
    if (!selectorId || !videoId) return;
    try {
      await createAssignment(Number(selectorId), Number(videoId));
      setSelectorId("");
      setVideoId("");
      await load();
    } catch (err) {
      setError(err?.message || "Erreur");
    }
  }

  async function onRemove(selector_id, video_id) {
    try {
      await deleteAssignment(selector_id, video_id);
      await load();
    } catch (err) {
      setError(err?.message || "Erreur");
    }
  }

  return (
    <section className="mt-14 rounded-[28px] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <h4 className={typeAdminSection}>Assignation films → sélecteurs</h4>
      <p className="mt-1 text-sm text-black/60 dark:text-white/60">
        Chaque sélecteur ne voit que les films qui lui sont assignés.
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-300">{error}</p>
      )}

      <form onSubmit={onAssign} className="mt-6 flex flex-wrap gap-3">
        <select
          value={selectorId}
          onChange={(e) => setSelectorId(e.target.value)}
          className="rounded-xl border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
        >
          <option value="">Sélectionneur</option>
          {selectors.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} {s.last_name} ({s.email})
            </option>
          ))}
        </select>

        <select
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="min-w-[220px] rounded-xl border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
        >
          <option value="">Film</option>
          {videos.map((v) => (
            <option key={v.id} value={v.id}>
              #{v.id} — {v.title || v.title_en}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-full bg-[#2F6BFF] px-5 py-2 text-sm font-bold text-white"
        >
          Assigner
        </button>
      </form>

      <div className="mt-6 space-y-2">
        {loading && <p className="text-sm opacity-70">Chargement…</p>}
        {!loading && assignments.length === 0 && (
          <p className="text-sm opacity-70">Aucune assignation.</p>
        )}
        {assignments.map((a) => (
          <div
            key={`${a.selector_id}-${a.video_id}`}
            className="flex items-center justify-between rounded-xl border border-black/5 px-4 py-3 text-sm dark:border-white/10"
          >
            <span>
              <strong>
                {a.selector_name} {a.selector_last_name}
              </strong>{" "}
              → {a.video_title}
            </span>
            <button
              type="button"
              onClick={() => onRemove(a.selector_id, a.video_id)}
              className="text-xs font-bold text-red-600"
            >
              Retirer
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
