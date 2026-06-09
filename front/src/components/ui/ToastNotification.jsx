const ICONS = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

const RING = {
  success: "ring-[#1AFF7A]/40",
  error: "ring-[#DC2626]/40",
  info: "ring-[#52A3FF]/40",
};

const TEXT = {
  success: "text-[#0f7a3f] dark:text-[#1AFF7A]",
  error: "text-[#DC2626]",
  info: "text-[#1d4ed8] dark:text-[#93c5fd]",
};

export default function ToastNotification({ toast, onDismiss }) {
  if (!toast) return null;

  const type = toast.type || "info";
  const isError = type === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`toast-enter flex w-full max-w-md items-start gap-3 rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg ring-1 backdrop-blur-md bg-white/92 dark:bg-[#0B0F1A]/92 ${RING[type] || RING.info}`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${TEXT[type] || TEXT.info}`}
        aria-hidden="true"
      >
        {ICONS[type] || ICONS.info}
      </span>

      <p className={`min-w-0 flex-1 text-center leading-snug ${TEXT[type] || TEXT.info}`}>
        {toast.message}
      </p>

      {onDismiss ? (
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="shrink-0 rounded-lg p-1 text-black/40 transition hover:bg-black/5 hover:text-black/70 dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white/80"
          aria-label="Fermer la notification"
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}
