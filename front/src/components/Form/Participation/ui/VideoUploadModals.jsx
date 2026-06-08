import ModalShell from "./ModalShell.jsx";

export function VideoUploadConfirmModal({
  open,
  t,
  errorMsg,
  uploading,
  onClose,
  onConfirm,
}) {
  return (
    <ModalShell open={open} title={t("upload.confirm.title")} onClose={onClose}>
      <div className="space-y-4 text-sm text-neutral-800">
        <p>{t("upload.confirm.text")}</p>
        <p className="text-xs text-neutral-500">{t("upload.confirm.hint")}</p>

        {errorMsg ? (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
            {errorMsg}
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            disabled={uploading}
          >
            {t("upload.confirm.cancel")}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-[#E07830] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
            disabled={uploading}
          >
            {uploading ? t("upload.confirm.sending") : t("upload.confirm.yes")}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

export function VideoUploadSuccessModal({
  open,
  t,
  successInfo,
  onClose,
}) {
  return (
    <ModalShell open={open} title={t("upload.success.title")} onClose={onClose}>
      <div className="space-y-4 text-sm text-neutral-800">
        <div className="rounded-xl bg-green-50 p-3 text-green-700 ring-1 ring-green-100">
          {successInfo || t("upload.uploadOkFallback")}
        </div>
        <p className="text-xs text-neutral-500">{t("upload.success.hint")}</p>
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-neutral-900 px-5 py-2 text-sm font-semibold text-white"
          >
            {t("upload.success.ok")}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
