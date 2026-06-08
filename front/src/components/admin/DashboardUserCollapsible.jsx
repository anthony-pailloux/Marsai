import { DASHBOARD_USER_CARD_CLASS } from "../../utils/dashboardUserUtils.js";

export default function DashboardUserCollapsible({
  icon,
  title,
  open,
  onToggle,
  children,
}) {
  return (
    <div className={`${DASHBOARD_USER_CARD_CLASS} mb-6`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E8F4FF] ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
            {icon}
          </span>
          <span className="text-sm font-semibold text-black/90 dark:text-white/90">
            {title}
          </span>
        </div>
        <span
          className={`inline-block text-xs text-black/60 transition-transform duration-300 ease-in-out dark:text-white/60 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▼
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-black/10 px-6 py-5 dark:border-white/10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
