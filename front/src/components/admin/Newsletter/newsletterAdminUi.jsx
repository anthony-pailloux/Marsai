export function NewsletterStatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-5 dark:border-white/10 dark:bg-white/[0.06]">
      <div className="text-2xl font-black">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
        {label}
      </div>
    </div>
  );
}

export function NewsletterStatusPill({ status, unsubscribed_at }) {
  const isUnsub = Boolean(unsubscribed_at);
  const label = isUnsub ? "unsubscribed" : status;

  const cls =
    label === "active"
      ? "bg-green-500/10 text-green-600 dark:text-green-400"
      : label === "pending"
        ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
        : "bg-red-500/10 text-red-700 dark:text-red-400";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${cls}`}
    >
      {label}
    </span>
  );
}
