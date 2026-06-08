import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getApiUrl } from "../utils/apiBase.js";
import { getAuthHeaders } from "../utils/authHeaders.js";
import {
  buildJuryFormData,
  mapMemberToEditForm,
  sortJuryMembers,
} from "../utils/juryAdminUtils.js";

export default function useJuryAdmin() {
  const { t } = useTranslation("jury");

  const [jury, setJury] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [currentId, setCurrentId] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      const r = await fetch(`${getApiUrl()}/jury`);
      const d = await r.json();
      setJury(d?.jury || []);
    } catch {
      setError(t("admin.errors.load"));
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
    setError("");
    setOpen(true);
  }

  function openEdit(member) {
    setMode("edit");
    setCurrentId(member.id);
    setInitialValues(mapMemberToEditForm(member));
    setError("");
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
  }

  async function submitForm(form) {
    setSaving(true);
    setError("");

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
    } catch (e) {
      setError(e?.message || t("admin.errors.generic"));
    } finally {
      setSaving(false);
    }
  }

  async function removeMember(member) {
    const ok = confirm(
      t("admin.confirmDelete", {
        first_name: member.first_name,
        name: member.name,
      }),
    );
    if (!ok) return;

    try {
      const r = await fetch(`${getApiUrl()}/jury/${member.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d?.error || t("admin.errors.delete"));
      await refresh();
    } catch (e) {
      alert(e?.message || t("admin.errors.delete"));
    }
  }

  return {
    loading,
    error,
    sortedJury,
    open,
    mode,
    initialValues,
    saving,
    openCreate,
    openEdit,
    closeForm,
    submitForm,
    removeMember,
  };
}
