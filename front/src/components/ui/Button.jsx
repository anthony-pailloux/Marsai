import { cn } from "../../utils/cn.js";

const variantClasses = {
  primary:
    "bg-brand text-white hover:bg-brand-hover focus-visible:ring-brand/50",
  secondary:
    "bg-black/10 text-neutral-900 hover:bg-black/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 focus-visible:ring-brand/30",
  ghost:
    "bg-transparent text-neutral-700 hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/5 focus-visible:ring-brand/30",
  danger:
    "bg-danger/90 text-white hover:bg-danger focus-visible:ring-danger/50",
  accent:
    "bg-accent text-white hover:bg-accent/90 focus-visible:ring-accent/50",
};

const sizeClasses = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-6 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant] ?? variantClasses.primary,
        sizeClasses[size] ?? sizeClasses.md,
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="animate-pulse">Chargement…</span>
      ) : (
        children
      )}
    </button>
  );
}
