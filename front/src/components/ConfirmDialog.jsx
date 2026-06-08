/*Permet d'avoir une modal de confirmation avant de changer le role*/

import Button from "./ui/Button.jsx";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Demande de confirmation",
  message = "Êtes-vous sûr de vouloir effectuer ce changement ?",
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  confirmVariant = "primary",
}) {
  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 dark:bg-black/70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-lg border border-black/10 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-neutral-950 dark:shadow-[0_0_40px_rgba(0,0,0,0.3)]"
      >
        <h2
          id="confirm-dialog-title"
          className="text-lg font-semibold text-neutral-900 dark:text-white/90"
        >
          {title}
        </h2>
        <p
          id="confirm-dialog-message"
          className="mt-2 text-sm text-neutral-700 dark:text-white/70"
        >
          {message}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={confirmVariant === "danger" ? "danger" : "primary"}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
