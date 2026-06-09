import { useEffect, useState } from "react";
import { subscribeToast } from "../../utils/toast.js";

const STYLES = {
  success:
    "bg-[#1AFF7A]/15 text-[#0f7a3f] ring-[#1AFF7A]/30 dark:text-[#1AFF7A]",
  error: "bg-[#DC2626]/15 text-[#DC2626] ring-[#DC2626]/30",
  info: "bg-[#52A3FF]/15 text-[#1d4ed8] ring-[#52A3FF]/30 dark:text-[#93c5fd]",
};

export default function ToastHost() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    return subscribeToast((toast) => {
      setToasts((prev) => [...prev, toast]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, toast.duration);
    });
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed top-4 right-4 z-[9999] flex w-[min(100vw-2rem,24rem)] flex-col gap-2"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg ring-1 ${STYLES[t.type] || STYLES.info}`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
