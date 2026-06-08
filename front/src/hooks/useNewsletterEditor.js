import { useEffect, useMemo, useState } from "react";
import { getApiUrl } from "../utils/apiBase.js";
import { getAuthHeaders } from "../utils/authHeaders.js";
import {
  buildNewsletterPreview,
  newsletterFullUrl,
  parseNewsletterBlocks,
  toDatetimeLocal,
} from "../utils/newsletterEditorUtils.js";

export default function useNewsletterEditor(newsletterId) {
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("#ffffff");
  const [contentHtml, setContentHtml] = useState("");
  const [blocks, setBlocks] = useState([]);

  const [testTo, setTestTo] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [sendingAll, setSendingAll] = useState(false);
  const [scheduling, setScheduling] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${getApiUrl()}/admin/newsletters/${newsletterId}`, {
        headers: getAuthHeaders({ Accept: "application/json" }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur chargement");

      setSubject(data?.subject || "");
      setTitle(data?.title || "");
      setBackground(data?.background_color || "#ffffff");
      setScheduledAt(
        data?.scheduled_at ? toDatetimeLocal(data.scheduled_at) : "",
      );
      setContentHtml(data?.content_html || "");
      setBlocks(parseNewsletterBlocks(data?.content_json));
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!newsletterId) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsletterId]);

  function clearFeedback() {
    setMsg("");
  }

  function addBlock(type) {
    const block =
      type === "image"
        ? { type: "image", url: "", alt: "" }
        : { type: "divider" };
    setBlocks((prev) => [...prev, block]);
    clearFeedback();
  }

  function updateBlock(index, patch) {
    setBlocks((prev) =>
      prev.map((b, i) => (i === index ? { ...b, ...patch } : b)),
    );
    clearFeedback();
  }

  function removeBlock(index) {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
    clearFeedback();
  }

  function moveBlock(index, direction) {
    setBlocks((prev) => {
      const next = [...prev];
      const j = index + direction;
      if (j < 0 || j >= next.length) return prev;
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
    clearFeedback();
  }

  async function uploadImage(file, blockIndex) {
    const form = new FormData();
    form.append("image", file);

    const res = await fetch(`${getApiUrl()}/admin/newsletters/upload-image`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: form,
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || "Erreur upload");

    updateBlock(blockIndex, { url: newsletterFullUrl(data?.file?.url) });
  }

  async function save() {
    if (!subject.trim()) {
      setError("Le subject est requis.");
      return;
    }

    setSaving(true);
    setError("");
    setMsg("");

    try {
      const res = await fetch(`${getApiUrl()}/admin/newsletters/${newsletterId}`, {
        method: "PUT",
        headers: getAuthHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify({
          subject,
          title,
          background_color: background,
          content_json: { blocks },
          content_html: contentHtml,
          status: "draft",
          scheduled_at: null,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur sauvegarde");

      setMsg("Sauvegardé");
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setSaving(false);
    }
  }

  async function sendTest() {
    if (!testTo.trim()) {
      setError("Ajoute un email pour l’envoi test.");
      return;
    }

    setError("");
    setMsg("");

    try {
      const res = await fetch(
        `${getApiUrl()}/admin/newsletters/${newsletterId}/send-test`,
        {
          method: "POST",
          headers: getAuthHeaders({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
          body: JSON.stringify({ to: testTo }),
        },
      );

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur envoi test");

      setMsg("Test envoyé (check Mailtrap)");
    } catch (e) {
      setError(e?.message || "Erreur");
    }
  }

  async function scheduleNewsletter() {
    if (!scheduledAt) {
      setError("Choisis une date/heure pour programmer.");
      return;
    }

    setScheduling(true);
    setError("");
    setMsg("");

    try {
      const res = await fetch(
        `${getApiUrl()}/admin/newsletters/${newsletterId}/schedule`,
        {
          method: "POST",
          headers: getAuthHeaders({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
          body: JSON.stringify({ scheduled_at: new Date(scheduledAt).toISOString() }),
        },
      );

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur programmation");

      setMsg("Programmée");
      await load();
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setScheduling(false);
    }
  }

  async function cancelSchedule() {
    setScheduling(true);
    setError("");
    setMsg("");

    try {
      const res = await fetch(
        `${getApiUrl()}/admin/newsletters/${newsletterId}/cancel-schedule`,
        {
          method: "POST",
          headers: getAuthHeaders({ Accept: "application/json" }),
        },
      );

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur annulation");

      setMsg("Programmation annulée");
      setScheduledAt("");
      await load();
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setScheduling(false);
    }
  }

  async function sendNowToAll() {
    setSendingAll(true);
    setError("");
    setMsg("");

    try {
      const res = await fetch(
        `${getApiUrl()}/admin/newsletters/${newsletterId}/send-now`,
        {
          method: "POST",
          headers: getAuthHeaders({ Accept: "application/json" }),
        },
      );

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur envoi");

      setMsg("Envoi terminé (check Mailtrap)");
      await load();
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setSendingAll(false);
    }
  }

  const previewDoc = useMemo(
    () =>
      buildNewsletterPreview({
        subject,
        title,
        background,
        contentHtml,
        blocks,
      }),
    [subject, title, background, contentHtml, blocks],
  );

  return {
    subject,
    setSubject,
    title,
    setTitle,
    background,
    setBackground,
    contentHtml,
    setContentHtml,
    blocks,
    testTo,
    setTestTo,
    scheduledAt,
    setScheduledAt,
    sendingAll,
    scheduling,
    loading,
    saving,
    msg,
    error,
    previewDoc,
    addBlock,
    updateBlock,
    removeBlock,
    moveBlock,
    uploadImage,
    save,
    sendTest,
    scheduleNewsletter,
    cancelSchedule,
    sendNowToAll,
    setMsg,
    setError,
  };
}
