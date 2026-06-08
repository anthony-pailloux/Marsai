export default function NewsletterAdminFilters({
  status,
  q,
  onStatusChange,
  onQueryChange,
  onSearch,
}) {
  return (
    <form
      onSubmit={onSearch}
      className="mt-8 flex flex-col gap-3 md:flex-row md:items-center"
    >
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="h-11 rounded-xl border border-black/10 bg-white px-3 text-sm dark:border-white/10 dark:bg-black"
      >
        <option value="all">Tous</option>
        <option value="active">Actifs</option>
        <option value="pending">Pending</option>
        <option value="unsubscribed">Désabonnés</option>
      </select>

      <input
        value={q}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Rechercher un email…"
        className="h-11 flex-1 rounded-xl border border-black/10 bg-white px-4 text-sm placeholder:text-black/40 dark:border-white/10 dark:bg-black dark:placeholder:text-white/40"
      />

      <button
        type="submit"
        className="h-11 rounded-xl bg-black px-5 text-sm font-bold text-white hover:opacity-90 dark:bg-white dark:text-black"
      >
        Rechercher
      </button>
    </form>
  );
}
