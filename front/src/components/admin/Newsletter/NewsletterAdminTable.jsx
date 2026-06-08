import { NewsletterStatusPill } from "./newsletterAdminUi.jsx";

export default function NewsletterAdminTable({ subscribers, loading }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
      <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
        <div className="text-sm font-semibold">Abonnés</div>
        <div className="text-xs opacity-60">
          {loading ? "Chargement…" : `${subscribers.length} résultat(s)`}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-black/[0.03] dark:bg-white/[0.06]">
            <tr className="text-left">
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Statut</th>
              <th className="px-5 py-3 font-semibold">Confirmé</th>
              <th className="px-5 py-3 font-semibold">Désinscrit</th>
            </tr>
          </thead>

          <tbody>
            {subscribers.map((s) => (
              <tr
                key={s.id}
                className="border-t border-black/10 dark:border-white/10"
              >
                <td className="px-5 py-4">{s.email}</td>
                <td className="px-5 py-4">
                  <NewsletterStatusPill
                    status={s.status}
                    unsubscribed_at={s.unsubscribed_at}
                  />
                </td>
                <td className="px-5 py-4">
                  {s.confirmed_at ? "Oui" : "Non"}
                </td>
                <td className="px-5 py-4">
                  {s.unsubscribed_at ? "Oui" : "Non"}
                </td>
              </tr>
            ))}

            {!loading && subscribers.length === 0 && (
              <tr>
                <td className="px-5 py-10 text-center opacity-60" colSpan={4}>
                  Aucun résultat
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
