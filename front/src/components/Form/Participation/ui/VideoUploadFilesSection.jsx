import { Field } from "./Field";
import { typeAdminSection } from "../../../../utils/typography.js";
import { videoFileInputClass } from "./videoUploadUi.js";

export default function VideoUploadFilesSection({
  t,
  updateFile,
  updateStill,
  help,
  uploading,
}) {
  const fileClass = videoFileInputClass(uploading);

  return (
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
            className={fileClass}
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
            className={fileClass}
          />
          <div className={help}>{t("upload.fields.cover.help")}</div>
        </Field>

        <Field label={t("upload.fields.still1.label")} required>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => updateStill(0, e.target.files?.[0])}
            disabled={uploading}
            className={fileClass}
          />
          <div className={help}>{t("upload.fields.still1.help")}</div>
        </Field>

        <Field label={t("upload.fields.still2.label")}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => updateStill(1, e.target.files?.[0])}
            disabled={uploading}
            className={fileClass}
          />
          <div className={help}>{t("upload.fields.still2.help")}</div>
        </Field>

        <Field label={t("upload.fields.still3.label")}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => updateStill(2, e.target.files?.[0])}
            disabled={uploading}
            className={fileClass}
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
            className={fileClass}
          />
          <div className={help}>{t("upload.fields.subtitles.help")}</div>
        </Field>
      </div>
    </section>
  );
}
