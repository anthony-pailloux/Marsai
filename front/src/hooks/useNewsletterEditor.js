import { useEffect, useMemo, useState } from "react";
import {
  buildNewsletterPreview,
  parseNewsletterBlocks,
  toDatetimeLocal,
} from "../utils/newsletterEditorUtils.js";
import {
  cancelScheduleNewsletter,
  fetchNewsletter,
  saveNewsletter,
  scheduleNewsletter,
  sendNowNewsletter,
  sendTestNewsletter,
} from "../services/Admin/newsletterEditorApi.js";
import useNewsletterBlocks from "./useNewsletterBlocks.js";
import { toast } from "../utils/toast.js";

export default function useNewsletterEditor(newsletterId) {
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("#ffffff");
  const [contentHtml, setContentHtml] = useState("");

  const [testTo, setTestTo] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [sendingAll, setSendingAll] = useState(false);
  const [scheduling, setScheduling] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  function clearFeedback() {
    setMsg("");
  }

  const {
    blocks,
    setBlocks,
    addBlock,
    updateBlock,
    removeBlock,
    moveBlock,
    uploadImage,
  } = useNewsletterBlocks(clearFeedback);

  async function load() {
    setLoading(true);
    setError("");

    try {
      const data = await fetchNewsletter(newsletterId);
      setSubject(data?.subject || "");
      setTitle(data?.title || "");
      setBackground(data?.background_color || "#ffffff");
      setScheduledAt(
        data?.scheduled_at ? toDatetimeLocal(data.scheduled_at) : "",
      );
      setContentHtml(data?.content_html || "");
      setBlocks(parseNewsletterBlocks(data?.content_json));
    } catch (e) {
      const msg = e?.message || "Erreur";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!newsletterId) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsletterId]);

  async function save() {
    if (!subject.trim()) {
      const msg = "Le subject est requis.";
      setError(msg);
      toast.error(msg);
      return;
    }

    setSaving(true);
    setError("");
    setMsg("");

    try {
      await saveNewsletter(newsletterId, {
        subject,
        title,
        background_color: background,
        content_json: { blocks },
        content_html: contentHtml,
        status: "draft",
        scheduled_at: null,
      });
      setMsg("Sauvegardé");
      toast.success("Newsletter sauvegardée");
    } catch (e) {
      const msg = e?.message || "Erreur";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  async function sendTest() {
    if (!testTo.trim()) {
      const msg = "Ajoute un email pour l'envoi test.";
      setError(msg);
      toast.error(msg);
      return;
    }

    setError("");
    setMsg("");

    try {
      await sendTestNewsletter(newsletterId, testTo);
      setMsg("Test envoyé (check Mailtrap)");
      toast.success("Email de test envoyé");
    } catch (e) {
      const msg = e?.message || "Erreur";
      setError(msg);
      toast.error(msg);
    }
  }

  async function scheduleNewsletterAction() {
    if (!scheduledAt) {
      const msg = "Choisis une date/heure pour programmer.";
      setError(msg);
      toast.error(msg);
      return;
    }

    setScheduling(true);
    setError("");
    setMsg("");

    try {
      await scheduleNewsletter(newsletterId, scheduledAt);
      setMsg("Programmée");
      toast.success("Newsletter programmée");
      await load();
    } catch (e) {
      const msg = e?.message || "Erreur";
      setError(msg);
      toast.error(msg);
    } finally {
      setScheduling(false);
    }
  }

  async function cancelSchedule() {
    setScheduling(true);
    setError("");
    setMsg("");

    try {
      await cancelScheduleNewsletter(newsletterId);
      setMsg("Programmation annulée");
      toast.success("Programmation annulée");
      setScheduledAt("");
      await load();
    } catch (e) {
      const msg = e?.message || "Erreur";
      setError(msg);
      toast.error(msg);
    } finally {
      setScheduling(false);
    }
  }

  async function sendNowToAll() {
    setSendingAll(true);
    setError("");
    setMsg("");

    try {
      await sendNowNewsletter(newsletterId);
      setMsg("Envoi terminé (check Mailtrap)");
      toast.success("Envoi terminé");
      await load();
    } catch (e) {
      const msg = e?.message || "Erreur";
      setError(msg);
      toast.error(msg);
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
    scheduleNewsletter: scheduleNewsletterAction,
    cancelSchedule,
    sendNowToAll,
    setMsg,
    setError,
  };
}
