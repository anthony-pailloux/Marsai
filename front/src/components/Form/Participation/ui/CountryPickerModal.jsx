import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { typeBadge } from "../../../../utils/typography.js";
import { flagUrl } from "./countryUtils.js";

export default function CountryPickerModal({ open, onClose, countries, onPick }) {
  const { t } = useTranslation("participation");
  const [q, setQ] = useState("");

  function closeModal() {
    setQ("");
    onClose();
  }

  function handlePick(country) {
    onPick(country);
    setQ("");
  }

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return countries;
    return countries.filter((c) => {
      return (
        c.name.toLowerCase().includes(s) ||
        c.dial.toLowerCase().includes(s) ||
        c.code.toLowerCase().includes(s)
      );
    });
  }, [countries, q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999]">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={closeModal}
        aria-label={t("countryPicker.closeAria")}
      />

      <div className="absolute left-1/2 top-1/2 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/10">
        <div className="flex items-center gap-3 border-b border-neutral-200 px-5 py-4">
          <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-neutral-900">
            {t("countryPicker.title")}
          </div>
          <button
            type="button"
            onClick={closeModal}
            className={`ml-auto rounded-xl bg-neutral-900 px-4 py-2 text-white ${typeBadge}`}
          >
            {t("countryPicker.close")}
          </button>
        </div>

        <div className="p-5">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("countryPicker.searchPlaceholder")}
            className="w-full rounded-2xl bg-neutral-100 px-5 py-3 text-sm outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-blue-500/30"
          />

          <div className="mt-4 max-h-[55vh] overflow-auto rounded-2xl ring-1 ring-black/5">
            {filtered.map((c) => (
              <button
                key={`${c.code}-${c.dial}`}
                type="button"
                onClick={() => handlePick(c)}
                className="flex w-full items-center gap-3 border-b border-neutral-100 px-4 py-3 text-left hover:bg-neutral-50"
              >
                <img
                  src={flagUrl(c.code, 24)}
                  alt=""
                  className="h-4 w-6 rounded-[2px] object-cover"
                  loading="lazy"
                  draggable="false"
                />
                <span className="flex-1 text-sm font-semibold text-neutral-900">
                  {c.name}
                </span>
                <span className="text-sm font-bold text-neutral-700">
                  {c.dial}
                </span>
              </button>
            ))}
            {!filtered.length ? (
              <div className="px-4 py-6 text-center text-sm text-neutral-500">
                {t("countryPicker.noResults")}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
