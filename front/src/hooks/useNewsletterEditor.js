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

  const {
    blocks,
    setBlocks,
    addBlock,
    updateBlock,
    removeBlock,
    moveBlock,
    uploadImage,
  } = useNewsletterBlocks();

  async function load() {
    setLoading(true);

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
      toast.error(e?.message || "Erreur");
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
      toast.error("Le subject est requis.");
      return;
    }

    setSaving(true);

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
      toast.success("Newsletter sauvegardée");
    } catch (e) {
      toast.error(e?.message || "Erreur");
    } finally {
      setSaving(false);
    }
  }

  async function sendTest() {
    if (!testTo.trim()) {
      toast.error("Ajoute un email pour l'envoi test.");
      return;
    }

    try {
      await sendTestNewsletter(newsletterId, testTo);
      toast.success("Email de test envoyé");
    } catch (e) {
      toast.error(e?.message || "Erreur");
    }
  }

  async function scheduleNewsletterAction() {
    if (!scheduledAt) {
      toast.error("Choisis une date/heure pour programmer.");
      return;
    }

    setScheduling(true);

    try {
      await scheduleNewsletter(newsletterId, scheduledAt);
      toast.success("Newsletter programmée");
      await load();
    } catch (e) {
      toast.error(e?.message || "Erreur");
    } finally {
      setScheduling(false);
    }
  }

  async function cancelSchedule() {
    setScheduling(true);

    try {
      await cancelScheduleNewsletter(newsletterId);
      toast.success("Programmation annulée");
      setScheduledAt("");
      await load();
    } catch (e) {
      toast.error(e?.message || "Erreur");
    } finally {
      setScheduling(false);
    }
  }

  async function sendNowToAll() {
    setSendingAll(true);

    try {
      await sendNowNewsletter(newsletterId);
      toast.success("Envoi terminé");
      await load();
    } catch (e) {
      toast.error(e?.message || "Erreur");
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
  };
}
