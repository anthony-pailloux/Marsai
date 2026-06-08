import { typeBadge } from "./typography.js";

export const DASHBOARD_USER_CARD_CLASS =
  "overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]";

export function getRoleBadgeClass(role) {
  const base = `inline-flex min-w-[120px] justify-center rounded-full px-4 py-2 ring-1 ${typeBadge}`;
  if (role === "superadmin") {
    return `${base} bg-[#FF8C42]/15 text-[#FF8C42] ring-[#FF8C42]/25`;
  }
  if (role === "admin") {
    return `${base} bg-[#2F6BFF]/15 text-[#2F6BFF] ring-[#2F6BFF]/25`;
  }
  return `${base} bg-[#FFD24A]/15 text-[#FFD24A] ring-[#FFD24A]/25`;
}
