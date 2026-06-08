import VideoCard from "../Videos/VideoCard.jsx";
import { getApiBaseUrl } from "../../utils/apiBase.js";

export default function GalleryGridSection({
  loading,
  err,
  pageItems,
  page,
  totalPages,
  total,
  t,
  onPageChange,
}) {
  if (loading) {
    return (
      <div className="py-16 text-center text-neutral-500 dark:text-white/60">
        {t("states.loading")}
      </div>
    );
  }

  if (err) {
    return (
      <div className="py-16 text-center text-red-600 dark:text-red-400">
        {err}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 justify-items-center gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((v) => (
          <VideoCard key={v.id} video={v} apiBase={getApiBaseUrl()} />
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            aria-label={t("pagination.previous")}
            className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 disabled:opacity-40 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5"
          >
            ‹
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const activeP = p === page;

              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={
                    activeP
                      ? "h-9 w-9 rounded-lg bg-[#D97706] text-sm font-semibold text-white"
                      : "h-9 w-9 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:text-white/70 dark:hover:bg-white/5"
                  }
                >
                  {p}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            aria-label={t("pagination.next")}
            className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 disabled:opacity-40 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5"
          >
            ›
          </button>
        </div>

        <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-white/45">
          {t("pagination.summary", { page, totalPages, total })}
        </div>
      </div>
    </>
  );
}
