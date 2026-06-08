import { NewsletterStatCard } from "./newsletterAdminUi.jsx";

export default function NewsletterAdminStats({ stats }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
      <NewsletterStatCard label="Total" value={stats?.total ?? "—"} />
      <NewsletterStatCard label="Actifs" value={stats?.active ?? "—"} />
      <NewsletterStatCard label="Pending" value={stats?.pending ?? "—"} />
      <NewsletterStatCard label="Désabonnés" value={stats?.unsubscribed ?? "—"} />
    </div>
  );
}
