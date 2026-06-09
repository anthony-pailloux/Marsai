import { useEffect, useRef, useState } from "react";
import { subscribeToastScope } from "../../utils/toast.js";
import ToastNotification from "./ToastNotification.jsx";

/**
 * Zone de toast centrée, liée à une action (souvent au-dessus du bouton submit).
 */
export default function ActionToastZone({ scope, placement = "above" }) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  function dismiss(id) {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast((current) => (current?.id === id ? null : current));
  }

  useEffect(() => {
    if (!scope) return undefined;

    return subscribeToastScope(scope, (next) => {
      if (timerRef.current) window.clearTimeout(timerRef.current);

      setToast(next);
      timerRef.current = window.setTimeout(() => dismiss(next.id), next.duration);
    });
  }, [scope]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  if (!toast) return null;

  return (
    <div
      className={`flex w-full justify-center px-1 ${placement === "above" ? "mb-3" : "mt-3"}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <ToastNotification toast={toast} onDismiss={dismiss} />
    </div>
  );
}
