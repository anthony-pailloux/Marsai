const SUCCESS_MS = 4000;
const ERROR_MS = 6000;
const INFO_MS = 5000;

let listener = null;
let idCounter = 0;

export function subscribeToast(fn) {
  listener = fn;
  return () => {
    if (listener === fn) listener = null;
  };
}

function pushToast(type, message) {
  const text = String(message || "").trim();
  if (!text) return;

  const id = ++idCounter;
  const duration =
    type === "success" ? SUCCESS_MS : type === "error" ? ERROR_MS : INFO_MS;

  listener?.({ id, type, message: text, duration });
}

export const toast = {
  success: (message) => pushToast("success", message),
  error: (message) => pushToast("error", message),
  info: (message) => pushToast("info", message),
};
