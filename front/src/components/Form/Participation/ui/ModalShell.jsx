import { useTranslation } from "react-i18next";
import { typeBadge, typeEyebrow } from "../../../../utils/typography.js";

export default function ModalShell({ open, title, children, onClose, closeAriaLabel }) {
  const { t } = useTranslation("participation");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999]">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label={closeAriaLabel || t("countryPicker.closeAria")}
      />
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/10">
        <div className="flex items-center justify-between gap-3 border-b border-neutral-200 px-6 py-4">
          <div className={`text-neutral-900 ${typeEyebrow}`}>{title}</div>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-xl bg-neutral-900 px-4 py-2 text-white ${typeBadge}`}
          >
            {t("countryPicker.close")}
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
