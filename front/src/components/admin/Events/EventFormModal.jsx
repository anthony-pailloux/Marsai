import { typeAdminSection } from "../../../utils/typography.js";

export default function EventFormModal({
  open,
  editing,
  form,
  setForm,
  onClose,
  onSave,
  t,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 dark:bg-black/70">
      <div className="w-full max-w-2xl rounded-3xl border border-black/10 bg-white p-6 shadow-xl dark:border-[#FF8C42]/60 dark:bg-[#0b0b0b] dark:shadow-[0_0_40px_rgba(255,140,66,0.2)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-black/60 dark:text-white/60">
              {editing ? t("modalSubtitleEdit") : t("modalSubtitleCreate")}{" "}
              {t("modalSubtitleSuffix")}
            </p>
            <h3 className={`mt-1 ${typeAdminSection}`}>
              {editing ? t("modalTitleEdit") : t("modalTitleNew")} —{" "}
              <span className="text-[#FF8C42]">marsAI</span>
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-black/10 px-3 py-2 text-sm hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/15"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSave} className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-xs text-black/60 dark:text-white/60">
              {t("labelTitle")}
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
              required
              className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#FF8C42]/60 dark:bg-black/35 dark:focus:border-[#FF8C42]/60"
              placeholder={t("placeholderTitle")}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-black/60 dark:text-white/60">
              {t("labelDescription")}
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((s) => ({ ...s, description: e.target.value }))
              }
              rows={3}
              className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#FF8C42]/60 dark:bg-black/35 dark:focus:border-[#FF8C42]/60"
              placeholder={t("placeholderDescription")}
            />
          </div>

          <div>
            <label className="text-xs text-black/60 dark:text-white/60">
              {t("labelDateHour")}
            </label>
            <input
              type="datetime-local"
              value={form.startAt}
              onChange={(e) =>
                setForm((s) => ({ ...s, startAt: e.target.value }))
              }
              className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#FF8C42]/60 dark:bg-black/35 dark:focus:border-[#FF8C42]/60"
            />
          </div>

          <div>
            <label className="text-xs text-black/60 dark:text-white/60">
              {t("labelCapacity")}
            </label>
            <input
              type="number"
              min={0}
              value={form.capacity}
              onChange={(e) =>
                setForm((s) => ({ ...s, capacity: e.target.value }))
              }
              className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#FF8C42]/60 dark:bg-black/35 dark:focus:border-[#FF8C42]/60"
            />
          </div>

          <div>
            <label className="text-xs text-black/60 dark:text-white/60">
              {t("labelDuration")}
            </label>
            <input
              type="number"
              min={1}
              value={form.length}
              onChange={(e) =>
                setForm((s) => ({ ...s, length: e.target.value }))
              }
              className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#FF8C42]/60 dark:bg-black/35 dark:focus:border-[#FF8C42]/60"
              placeholder="90"
            />
          </div>

          <div>
            <label className="text-xs text-black/60 dark:text-white/60">
              {t("labelLocation")}
            </label>
            <input
              value={form.location}
              onChange={(e) =>
                setForm((s) => ({ ...s, location: e.target.value }))
              }
              className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#FF8C42]/60 dark:bg-black/35 dark:focus:border-[#FF8C42]/60"
              placeholder={t("placeholderLocation")}
            />
          </div>

          <div>
            <label className="text-xs text-black/60 dark:text-white/60">
              {t("labelType")}
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
              className="mt-1 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none focus:border-black/20 dark:border-[#FF8C42]/60 dark:bg-black/35 dark:focus:border-[#FF8C42]/60"
            >
              <option value="atelier">{t("typeAtelier")}</option>
              <option value="masterclass">{t("typeMasterclass")}</option>
              <option value="conference">{t("typeConference")}</option>
              <option value="projection">{t("typeProjection")}</option>
            </select>
          </div>

          <div className="md:col-span-2 mt-2 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-black/10 px-4 py-3 text-sm font-semibold hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/15"
            >
              {t("cancel")}
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-[#FF8C42] hover:bg-[#E07830] transition-colors px-4 py-3 text-sm font-semibold"
            >
              {editing ? t("save") : t("createEventButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
