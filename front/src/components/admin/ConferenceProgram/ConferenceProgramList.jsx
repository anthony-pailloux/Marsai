import { formatDayLabel } from "./conferenceProgramUtils.js";

export default function ConferenceProgramList({
  items,
  loading,
  t,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <p className="mt-4 text-sm text-black/60">{t("loading")}</p>;
  }

  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/10 bg-black/5 px-4 py-3 dark:border-white/10 dark:bg-white/5"
        >
          <span className="text-sm text-black/70 dark:text-white/70">
            {formatDayLabel(item.day)}
          </span>
          <span className="font-mono text-sm">{item.time}</span>
          <span className="font-medium">{item.title}</span>
          {item.speaker && (
            <span className="text-sm text-black/60 dark:text-white/60">
              {item.speaker}
            </span>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="rounded-lg bg-black/10 px-3 py-1 text-sm dark:bg-white/10"
            >
              {t("edit")}
            </button>
            <button
              type="button"
              onClick={() => onDelete(item)}
              className="rounded-lg bg-red-500/10 px-3 py-1 text-sm text-red-600 dark:text-red-400"
            >
              {t("delete")}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
