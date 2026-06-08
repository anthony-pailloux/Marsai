import { useEffect, useMemo, useState } from "react";
import {
  clamp,
  DEFAULT_EVENT_FORM,
  getDayTabsFromEvents,
  normalizeAdminEvent,
} from "../pages/Admin/AdminEvents.utils.js";
import { getAdminEvents } from "../services/Events/AdminEventApi.js";
import {
  removeAdminEvent,
  saveAdminEvent,
  toggleAdminEventPublish,
} from "../pages/Admin/adminEventsCrud.js";

export default function useAdminEvents() {
  const [day, setDay] = useState(null);
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...DEFAULT_EVENT_FORM });

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getAdminEvents();
        const normalized = Array.isArray(data)
          ? data.map(normalizeAdminEvent)
          : [];

        if (mounted) setEvents(normalized);
      } catch (e) {
        console.error("Erreur chargement admin events:", e);
        if (mounted) setEvents([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const dayTabs = useMemo(() => getDayTabsFromEvents(events), [events]);

  useEffect(() => {
    if (dayTabs.length === 0) return;
    if (!day || !dayTabs.some((tab) => tab.key === day)) {
      setDay(dayTabs[0].key);
    }
  }, [dayTabs, day]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const activeDay = day;

    return events
      .filter((e) => (activeDay ? e.day === activeDay : true))
      .filter((e) => {
        if (!q) return true;
        return (
          (e.title || "").toLowerCase().includes(q) ||
          (e.location || "").toLowerCase().includes(q) ||
          (e.description || "").toLowerCase().includes(q)
        );
      })
      .sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
      );
  }, [events, day, query]);

  const stats = useMemo(() => {
    const dayEvents = day ? events.filter((e) => e.day === day) : [];
    const totalReservations = dayEvents.reduce(
      (acc, e) => acc + (e.registered || 0),
      0,
    );
    const totalCapacity = dayEvents.reduce(
      (acc, e) => acc + (e.capacity || 0),
      0,
    );
    const fillRate = totalCapacity
      ? Math.round((totalReservations / totalCapacity) * 100)
      : 0;
    const publishedCount = dayEvents.filter((e) => e.published).length;

    return {
      totalReservations,
      fillRate: clamp(fillRate, 0, 100),
      publishedCount,
      eventsCount: dayEvents.length,
    };
  }, [events, day]);

  function openCreate() {
    setEditing(null);
    setForm({ ...DEFAULT_EVENT_FORM, length: "" });
    setModalOpen(true);
  }

  function openEdit(ev) {
    setEditing(ev);
    setForm({
      title: ev.title || "",
      description: ev.description || "",
      startAt: ev.startAt ? String(ev.startAt).slice(0, 16) : "",
      location: ev.location || "",
      capacity: ev.capacity ?? 30,
      type: ev.type || "atelier",
      length: ev.length != null ? String(ev.length) : "",
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function onSave(e) {
    e.preventDefault();

    try {
      const result = await saveAdminEvent({ form, editing });

      if (result.type === "update") {
        setEvents((prev) =>
          prev.map((x) =>
            x.id === editing.id ? { ...x, ...result.event.patch } : x,
          ),
        );
      } else {
        setEvents((prev) => [result.event, ...prev]);
        if (result.day) setDay(result.day);
      }

      setModalOpen(false);
    } catch (err) {
      console.error("Erreur save event:", err);
      alert("Impossible d'enregistrer l'événement.");
    }
  }

  async function onDelete(ev) {
    const ok = window.confirm(`Supprimer "${ev.title}" ?`);
    if (!ok) return;

    try {
      await removeAdminEvent(ev.id);
      setEvents((prev) => prev.filter((x) => x.id !== ev.id));
    } catch (err) {
      console.error("Erreur delete:", err);
      alert("Impossible de supprimer l'événement.");
    }
  }

  async function onTogglePublish(ev) {
    try {
      const res = await toggleAdminEventPublish(ev.id, !ev.published);
      setEvents((prev) =>
        prev.map((x) =>
          x.id === ev.id ? { ...x, published: res.published } : x,
        ),
      );
    } catch (err) {
      console.error("Erreur publish:", err);
      alert("Impossible de changer le statut de publication.");
    }
  }

  return {
    day,
    setDay,
    query,
    setQuery,
    events,
    loading,
    modalOpen,
    editing,
    form,
    setForm,
    dayTabs,
    filtered,
    stats,
    openCreate,
    openEdit,
    closeModal,
    onSave,
    onDelete,
    onTogglePublish,
  };
}
