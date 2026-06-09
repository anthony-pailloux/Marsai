import { useEffect, useMemo, useState } from "react";
import { getApiBaseUrl } from "../utils/apiBase.js";
import { getAuthHeaders } from "../utils/authHeaders.js";
import {
  CONTACT_MESSAGES_ENDPOINTS,
  getMessageStatus,
} from "../utils/adminMessagesUtils.js";
import { toast } from "../utils/toast.js";

export default function useAdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [sendErr, setSendErr] = useState("");
  const [sendOk, setSendOk] = useState("");

  async function loadMessages() {
    try {
      setLoading(true);
      setErr("");

      const res = await fetch(
        `${getApiBaseUrl()}${CONTACT_MESSAGES_ENDPOINTS.list}`,
        { headers: getAuthHeaders({ Accept: "application/json" }) },
      );

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur chargement messages");

      const list = Array.isArray(data?.messages)
        ? data.messages
        : Array.isArray(data)
          ? data
          : [];

      list.sort(
        (a, b) =>
          new Date(b.created_at || b.createdAt || 0) -
          new Date(a.created_at || a.createdAt || 0),
      );

      setMessages(list);

      if (!selectedId && list[0]?.id != null) {
        setSelectedId(list[0].id);
      }
    } catch (e) {
      setErr(e?.message || "Erreur");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return messages;

    return messages.filter((m) => {
      const hay = [m.subject, m.message, m.email, m.name, m.last_name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(s);
    });
  }, [messages, q]);

  const selected = useMemo(() => {
    return filtered.find((m) => m.id === selectedId) || filtered[0] || null;
  }, [filtered, selectedId]);

  async function markRead(id) {
    if (!id) return;

    try {
      const res = await fetch(
        `${getApiBaseUrl()}${CONTACT_MESSAGES_ENDPOINTS.markRead(id)}`,
        {
          method: "POST",
          headers: getAuthHeaders({ Accept: "application/json" }),
        },
      );

      if (!res.ok) return;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                is_read: 1,
                read_at: m.read_at || new Date().toISOString(),
              }
            : m,
        ),
      );
    } catch {
      // silencieux
    }
  }

  useEffect(() => {
    if (selected?.id != null && getMessageStatus(selected) === "new") {
      markRead(selected.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  async function sendReply() {
    if (!selected?.id) return;
    const text = reply.trim();
    if (!text) return;

    try {
      setSending(true);
      setSendErr("");
      setSendOk("");

      const res = await fetch(
        `${getApiBaseUrl()}${CONTACT_MESSAGES_ENDPOINTS.reply(selected.id)}`,
        {
          method: "POST",
          headers: getAuthHeaders({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
          body: JSON.stringify({ reply: text }),
        },
      );

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur envoi réponse");

      setSendOk("Réponse enregistrée");
      toast.success("Réponse enregistrée");
      setReply("");

      setMessages((prev) =>
        prev.map((m) =>
          m.id === selected.id
            ? {
                ...m,
                admin_reply: text,
                replied_at: new Date().toISOString(),
                is_read: 1,
              }
            : m,
        ),
      );
    } catch (e) {
      const msg = e?.message || "Erreur";
      setSendErr(msg);
      toast.error(msg);
    } finally {
      setSending(false);
    }
  }

  return {
    messages,
    loading,
    err,
    q,
    setQ,
    selectedId,
    setSelectedId,
    reply,
    setReply,
    sending,
    sendErr,
    sendOk,
    filtered,
    selected,
    loadMessages,
    sendReply,
  };
}
