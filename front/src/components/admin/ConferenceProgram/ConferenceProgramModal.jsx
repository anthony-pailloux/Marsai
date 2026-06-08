import { typeAdminSection } from "../../../utils/typography.js";

export default function ConferenceProgramModal({
  open,
  editing,
  form,
  colors,
  t,
  onClose,
  onSubmit,
  onFieldChange,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-black">
        <h3 className={typeAdminSection}>
          {editing ? t("modalTitleEdit") : t("modalTitleNew")}
        </h3>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs text-black/60 dark:text-white/60">
              {t("labelDay")}
            </label>
            <input
              type="date"
              value={form.day}
              onChange={(e) => onFieldChange("day", e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 dark:bg-white/5"
            />
          </div>
          <div>
            <label className="block text-xs text-black/60 dark:text-white/60">
              {t("labelTime")}
            </label>
            <input
              type="text"
              value={form.time}
              onChange={(e) => onFieldChange("time", e.target.value)}
              placeholder={t("placeholderTime")}
              className="mt-1 w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 dark:bg-white/5"
            />
          </div>
          <div>
            <label className="block text-xs text-black/60 dark:text-white/60">
              {t("labelTitle")}
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => onFieldChange("title", e.target.value)}
              maxLength={80}
              required
              className="mt-1 w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 dark:bg-white/5"
            />
          </div>
          <div>
            <label className="block text-xs text-black/60 dark:text-white/60">
              {t("labelSpeaker")}
            </label>
            <input
              type="text"
              value={form.speaker}
              onChange={(e) => onFieldChange("speaker", e.target.value)}
              maxLength={80}
              placeholder={t("placeholderSpeaker")}
              className="mt-1 w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 dark:bg-white/5"
            />
          </div>
          <div>
            <label className="block text-xs text-black/60 dark:text-white/60">
              {t("labelColor")}
            </label>
            <select
              value={form.color}
              onChange={(e) => onFieldChange("color", e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 dark:bg-white/5"
            >
              {colors.map((c) => (
                <option key={c.value} value={c.value}>
                  {t(c.labelKey)}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-black/10 px-4 py-2 text-sm dark:bg-white/10"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#FF8C42] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#E07830]"
            >
              {editing ? t("save") : t("create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
