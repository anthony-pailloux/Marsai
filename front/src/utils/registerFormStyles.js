/** Classes CSS selon le contexte (page login vs dashboard admin). */
export function getRegisterFormStyles(variant) {
  const isDashboard = variant === "dashboard";

  return {
    isDashboard,
    formClass: isDashboard
      ? "flex flex-col gap-3 w-full"
      : "bg-transparent border border-[#2a2a3a] rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-6",
    inputClass: isDashboard
      ? "w-full rounded-full border border-black/10 bg-black/5 px-3 py-2 text-sm text-black placeholder:text-black/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
      : "w-full bg-[#08080e] border border-[#2a2a3a] rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500",
    selectClass: isDashboard
      ? "min-w-[140px] rounded-full border border-black/10 bg-black/0 px-3 py-2 text-sm text-black/70 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white/80"
      : "w-full bg-[#08080e] border border-[#2a2a3a] rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500",
    labelClass: isDashboard
      ? "mb-1 block text-xs font-medium text-black/70 dark:text-white/70"
      : "text-xs uppercase tracking-wider text-gray-400",
    btnCancelClass: isDashboard
      ? "rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs font-semibold text-black/70 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
      : "flex-1 rounded-full border border-[#2a2a3a] py-3 text-sm uppercase tracking-wider hover:border-orange-500 transition-colors cursor-pointer",
    btnSubmitClass: isDashboard
      ? "rounded-full bg-[#2F6BFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2F6BFF]/90"
      : "flex-1 w-full bg-[#0d0d14] border border-[#2a2a3a] rounded-full py-3 text-white uppercase tracking-wider text-sm hover:border-orange-500 transition-colors cursor-pointer",
  };
}
