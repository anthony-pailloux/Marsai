import { cn } from "../../utils/cn.js";

const sharedClasses =
  "marsai-input w-full text-sm outline-none transition " +
  "focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const variantMap = {
  default: cn(
    sharedClasses,
    "rounded-md px-6 py-4",
    "bg-surface-light text-neutral-900 placeholder:text-neutral-500",
    "dark:bg-surface-dark dark:text-white dark:placeholder:text-neutral-400",
    "required:border-brand/40 dark:required:border-brand/50",
    "invalid:border-danger invalid:text-danger/90 dark:invalid:border-danger",
  ),
  light: cn(
    sharedClasses,
    "rounded-md border border-black/10 bg-white px-4 py-2 text-black",
    "placeholder:text-black/40 dark:placeholder:text-white/40",
    "dark:border-white/10 dark:bg-black/30 dark:text-white",
    "required:border-brand/40 dark:required:border-brand/50",
    "invalid:border-danger invalid:text-danger/90 dark:invalid:border-danger",
  ),
  auth: cn(
    sharedClasses,
    "rounded-full border border-border-dark bg-surface-dark px-4 py-3 text-white",
    "placeholder:text-neutral-500",
    "focus:border-brand",
    "required:border-brand/40",
    "invalid:border-danger",
  ),
  dashboard: cn(
    sharedClasses,
    "rounded-full border border-black/10 bg-black/5 px-3 py-2",
    "text-black placeholder:text-black/40",
    "dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40",
  ),
  cms: cn(
    sharedClasses,
    "rounded-sm px-5 py-2.5 uppercase tracking-widest",
    "border border-black/10 bg-black/[0.07] backdrop-blur-sm",
    "placeholder:text-sm placeholder:uppercase placeholder:tracking-widest placeholder:text-white/70",
    "dark:border-white/10 dark:bg-white/[0.07]",
    "required:border-brand/40 invalid:border-danger invalid:text-danger/90",
  ),
};

export function getInputClasses(variant = "default", { error = false } = {}) {
  return cn(
    variantMap[variant] ?? variantMap.default,
    error && "border-danger ring-2 ring-danger/40",
  );
}

/** @deprecated Utiliser getInputClasses("default") */
export const inputBaseClasses = getInputClasses("default");

/** @deprecated Utiliser getInputClasses("light") */
export const inputLightClasses = getInputClasses("light");

/** @deprecated Utiliser getInputClasses("cms") */
export const inputCmsClasses = getInputClasses("cms");

function AutofillStyles() {
  return (
    <style>{`
      .marsai-input:-webkit-autofill,
      .marsai-input:-webkit-autofill:hover,
      .marsai-input:-webkit-autofill:focus,
      .marsai-input:-webkit-autofill:active {
        -webkit-text-fill-color: #111827 !important;
        caret-color: #111827 !important;
        background-color: #e9e9ea !important;
        background-image: none !important;
        -webkit-box-shadow: 0 0 0px 1000px #e9e9ea inset !important;
        box-shadow: 0 0 0px 1000px #e9e9ea inset !important;
        transition: background-color 999999s ease-in-out 0s !important;
      }

      .dark .marsai-input:-webkit-autofill,
      .dark .marsai-input:-webkit-autofill:hover,
      .dark .marsai-input:-webkit-autofill:focus,
      .dark .marsai-input:-webkit-autofill:active {
        -webkit-text-fill-color: #ffffff !important;
        caret-color: #ffffff !important;
        background-color: #0b0b0f !important;
        background-image: none !important;
        -webkit-box-shadow: 0 0 0px 1000px #0b0b0f inset !important;
        box-shadow: 0 0 0px 1000px #0b0b0f inset !important;
        transition: background-color 999999s ease-in-out 0s !important;
      }
    `}</style>
  );
}

export function Input({
  variant = "default",
  error = false,
  className = "",
  ...props
}) {
  return (
    <>
      <AutofillStyles />
      <input
        className={cn(getInputClasses(variant, { error }), className)}
        {...props}
      />
    </>
  );
}

export function Textarea({
  variant = "default",
  error = false,
  className = "",
  rows = 4,
  ...props
}) {
  return (
    <>
      <AutofillStyles />
      <textarea
        rows={rows}
        className={cn(
          getInputClasses(variant, { error }),
          "resize-none",
          className,
        )}
        {...props}
      />
    </>
  );
}

export function Select({
  variant = "default",
  error = false,
  className = "",
  children,
  ...props
}) {
  return (
    <>
      <AutofillStyles />
      <select
        className={cn(getInputClasses(variant, { error }), className)}
        {...props}
      >
        {children}
      </select>
    </>
  );
}
