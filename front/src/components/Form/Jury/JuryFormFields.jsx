import { useTranslation } from "react-i18next";
import {
  JuryFormField,
  JuryFormInput,
  JuryFormTextarea,
} from "./juryFormUi.jsx";

export default function JuryFormFields({
  form,
  fileName,
  fileInputId,
  mode,
  saving,
  onChange,
  onClose,
  onSubmit,
}) {
  const { t } = useTranslation("jury");

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <JuryFormField label={t("form.labels.firstName")} required>
          <JuryFormInput
            name="first_name"
            value={form.first_name}
            onChange={onChange}
            placeholder={t("form.placeholders.firstName")}
          />
        </JuryFormField>

        <JuryFormField label={t("form.labels.lastName")} required>
          <JuryFormInput
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder={t("form.placeholders.lastName")}
          />
        </JuryFormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <JuryFormField label={t("form.labels.role")} required>
          <JuryFormInput
            name="role_label"
            value={form.role_label}
            onChange={onChange}
            placeholder={t("form.placeholders.role")}
          />
        </JuryFormField>

        <JuryFormField label={t("form.labels.profession")}>
          <JuryFormInput
            name="profession"
            value={form.profession}
            onChange={onChange}
            placeholder={t("form.placeholders.profession")}
          />
        </JuryFormField>
      </div>

      <JuryFormField label={t("form.labels.bio")}>
        <JuryFormTextarea
          name="bio"
          value={form.bio}
          onChange={onChange}
          placeholder={t("form.placeholders.bio")}
        />
      </JuryFormField>

      <JuryFormField label={t("form.labels.filmography")}>
        <JuryFormInput
          name="filmography_url"
          value={form.filmography_url}
          onChange={onChange}
          placeholder={t("form.placeholders.filmography")}
        />
      </JuryFormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <JuryFormField label={t("form.labels.sortOrder")}>
          <JuryFormInput
            type="number"
            name="sort_order"
            value={form.sort_order}
            onChange={onChange}
            placeholder={t("form.placeholders.sortOrder")}
          />
        </JuryFormField>

        <div className="flex items-end">
          <label className="flex w-full items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm font-semibold text-neutral-800 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
            <input
              type="checkbox"
              name="is_president"
              checked={Number(form.is_president) === 1}
              onChange={onChange}
            />
            <span>{t("form.labels.isPresident")}</span>
          </label>
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-neutral-800 dark:text-white/85">
          {t("form.labels.photo")}
        </div>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-neutral-600 dark:text-white/60">
            {fileName ? (
              <>
                <span className="font-semibold text-neutral-800 dark:text-white/85">
                  {t("form.file.selected")}:
                </span>{" "}
                {fileName}
              </>
            ) : (
              t("form.file.none")
            )}
          </div>

          <input
            id={fileInputId}
            type="file"
            accept="image/*"
            name="img"
            onChange={onChange}
            className="hidden"
          />

          <label
            htmlFor={fileInputId}
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-bold text-neutral-800 hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
          >
            {t("form.actions.addPhoto")}
          </label>
        </div>

        <div className="mt-1 text-xs text-neutral-500 dark:text-white/45">
          {t("form.hints.photo")}
        </div>
      </div>

      <div className="mt-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-neutral-200 bg-white px-6 py-2 text-sm font-bold text-neutral-800 hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
        >
          {t("form.actions.cancel")}
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#FF8C42] px-7 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#E07830] disabled:opacity-50"
        >
          {saving
            ? t("form.actions.saving")
            : mode === "create"
              ? t("form.actions.create")
              : t("form.actions.update")}
        </button>
      </div>
    </form>
  );
}
