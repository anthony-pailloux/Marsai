import { typeAdminSection } from "../../../../utils/typography.js";
import VideoUploadIdentitySection from "./VideoUploadIdentitySection.jsx";
import VideoUploadAiSection from "./VideoUploadAiSection.jsx";
import VideoUploadFilesSection from "./VideoUploadFilesSection.jsx";

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

      <VideoUploadIdentitySection
        t={t}
        form={form}
        update={update}
        tags={tags}
        setTags={setTags}
        countries={countries}
        countriesLoading={countriesLoading}
        countriesErr={countriesErr}
        inputClass={inputClass}
        help={help}
      />

      <VideoUploadAiSection
        t={t}
        form={form}
        update={update}
        inputClass={inputClass}
        help={help}
      />

      <VideoUploadFilesSection
        t={t}
        updateFile={updateFile}
        updateStill={updateStill}
        help={help}
        uploading={uploading}
      />
    </div>
  );
}
