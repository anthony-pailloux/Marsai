import { useEffect, useRef, useState } from "react";
import { subscribeToastScope, TOAST_SCOPE_GLOBAL } from "../../utils/toast.js";
import ToastNotification from "./ToastNotification.jsx";

/**
 * Toasts globaux : centrés en haut de l'écran.
 * Pour les actions de formulaire, préférer ActionToastZone près du bouton.
 */
export default function ToastHost() {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  function dismiss(id) {
    const timer = timersRef.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  useEffect(() => {
    return subscribeToastScope(TOAST_SCOPE_GLOBAL, (toast) => {
      setToasts((prev) => [toast, ...prev].slice(0, 3));

      const timer = window.setTimeout(() => dismiss(toast.id), toast.duration);
      timersRef.current.set(toast.id, timer);
    });
  }, []);

  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current.clear();
    },
    [],
  );

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed z-[100000] left-1/2 flex w-[min(100vw-2rem,28rem)] -translate-x-1/2 flex-col items-center gap-2
        top-[max(1rem,env(safe-area-inset-top))]"
      aria-live="polite"
      aria-atomic="false"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto w-full">
          <ToastNotification toast={t} onDismiss={dismiss} />
        </div>
      ))}
    </div>
  );
}
