import BtnLogout from "../../components/Buttons/BtnLogout";
import AdminVideosTable from "../../components/admin/AdminVideosTable.jsx";
import useAdminVideos from "../../hooks/useAdminVideos.js";
import { VIDEO_STATUS_OPTIONS } from "../../utils/adminVideosUtils.js";
import { typeAdminMeta, typeAdminTitle } from "../../utils/typography.js";

export default function AdminVideos() {
  const {
    isSelector,
    loading,
    busyId,
    q,
    setQ,
    statusFilter,
    setStatusFilter,
    error,
    filtered,
    refresh,
    onChangeStatus,
    onToggleFeatured,
  } = useAdminVideos();

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-10">
        <div className="flex justify-between items-center">
          <div className="mt-8">
            <h2 className={typeAdminTitle}>FILMS SOUMIS</h2>
            <p className={`mt-1 text-black/50 dark:text-white/50 ${typeAdminMeta}`}>
              Gérez l&apos;intégralité des soumissions et gérez les mises en
              avant.
            </p>
          </div>
          {isSelector && <BtnLogout />}
        </div>

        <div
          className="mt-8 overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]
                     dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
        >
          <div className="overflow-x-auto">
            <div className="min-w-[1100px]">
              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#2F6BFF]/15 ring-1 ring-[#2F6BFF]/25">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 7h16M4 12h10M4 17h16"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>

                  <div className="text-sm font-semibold">Gestion films</div>

                  <button
                    onClick={refresh}
                    className="ml-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs text-black/70 hover:bg-black/10
                               dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/8"
                  >
                    Rafraîchir
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-[520px]">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Rechercher (titre, réal, pays, langue, email)…"
                      className="w-full rounded-full border border-black/10 bg-transparent px-5 py-3 text-sm text-black placeholder:text-black/40 outline-none
                                 focus:border-black/20
                                 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35 dark:focus:border-white/20"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/45 dark:text-white/45">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M21 21l-4.3-4.3m1.3-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <div className="shrink-0 rounded-full border border-black/10 bg-black/0 px-3 py-2 dark:border-white/10 dark:bg-white/5">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-transparent text-sm text-black/70 outline-none dark:text-white/80"
                    >
                      {VIDEO_STATUS_OPTIONS.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-white text-black dark:bg-black dark:text-white"
                        >
                          {s === "All" ? "Tous" : s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <AdminVideosTable
                loading={loading}
                error={error}
                filtered={filtered}
                busyId={busyId}
                onChangeStatus={onChangeStatus}
                onToggleFeatured={onToggleFeatured}
              />
            </div>
          </div>

          <div className="pointer-events-none h-14 bg-gradient-to-t from-black/5 to-transparent dark:from-black/55" />
        </div>
      </div>
    </div>
  );
}
