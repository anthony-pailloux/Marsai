import { typeBadge, typeCaption } from "../../utils/typography.js";
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
