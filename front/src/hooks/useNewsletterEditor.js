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

  async function save() {
    if (!subject.trim()) {
      setError("Le subject est requis.");
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
    } catch (e) {
      setError(e?.message || "Erreur");
    } finally {
      setSaving(false);
    }
  }

  async function sendTest() {
    if (!testTo.trim()) {
      setError("Ajoute un email pour l'envoi test.");
      return;
    }

    setError("");
    setMsg("");

    try {
      await sendTestNewsletter(newsletterId, testTo);
      setMsg("Test envoyé (check Mailtrap)");
    } catch (e) {
      setError(e?.message || "Erreur");
    }
  }

  async function scheduleNewsletterAction() {
    if (!scheduledAt) {
      setError("Choisis une date/heure pour programmer.");
      return;
    }

    setScheduling(true);
    setError("");
    setMsg("");

    try {
      await scheduleNewsletter(newsletterId, scheduledAt);
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
      await cancelScheduleNewsletter(newsletterId);
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
      await sendNowNewsletter(newsletterId);
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
    scheduleNewsletter: scheduleNewsletterAction,
    cancelSchedule,
    sendNowToAll,
    setMsg,
    setError,
  };
}
