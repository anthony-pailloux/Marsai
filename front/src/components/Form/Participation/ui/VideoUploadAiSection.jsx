import { Field, TextInput, TextArea } from "./Field";
import { typeAdminSection } from "../../../../utils/typography.js";

export default function VideoUploadAiSection({ t, form, update, inputClass, help }) {
  return (
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
  );
}
