import { cn } from "../../utils/cn.js";

export default function Field({
  label,
  htmlFor,
  required = false,
  helper,
  error,
  className = "",
  children,
}) {
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
        >
          {label}
          {required ? <span className="text-brand"> *</span> : null}
        </label>
      ) : null}

      {children}

      {helper && !error ? (
        <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
          {helper}
        </p>
      ) : null}

      {error ? (
        <p className="mt-1.5 text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
