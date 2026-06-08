import useVideoUploadForm from "../../../../hooks/useVideoUploadForm.js";
import VideoUploadFields from "./VideoUploadFields.jsx";
import {
  VideoUploadConfirmModal,
  VideoUploadSuccessModal,
} from "./VideoUploadModals.jsx";

export default function VideoUploadForm({ formRef, onCanProceedChange }) {
  const {
    t,
    internalFormRef,
    form,
    tags,
    setTags,
    countries,
    countriesLoading,
    countriesErr,
    confirmOpen,
    successOpen,
    uploading,
    successInfo,
    errorMsg,
    update,
    updateFile,
    updateStill,
    submit,
    closeConfirm,
    closeSuccess,
    confirmAndUpload,
  } = useVideoUploadForm({ formRef, onCanProceedChange });

  const inputClass =
    "bg-[#E9E9EA] text-neutral-900 placeholder:text-neutral-500 " +
    "focus:bg-[#E9E9EA] focus:text-neutral-900 " +
    "dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400 " +
    "dark:focus:bg-neutral-800 dark:focus:text-white";

  const help = "mt-2 text-xs italic text-neutral-500 dark:text-neutral-300";

  return (
    <>
      <VideoUploadConfirmModal
        open={confirmOpen}
        t={t}
        errorMsg={errorMsg}
        uploading={uploading}
        onClose={closeConfirm}
        onConfirm={confirmAndUpload}
      />

      <VideoUploadSuccessModal
        open={successOpen}
        t={t}
        successInfo={successInfo}
        onClose={closeSuccess}
      />

      <form ref={internalFormRef} onSubmit={submit} className="w-full">
        <VideoUploadFields
          t={t}
          form={form}
          update={update}
          tags={tags}
          setTags={setTags}
          updateFile={updateFile}
          updateStill={updateStill}
          countries={countries}
          countriesLoading={countriesLoading}
          countriesErr={countriesErr}
          inputClass={inputClass}
          help={help}
          uploading={uploading}
        />

        <div className="flex justify-center pt-2">
          <button type="submit" className="hidden" disabled={uploading}>
            SEND
          </button>
        </div>

        {errorMsg ? (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
            {errorMsg}
          </div>
        ) : null}
      </form>
    </>
  );
}
