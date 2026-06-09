import { typeAdminSection } from "../../utils/typography.js";
import { fmtContactDate, getMessageStatus } from "../../utils/adminMessagesUtils.js";
import { MessageStatusPill } from "./AdminMessagesParts.jsx";

export default function MessageDetailPanel({
  selected,
  reply,
  setReply,
  sending,
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
          className="mt-3 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 outline-none focus:ring-2 focus:ring-black/10 dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:focus:ring-white/10"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setReply("")}
            className="rounded-full border border-black/10 bg-black/[0.03] px-5 py-2 text-sm font-semibold text-black/70 hover:bg-black/[0.05] dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
          >
            Effacer
          </button>

          <button
            type="button"
            onClick={onSendReply}
            disabled={sending || !reply.trim()}
            className="rounded-full bg-black px-6 py-2 text-sm font-extrabold tracking-wide text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {sending ? "Envoi…" : "Envoyer la réponse"}
          </button>
        </div>
      </div>
    </div>
  );
}
