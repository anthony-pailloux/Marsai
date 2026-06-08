import StatusPill from "./StatusPill";
import FeaturedToggle from "./FeaturedToggle";
import { getApiBaseUrl } from "../../utils/apiBase.js";
import {
  formatVideoDate,
  formatVideoDuration,
  VIDEO_STATUS_EDIT_OPTIONS,
} from "../../utils/adminVideosUtils.js";

export default function AdminVideosTable({
  loading,
  error,
  filtered,
  busyId,
  onChangeStatus,
  onToggleFeatured,
}) {
  return (
    <div className="border-t border-black/10 dark:border-white/10">
      <table className="w-full table-fixed">
        <colgroup>
          <col style={{ width: "31.11%" }} />
          <col style={{ width: "17.78%" }} />
          <col style={{ width: "10.00%" }} />
          <col style={{ width: "15.56%" }} />
          <col style={{ width: "10.00%" }} />
          <col style={{ width: "15.56%" }} />
        </colgroup>

        <thead>
          <tr className="text-xs font-semibold tracking-wider text-black/55 dark:text-white/55">
            <th className="pl-6 pr-4 py-3 text-left">FILM</th>
            <th className="pr-4 py-3 text-left">RÉALISATEUR</th>
            <th className="pr-4 py-3 text-left">DURÉE</th>
            <th className="pr-4 py-3 text-left">STATUT</th>
            <th className="pr-4 py-3 text-left">FEATURED</th>
            <th className="pr-6 py-3 text-right">DATE</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr className="border-t border-black/10 dark:border-white/10">
              <td
                colSpan={6}
                className="px-6 py-6 text-sm text-black/60 dark:text-white/60"
              >
                Chargement…
              </td>
            </tr>
          )}

          {!loading && error && (
            <tr className="border-t border-black/10 dark:border-white/10">
              <td
                colSpan={6}
                className="px-6 py-6 text-sm text-red-600 dark:text-red-300"
              >
                {error}
              </td>
            </tr>
          )}

          {!loading && !error && filtered.length === 0 && (
            <tr className="border-t border-black/10 dark:border-white/10">
              <td
                colSpan={6}
                className="px-6 py-8 text-sm text-black/50 dark:text-white/50"
              >
                Aucun film trouvé.
              </td>
            </tr>
          )}

          {!loading &&
            !error &&
            filtered.map((v) => (
              <tr
                key={v.id}
                className="border-t border-black/10 dark:border-white/10"
              >
                <td className="pl-6 pr-4 py-4 align-middle">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-16 overflow-hidden rounded-xl bg-black/5 ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/10">
                      <img
                        src={
                          v.cover
                            ? `${getApiBaseUrl()}/uploads/covers/${v.cover}`
                            : ""
                        }
                        alt={v.title || ""}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
                        {v.title || "Sans titre"}
                      </div>
                      <div className="mt-0.5 text-xs text-black/45 dark:text-white/45">
                        {(v.language || "—") + " • " + (v.country || "—")}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="pr-4 py-4 align-middle text-sm text-black/75 dark:text-white/75">
                  {[v.director_name, v.director_lastname]
                    .filter(Boolean)
                    .join(" ") || "—"}
                </td>

                <td className="pr-4 py-4 align-middle text-sm text-black/60 dark:text-white/60 whitespace-nowrap">
                  {formatVideoDuration(v.duration)}
                </td>

                <td className="pr-4 py-4 align-middle">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="shrink-0">
                      <StatusPill status={v.upload_status} />
                    </div>

                    <select
                      value={v.upload_status || "Pending"}
                      disabled={busyId === v.id}
                      onChange={(e) => onChangeStatus(v.id, e.target.value)}
                      className="min-w-[140px] shrink-0 rounded-full border border-black/10 bg-black/5 px-3 py-2 text-xs text-black/80 outline-none disabled:opacity-50
                                 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                      title="Changer le statut"
                    >
                      {VIDEO_STATUS_EDIT_OPTIONS.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-white text-black dark:bg-black dark:text-white"
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>

                <td className="pr-4 py-4 align-middle">
                  <FeaturedToggle
                    value={Number(v.featured) === 1}
                    disabled={busyId === v.id}
                    onChange={(next) => onToggleFeatured(v.id, next)}
                  />
                </td>

                <td className="pr-6 py-4 align-middle text-right text-sm text-black/55 dark:text-white/55 whitespace-nowrap">
                  {formatVideoDate(v.created_at)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
