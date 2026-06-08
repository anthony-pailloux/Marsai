import {
  typeAdminStat,
  typeBadge,
  typeEyebrow,
} from "../../utils/typography.js";
import { ICON_FALLBACK, publicUrl } from "../../utils/overviewUtils.js";

export function MetricCard({
  iconSrc,
  iconBgClass,
  pill,
  pillClass = "",
  value,
  label,
  subLabel,
  progress,
  progressClass = "bg-[#2F6BFF]",
  cta,
}) {
  return (
    <div
      className="
        rounded-[22px] border border-black/10 bg-white p-5
        shadow-[0_18px_60px_rgba(0,0,0,0.06)]
        dark:border-white/10 dark:bg-[#0B0F1A]/70 dark:backdrop-blur-xl
        dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={[
              "grid h-10 w-10 place-items-center rounded-2xl ring-1",
              iconBgClass ||
                "bg-black/[0.03] ring-black/10 dark:bg-white/5 dark:ring-white/10",
            ].join(" ")}
          >
            <img
              src={iconSrc}
              alt=""
              className="h-6 w-6 object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = ICON_FALLBACK;
              }}
            />
          </div>

          {pill ? (
            <span
              className={[
                "inline-flex items-center rounded-full px-3 py-1",
                typeBadge,
                pillClass,
              ].join(" ")}
            >
              {pill}
            </span>
          ) : null}
        </div>

        {cta ? <div>{cta}</div> : null}
      </div>

      <div className={`mt-5 text-black/90 dark:text-white/90 ${typeAdminStat}`}>
        {value}
      </div>

      <div className={`mt-1 text-black/45 dark:text-white/45 ${typeEyebrow}`}>
        {label}
      </div>

      {subLabel ? (
        <div className={`mt-3 text-black/45 dark:text-white/45 ${typeBadge}`}>
          {subLabel}
        </div>
      ) : null}

      {typeof progress === "number" ? (
        <div className="mt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            <div
              className={`h-full rounded-full ${progressClass}`}
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function TopFilmRow({ rank, title, likes, votes, coverUrl }) {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <div className="flex items-center gap-4">
        <div className="w-10 text-sm font-semibold text-black/45 dark:text-white/45">
          #{rank}
        </div>

        <div className="h-11 w-11 overflow-hidden rounded-xl bg-black/10 dark:bg-white/10">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = publicUrl("cover-fallback.jpg");
              }}
            />
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-black/90 dark:text-white/90">
            {title}
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-black/45 dark:text-white/45">
            <span>👍 {likes}</span>
            <span>🗳️ {votes}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="
          grid h-10 w-10 place-items-center rounded-full border border-black/15 bg-white
          hover:bg-black/[0.03]
          dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10
        "
        aria-label="Play"
      >
        ▶
      </button>
    </div>
  );
}
