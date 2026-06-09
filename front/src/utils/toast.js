export const TOAST_SCOPE_GLOBAL = "global";

const SUCCESS_MS = 4000;
const ERROR_MS = 6000;
const INFO_MS = 5000;

let idCounter = 0;
const listeners = new Map();

export function subscribeToastScope(scope, fn) {
  if (!listeners.has(scope)) listeners.set(scope, new Set());
  listeners.get(scope).add(fn);

  return () => {
    const set = listeners.get(scope);
    if (!set) return;
    set.delete(fn);
    if (set.size === 0) listeners.delete(scope);
  };
}

function emit(scope, toast) {
  listeners.get(scope)?.forEach((fn) => fn(toast));
}

function pushToast(type, message, options = {}) {
  const text = String(message || "").trim();
  if (!text) return;

  const scope = options.scope ?? TOAST_SCOPE_GLOBAL;
  const id = ++idCounter;
  const duration =
    type === "success" ? SUCCESS_MS : type === "error" ? ERROR_MS : INFO_MS;

  emit(scope, { id, type, message: text, duration });
}

export const toast = {
  success: (message, options) => pushToast("success", message, options),
  error: (message, options) => pushToast("error", message, options),
  info: (message, options) => pushToast("info", message, options),
};
