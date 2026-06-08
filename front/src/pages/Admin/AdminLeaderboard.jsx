import LeaderboardPanel from "../../components/admin/LeaderboardPanel.jsx";
import useAdminLeaderboard from "../../hooks/useAdminLeaderboard.js";
import { typeAdminTitle, typeBodySm } from "../../utils/typography.js";

export default function AdminLeaderboard() {
  const { loading, err, q, setQ, filtered, best, refresh } =
    useAdminLeaderboard();

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <main className="flex-1">
            <div className="mt-8">
              <div className={typeAdminTitle}>LEADERBOARD OFFICIEL</div>
              <div
                className={`mt-1 text-black/50 dark:text-white/50 ${typeBodySm}`}
              >
                Classement des votes du jury pour la finale de Marseille.
              </div>
            </div>

            <LeaderboardPanel
              loading={loading}
              err={err}
              q={q}
              onQueryChange={setQ}
              filtered={filtered}
              best={best}
              onRefresh={refresh}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
