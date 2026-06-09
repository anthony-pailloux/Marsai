import { useId } from "react";
import { useTranslation } from "react-i18next";
import useJuryForm from "../../../hooks/useJuryForm.js";
import JuryFormFields from "./JuryFormFields.jsx";
import { typeAdminSection, typeBodySm } from "../../../utils/typography.js";

export default function JuryForm({
  open,
  mode,
  initialValues,
  saving,
  onClose,
  onSubmit,
}) {
  const { t } = useTranslation("jury");
  const fileInputId = useId();
  const { form, fileName, handleChange, handleSubmit } = useJuryForm(
    initialValues,
    onSubmit,
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-neutral-900">
        <div className="flex items-start justify-between px-8 pb-5 pt-7">
          <div>
            <h2 className={typeAdminSection}>
              {mode === "create" ? t("form.titleCreate") : t("form.titleEdit")}
            </h2>
            <p className={`mt-1 text-neutral-600 dark:text-white/60 ${typeBodySm}`}>
              {t("form.helper")}
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label={t("form.actions.close")}
            className="grid h-10 w-10 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="px-8 pb-8">
          <JuryFormFields
            form={form}
            fileName={fileName}
            fileInputId={fileInputId}
            mode={mode}
            saving={saving}
            onChange={handleChange}
            onClose={onClose}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
