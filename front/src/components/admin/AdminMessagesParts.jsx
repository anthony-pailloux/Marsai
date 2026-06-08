import {
  typeAdminSection,
  typeBadge,
  typeCaption,
} from "../../utils/typography.js";
import { fmtContactDate, getMessageStatus } from "../../utils/adminMessagesUtils.js";

export function MessageStatusPill({ status }) {
  const cls =
    status === "new"
      ? "bg-[#EAF1FF] text-[#2F6BFF] border-black/10 dark:bg-white/5 dark:text-white/80 dark:border-white/10"
      : status === "replied"
        ? "bg-[#E9FFF2] text-[#10B981] border-black/10 dark:bg-white/5 dark:text-white/80 dark:border-white/10"
        : "bg-black/[0.03] text-black/60 border-black/10 dark:bg-white/5 dark:text-white/70 dark:border-white/10";

  const label =
    status === "new" ? "NOUVEAU" : status === "replied" ? "RÉPONDU" : "LU";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1",
        typeBadge,
        cls,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

export function MessageListItem({ message, isActive, onSelect }) {
  const status = getMessageStatus(message);
  const subject = message.subject || "Sans sujet";
  const from = `${message.name || "—"} ${message.last_name || ""}`.trim();
  const date = fmtContactDate(message.created_at);

  return (
    <button
      type="button"
      onClick={() => onSelect(message.id)}
      className={[
        "w-full px-6 py-4 text-left transition",
        isActive
          ? "bg-black/[0.03] dark:bg-white/5"
          : "hover:bg-black/[0.02] dark:hover:bg-white/[0.04]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
            {subject}
          </div>
          <div className="mt-1 truncate text-xs text-black/55 dark:text-white/55">
            {from} • {message.email || "—"}
          </div>
          <div className="mt-2 line-clamp-2 text-xs text-black/45 dark:text-white/45">
            {message.message || ""}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <MessageStatusPill status={status} />
          <div className={`text-black/40 dark:text-white/40 ${typeCaption}`}>
            {date}
          </div>
        </div>
      </div>
    </button>
  );
}

export function MessageDetailPanel({
  selected,
  reply,
  setReply,
  sending,
  sendErr,
  sendOk,
  onSendReply,
}) {
  if (!selected) {
    return (
      <div className="p-8 text-sm text-black/60 dark:text-white/60">
        Sélectionne un message à gauche.
      </div>
    );
  }

  const status = getMessageStatus(selected);

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className={typeAdminSection}>
            {selected.subject || "Sans sujet"}
          </div>

          <div className="mt-2 text-xs text-black/55 dark:text-white/55">
            <span className="font-semibold text-black/80 dark:text-white/80">
              De :
            </span>{" "}
            {`${selected.name || "—"} ${selected.last_name || ""}`.trim()}
            {" • "}
            <span className="font-semibold">{selected.email || "—"}</span>
          </div>

          <div className="mt-1 text-xs text-black/45 dark:text-white/45">
            Reçu : {fmtContactDate(selected.created_at)}
          </div>
        </div>

        <div className="shrink-0">
          <MessageStatusPill status={status} />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-sm leading-7 text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
        {selected.message || "—"}
      </div>

      {selected.admin_reply ? (
        <div className="mt-5">
          <div className="text-xs font-extrabold uppercase tracking-widest text-black/45 dark:text-white/45">
            Réponse envoyée
          </div>
          <div className="mt-2 rounded-2xl border border-black/10 bg-white p-4 text-sm text-black/75 shadow-sm dark:border-white/10 dark:bg-black/30 dark:text-white/75">
            {selected.admin_reply}
          </div>
          {selected.replied_at ? (
            <div className="mt-2 text-xs text-black/45 dark:text-white/45">
              Envoyée : {fmtContactDate(selected.replied_at)}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6">
        <div className="text-xs font-extrabold uppercase tracking-widest text-black/45 dark:text-white/45">
          Répondre
        </div>

        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={6}
          placeholder="Écris ta réponse ici…"
          className="
            mt-3 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 outline-none
            focus:ring-2 focus:ring-black/10
            dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:focus:ring-white/10
          "
        />

        {sendErr ? (
          <div className="mt-3 text-sm text-red-600 dark:text-red-300">
            {sendErr}
          </div>
        ) : null}

        {sendOk ? (
          <div className="mt-3 text-sm text-emerald-600 dark:text-emerald-300">
            {sendOk}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setReply("")}
            className="rounded-full border border-black/10 bg-black/[0.03] px-5 py-2 text-sm font-semibold text-black/70 hover:bg-black/[0.05]
                       dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
          >
            Effacer
          </button>

          <button
            type="button"
            onClick={onSendReply}
            disabled={sending || !reply.trim()}
            className="
              rounded-full bg-black px-6 py-2 text-sm font-extrabold tracking-wide text-white
              hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50
              dark:bg-white dark:text-black
            "
          >
            {sending ? "Envoi…" : "Envoyer la réponse"}
          </button>
        </div>
      </div>
    </div>
  );
}
