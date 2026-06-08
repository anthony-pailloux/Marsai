import { Field, TextInput, TextArea, Select } from "./Field";
import TagInput from "./TagInput";
import { typeAdminSection } from "../../../../utils/typography.js";
import { VIDEO_LANGUAGE_CODES } from "./videoUploadUi.js";

export default function VideoUploadIdentitySection({
  t,
  form,
  update,
  tags,
  setTags,
  countries,
  countriesLoading,
  countriesErr,
  inputClass,
  help,
}) {
  return (
    <section className="space-y-6">
      <h3 className={`text-orange-500 ${typeAdminSection}`}>
        {t("upload.sections.identity")}
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label={t("upload.fields.title.label")} required>
          <TextInput
            name="title"
            value={form.title}
            onChange={update}
            className={inputClass}
          />
          <div className={help}>{t("upload.fields.title.help")}</div>
        </Field>

        <Field label={t("upload.fields.titleEn.label")} required>
          <TextInput
            name="title_en"
            value={form.title_en}
            onChange={update}
            className={inputClass}
          />
          <div className={help}>{t("upload.fields.titleEn.help")}</div>
        </Field>

        <Field label={t("upload.fields.language.label")} required>
          <Select
            name="language"
            value={form.language}
            onChange={update}
            className={inputClass}
          >
            <option value="">{t("upload.fields.language.choose")}</option>
            {VIDEO_LANGUAGE_CODES.map((code) => (
              <option key={code} value={code}>
                {t(`upload.fields.language.options.${code}`)}
              </option>
            ))}
          </Select>
          <div className={help}>{t("upload.fields.language.help")}</div>
        </Field>

        <Field label={t("upload.fields.country.label")} required>
          <Select
            name="country"
            value={form.country}
            onChange={update}
            disabled={countriesLoading || !!countriesErr}
            className={inputClass}
          >
            <option value="">
              {countriesLoading
                ? t("upload.fields.country.loading")
                : countriesErr
                  ? t("upload.fields.country.error")
                  : t("upload.fields.country.choose")}
            </option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>

          {countriesErr ? (
            <div className="mt-2 text-xs text-red-500 dark:text-red-200">
              {countriesErr}
            </div>
          ) : null}

          <div className={help}>{t("upload.fields.country.help")}</div>
        </Field>

        <Field label={t("upload.fields.duration.label")} required>
          <TextInput
            name="duration"
            value={form.duration}
            onChange={update}
            placeholder={t("upload.fields.duration.placeholder")}
            className={inputClass}
          />
          <div className={help}>{t("upload.fields.duration.help")}</div>
        </Field>

        <Field label={t("upload.fields.youtube.label")}>
          <TextInput
            name="youtube_video_id"
            value={form.youtube_video_id}
            onChange={update}
            className={inputClass}
          />
          <div className={help}>{t("upload.fields.youtube.help")}</div>
        </Field>
      </div>

      <Field label={t("upload.fields.tags.label")}>
        <TagInput value={tags} onChange={setTags} />
        <div className={help}>{t("upload.fields.tags.help")}</div>
      </Field>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label={t("upload.fields.synopsis.label")} required>
          <TextArea
            name="synopsis"
            value={form.synopsis}
            onChange={update}
            className={inputClass}
          />
          <div className={help}>{t("upload.fields.synopsis.help")}</div>
        </Field>

        <Field label={t("upload.fields.synopsisEn.label")} required>
          <TextArea
            name="synopsis_en"
            value={form.synopsis_en}
            onChange={update}
            className={inputClass}
          />
          <div className={help}>{t("upload.fields.synopsisEn.help")}</div>
        </Field>
      </div>
    </section>
  );
}
