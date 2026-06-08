import { Field, TextInput, TextArea, Select } from "./Field";
import TagInput from "./TagInput";
import { typeAdminSection } from "../../../../utils/typography.js";

const LANGUAGE_CODES = [
  "fr",
  "en",
  "es",
  "it",
  "de",
  "pt",
  "ar",
  "nl",
  "ru",
  "zh",
  "ja",
  "ko",
];

const fileInputClass = (uploading) =>
  [
    "w-full rounded-2xl p-4 text-sm outline-none transition",
    "bg-[#E9E9EA] text-neutral-700",
    "dark:bg-neutral-800 dark:text-white",
    uploading ? "opacity-60 cursor-not-allowed" : "",
  ].join(" ");

export default function VideoUploadFields({
  t,
  form,
  update,
  tags,
  setTags,
  files,
  updateFile,
  updateStill,
  countries,
  countriesLoading,
  countriesErr,
  inputClass,
  help,
  uploading,
}) {
  return (
    <div className="space-y-12 text-neutral-900 dark:text-white">
      <h2 className={`text-center ${typeAdminSection}`}>{t("upload.title")}</h2>

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
              {LANGUAGE_CODES.map((code) => (
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

      <section className="space-y-6">
        <h3 className={`text-orange-500 ${typeAdminSection}`}>
          {t("upload.sections.ai")}
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label={t("upload.fields.techResume.label")} required>
            <TextArea
              name="tech_resume"
              value={form.tech_resume}
              onChange={update}
              className={inputClass}
            />
            <div className={help}>{t("upload.fields.techResume.help")}</div>
          </Field>

          <Field label={t("upload.fields.creativeResume.label")} required>
            <TextArea
              name="creative_resume"
              value={form.creative_resume}
              onChange={update}
              className={inputClass}
            />
            <div className={help}>{t("upload.fields.creativeResume.help")}</div>
          </Field>
        </div>

        <Field label={t("upload.fields.aiTech.label")} required>
          <TextInput
            name="ai_tech"
            value={form.ai_tech}
            onChange={update}
            className={inputClass}
          />
          <div className={help}>{t("upload.fields.aiTech.help")}</div>
        </Field>
      </section>

      <section className="space-y-6">
        <h3 className={`text-orange-500 ${typeAdminSection}`}>
          {t("upload.sections.files")}
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label={t("upload.fields.video.label")} required>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={updateFile}
              disabled={uploading}
              className={fileInputClass(uploading)}
            />
            <div className={help}>{t("upload.fields.video.help")}</div>
          </Field>

          <Field label={t("upload.fields.cover.label")} required>
            <input
              type="file"
              name="cover"
              accept="image/*"
              onChange={updateFile}
              disabled={uploading}
              className={fileInputClass(uploading)}
            />
            <div className={help}>{t("upload.fields.cover.help")}</div>
          </Field>

          <Field label={t("upload.fields.still1.label")} required>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => updateStill(0, e.target.files?.[0])}
              disabled={uploading}
              className={fileInputClass(uploading)}
            />
            <div className={help}>{t("upload.fields.still1.help")}</div>
          </Field>

          <Field label={t("upload.fields.still2.label")}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => updateStill(1, e.target.files?.[0])}
              disabled={uploading}
              className={fileInputClass(uploading)}
            />
            <div className={help}>{t("upload.fields.still2.help")}</div>
          </Field>

          <Field label={t("upload.fields.still3.label")}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => updateStill(2, e.target.files?.[0])}
              disabled={uploading}
              className={fileInputClass(uploading)}
            />
            <div className={help}>{t("upload.fields.still3.help")}</div>
          </Field>

          <Field label={t("upload.fields.subtitles.label")} required>
            <input
              type="file"
              name="subtitles"
              accept=".srt"
              multiple
              onChange={updateFile}
              disabled={uploading}
              className={fileInputClass(uploading)}
            />
            <div className={help}>{t("upload.fields.subtitles.help")}</div>
          </Field>
        </div>
      </section>
    </div>
  );
}
