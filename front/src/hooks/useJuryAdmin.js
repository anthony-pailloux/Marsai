import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getApiUrl } from "../utils/apiBase.js";
import { getAuthHeaders } from "../utils/authHeaders.js";
import {
  buildJuryFormData,
  mapMemberToEditForm,
  sortJuryMembers,
} from "../utils/juryAdminUtils.js";
import { toast } from "../utils/toast.js";

export default function useJuryAdmin() {
  const { t } = useTranslation("jury");

  const [jury, setJury] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [currentId, setCurrentId] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  async function refresh() {
    setLoading(true);
    try {
      const r = await fetch(`${getApiUrl()}/jury`);
      const d = await r.json();
      setJury(d?.jury || []);
    } catch {
      toast.error(t("admin.errors.load"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedJury = useMemo(() => sortJuryMembers(jury), [jury]);

  function openCreate() {
    setMode("create");
    setCurrentId(null);
    setInitialValues({ sort_order: (jury?.length || 0) + 1 });
    setOpen(true);
  }

  function openEdit(member) {
    setMode("edit");
    setCurrentId(member.id);
    setInitialValues(mapMemberToEditForm(member));
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
  }

  function requestDelete(member) {
    setDeleteTarget(member);
  }

  function cancelDelete() {
    setDeleteTarget(null);
  }

  async function submitForm(form) {
    setSaving(true);

    try {
      if (!form.first_name?.trim() || !form.name?.trim()) {
        throw new Error(t("admin.errors.requiredName"));
      }
      if (!form.role_label?.trim()) {
        throw new Error(t("admin.errors.requiredRole"));
      }

      const fd = buildJuryFormData(form);
      const url =
        mode === "create"
          ? `${getApiUrl()}/jury`
          : `${getApiUrl()}/jury/${currentId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const r = await fetch(url, { method, headers: getAuthHeaders(), body: fd });
      const d = await r.json().catch(() => ({}));

      if (!r.ok) throw new Error(d?.error || t("admin.errors.save"));

      setOpen(false);
      await refresh();
      toast.success(
        mode === "create" ? "Membre du jury ajouté" : "Membre du jury mis à jour",
      );
    } catch (e) {
      toast.error(e?.message || t("admin.errors.generic"));
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    const member = deleteTarget;

    try {
      const r = await fetch(`${getApiUrl()}/jury/${member.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d?.error || t("admin.errors.delete"));
      await refresh();
      toast.success("Membre du jury supprimé");
    } catch (e) {
      toast.error(e?.message || t("admin.errors.delete"));
    } finally {
      setDeleteTarget(null);
    }
  }

  return {
    loading,
    sortedJury,
    open,
    mode,
    initialValues,
    saving,
    openCreate,
    openEdit,
    closeForm,
    submitForm,
    deleteTarget,
    requestDelete,
    cancelDelete,
    confirmDelete,
  };
}
