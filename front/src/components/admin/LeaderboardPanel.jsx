import {
  typeAdminStat,
  typeBadge,
  typeCaption,
} from "../../utils/typography.js";
import {
  buildLeaderboardCoverUrl,
  parseAiTechTools,
} from "../../utils/leaderboardUtils.js";

export default function LeaderboardPanel({
  loading,
  q,
  onQueryChange,
  filtered,
  best,
  onRefresh,
}) {
  return (
    <div
      className="mt-8 overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]
                 dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
    >
      <div className="flex items-center justify-between gap-6 px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FFF3E0] ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
            <span className="text-lg">🏆</span>
          </div>

          <div>
            <div className={`leading-none ${typeAdminStat}`}>
              {best?.score != null ? Number(best.score).toFixed(1) : "—"}
              <span className="text-sm font-semibold text-black/50 dark:text-white/50">
                /10
              </span>
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-black/45 dark:text-white/45">
              Meilleure note
            </div>
            {best?.reviews_count != null && (
              <div className={`mt-1 text-black/45 dark:text-white/45 ${typeCaption}`}>
                {Number(best.reviews_count)} vote
                {Number(best.reviews_count) > 1 ? "s" : ""}
              </div>
            )}
          </div>

          <div className="ml-6 hidden md:block">
            <div
              className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs font-semibold text-black/70
                            dark:border-white/10 dark:bg-white/5 dark:text-white/70"
            >
              {best?.title || best?.title_en || "—"}
            </div>
            <div className="mt-1 text-xs text-black/45 dark:text-white/45">
              {best
                ? `Par ${(best.director_name || "") + " " + (best.director_lastname || "")}`.trim()
                : ""}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs text-black/70 hover:bg-black/10
                     dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10"
        >
          Rafraîchir
        </button>
      </div>

      <div className="px-6 pb-6">
        <input
          value={q}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Rechercher un film ou un réalisateur..."
          className="w-full rounded-xl border border-black/10 bg-black/5 px-5 py-3 text-sm text-black/70 outline-none
                     dark:border-white/10 dark:bg-white/5 dark:text-white/70"
        />
      </div>

      <div
        className="grid grid-cols-[0.4fr_1.4fr_0.7fr_0.6fr_0.7fr] gap-4 border-t border-black/10 px-6 py-3 text-xs font-semibold tracking-wider text-black/55
                   dark:border-white/10 dark:text-white/55"
      >
        <div>RANG</div>
        <div>FILM & AUTEUR</div>
        <div>PAYS</div>
        <div>MOYENNE</div>
        <div className="text-right">OUTILS IA</div>
      </div>

      <div className="divide-y divide-black/10 dark:divide-white/10">
        {loading && (
          <div className="px-6 py-8 text-sm text-black/60 dark:text-white/60">
            Chargement…
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="px-6 py-10 text-sm text-black/50 dark:text-white/50">
            Aucun résultat.
          </div>
        )}

        {!loading &&
          filtered.map((v, idx) => {
            const title = v.title || v.title_en || "Sans titre";
            const author =
              `${v.director_name || ""} ${v.director_lastname || ""}`.trim() ||
              "—";
            const country = v.country || v.director_country || "—";
            const coverUrl = buildLeaderboardCoverUrl(v.cover);

            return (
              <div
                key={v.video_id || v.id || idx}
                className="grid grid-cols-[0.4fr_1.4fr_0.7fr_0.6fr_0.7fr] gap-4 px-6 py-5"
              >
                <div className="self-center text-sm text-black/55 dark:text-white/55">
                  {idx + 1}
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-16 overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/10">
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
                      {title}
                    </div>
                    <div className="mt-1 text-xs text-black/45 dark:text-white/45">
                      {author}
                    </div>
                  </div>
                </div>

                <div className="self-center text-sm text-black/70 dark:text-white/70">
                  {country}
                </div>

                <div className="self-center">
                  <div className="text-sm font-semibold text-black/80 dark:text-white/80">
                    {v.score != null ? Number(v.score).toFixed(1) : "—"}
                    <span className="text-xs font-semibold text-black/45 dark:text-white/45">
                      /10
                    </span>
                  </div>
                  {v.reviews_count != null && (
                    <div className={`mt-1 text-black/45 dark:text-white/45 ${typeCaption}`}>
                      {Number(v.reviews_count)} vote
                      {Number(v.reviews_count) > 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                <div className="self-center text-right">
                  <div className="inline-flex flex-col gap-2">
                    {parseAiTechTools(v.ai_tech).map((tool) => (
                      <span
                        key={tool}
                        className={`inline-flex justify-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70 ${typeBadge}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="pointer-events-none h-14 bg-gradient-to-t from-black/5 to-transparent dark:from-black/55" />
    </div>
  );
}
