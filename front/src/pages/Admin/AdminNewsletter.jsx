import { typeAdminTitle } from "../../utils/typography.js";
import useAdminNewsletter from "../../hooks/useAdminNewsletter.js";
import NewsletterAdminStats from "../../components/admin/Newsletter/NewsletterAdminStats.jsx";
import NewsletterAdminFilters from "../../components/admin/Newsletter/NewsletterAdminFilters.jsx";
import NewsletterAdminTable from "../../components/admin/Newsletter/NewsletterAdminTable.jsx";

export default function AdminNewsletter() {
  const {
    subscribers,
    stats,
    status,
    q,
    setQ,
    loading,
    page,
    setPage,
    pageLimit,
    onSearch,
    onStatusChange,
  } = useAdminNewsletter();

  return (
    <div>
      <div className="mx-auto w-full px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <main className="min-w-0 flex-1">
            <div className="mt-10 w-full">
              <h1 className={`w-full tracking-tight ${typeAdminTitle}`}>
                NEWSLETTER
              </h1>
              <p className="mt-2 text-sm opacity-70">
                Gestion des abonnés et statistiques (double opt-in).
              </p>
            </div>

            <NewsletterAdminStats stats={stats} />

            <NewsletterAdminFilters
              status={status}
              q={q}
              onStatusChange={onStatusChange}
              onQueryChange={setQ}
              onSearch={onSearch}
            />

            <NewsletterAdminTable subscribers={subscribers} loading={loading} />

            <div className="mt-6 flex items-center justify-between">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold disabled:opacity-40 dark:border-white/10"
              >
                ← Précédent
              </button>

              <div className="text-xs opacity-60">Page {page + 1}</div>

              <button
                disabled={subscribers.length < pageLimit}
                onClick={() => setPage((p) => p + 1)}
                className="h-11 rounded-xl border border-black/10 px-4 text-sm font-semibold disabled:opacity-40 dark:border-white/10"
              >
                Suivant →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
