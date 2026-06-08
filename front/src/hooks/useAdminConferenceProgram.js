import { useEffect, useState } from "react";
import {
  getProgramAdmin,
  createItem,
  updateItem,
  deleteItem,
} from "../services/Events/ConferenceProgramAPI.js";
import {
  COLORS,
  DEFAULT_FORM,
  dayForApi,
} from "../components/admin/ConferenceProgram/conferenceProgramUtils.js";

export default function useAdminConferenceProgram(t) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...DEFAULT_FORM });

  useEffect(() => {
    getProgramAdmin()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  function openCreate() {
    setEditing(null);
    const today = new Date().toISOString().slice(0, 10);
    setForm({ ...DEFAULT_FORM, day: today });
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setForm({
      day: item.day || "",
      time: item.time || "09:00",
      title: item.title || "",
      speaker: item.speaker || "",
      color: item.color || "bg-sky-400",
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      const apiDay = dayForApi(form, editing);
      if (!editing && !apiDay) {
        alert("Veuillez choisir un jour pour la conférence.");
        return;
      }

      const payload = {
        day: apiDay,
        time: form.time,
        title: form.title,
        speaker: form.speaker || null,
        color: form.color,
      };

      if (editing) {
        const updated = await updateItem(editing.id, payload);
        setItems((prev) => prev.map((x) => (x.id === editing.id ? updated : x)));
      } else {
        const created = await createItem(payload);
        setItems((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (err) {
      alert(err?.message || "Erreur");
    }
  }

  async function handleDelete(item) {
    if (!confirm(t("confirmDelete", { title: item.title }))) return;
    try {
      await deleteItem(item.id);
      setItems((prev) => prev.filter((x) => x.id !== item.id));
    } catch (err) {
      alert(err?.message || "Erreur");
    }
  }

  return {
    items,
    loading,
    modalOpen,
    editing,
    form,
    colors: COLORS,
    openCreate,
    openEdit,
    closeModal,
    updateField,
    handleSave,
    handleDelete,
  };
}
