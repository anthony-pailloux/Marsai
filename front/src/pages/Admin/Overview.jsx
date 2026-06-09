import { Link } from "react-router-dom";
import useOverviewData from "../../hooks/useOverviewData.js";
import { MetricCard, TopFilmRow } from "../../components/admin/OverviewParts.jsx";
import { publicUrl } from "../../utils/overviewUtils.js";
import {
  typeAdminSection,
  typeAdminTitle,
  typeBodySm,
} from "../../utils/typography.js";

export default function Overview() {
  const { loading, kpi, topFilms } = useOverviewData();

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex gap-7">
          <div className="min-w-0 flex-1">
            <div className="mt-10">
              <div className={typeAdminTitle}>VUE D'ENSEMBLE</div>
              <div
                className={`mt-2 max-w-2xl text-black/55 dark:text-white/55 ${typeBodySm}`}
              >
                Analyse détaillée de la progression du festival et des
                indicateurs de performance.
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                iconSrc={publicUrl("icons/admin/sparkles.svg")}
                iconBgClass="bg-[#EAF1FF] ring-black/10 dark:bg-white/5 dark:ring-white/10"
                pill="OBJECTIF : 600"
                pillClass="bg-[#EAF1FF] text-[#2F6BFF] dark:bg-white/5 dark:text-white/80"
                value={kpi.films}
                label="FILMS ÉVALUÉS PAR LE JURY"
                subLabel={`${kpi.completion}% COMPLÈTE`}
                progress={kpi.completion}
                progressClass="bg-[#2F6BFF]"
              />

              <MetricCard
                iconSrc={publicUrl("icons/admin/star.svg")}
                iconBgClass="bg-[#FFF3E0] ring-black/10 dark:bg-white/5 dark:ring-white/10"
                pill="QUOTA : 100/JURE"
                pillClass="bg-[#FFF3E0] text-[#FF8C42] dark:bg-white/5 dark:text-white/80"
                value={kpi.quota}
                label="JURÉS AYANT FINALISÉ LEUR LOT"
                subLabel={kpi.quotaState}
                progress={0}
                progressClass="bg-[#FF8C42]"
              />

              <MetricCard
                iconSrc={publicUrl("icons/admin/globe.svg")}
                iconBgClass="bg-[#EAF1FF] ring-black/10 dark:bg-white/5 dark:ring-white/10"
                value={kpi.countries}
                label="PAYS REPRÉSENTÉS"
                subLabel={kpi.zone}
              />

              <MetricCard
                iconSrc={publicUrl("icons/admin/ticket.svg")}
                iconBgClass="bg-[#E9FFF2] ring-black/10 dark:bg-white/5 dark:ring-white/10"
                value={`${kpi.occupancy}%`}
                label="TAUX D'OCCUPATION WORKSHOPS"
                cta={
                  <Link
                    to="/admin/events"
                    className="rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-semibold text-black/70 hover:bg-black/[0.03]
                               dark:border-white/15 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                  >
                    VOIR LES EVENEMENTS
                  </Link>
                }
              />
            </div>

            <div
              className="
                mt-6 overflow-hidden rounded-[22px] border border-black/10 bg-white
                shadow-[0_18px_60px_rgba(0,0,0,0.06)]
                dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl
                dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]
              "
            >
              <div className="px-6 pt-6">
                <div className={typeAdminSection}>Top Films (Communauté)</div>
              </div>

              <div className="mt-2 divide-y divide-black/10 px-6 dark:divide-white/10">
                {loading && (
                  <div className="py-8 text-sm text-black/55 dark:text-white/55">
                    Chargement…
                  </div>
                )}

                {!loading && topFilms.length === 0 && (
                  <div className="py-8 text-sm text-black/55 dark:text-white/55">
                    Aucun film trouvé.
                  </div>
                )}

                {!loading &&
                  topFilms.map((f, idx) => (
                    <TopFilmRow
                      key={f.id}
                      rank={idx + 1}
                      title={f.title}
                      likes={f.likes}
                      votes={f.votes}
                      coverUrl={f.coverUrl}
                    />
                  ))}
              </div>

              <div className="px-6 pb-6 pt-4">
                <Link
                  to="/admin/leaderboard"
                  className="block w-full rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-center text-sm font-semibold text-black/70 hover:bg-black/[0.05]
             dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                >
                  Voir tout le classement →
                </Link>
              </div>
            </div>
            <div className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
