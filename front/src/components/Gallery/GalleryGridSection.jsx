import VideoCard from "../Videos/VideoCard.jsx";
import { getApiBaseUrl } from "../../utils/apiBase.js";

export default function GalleryGridSection({
  loading,
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

  if (pageItems.length === 0) {
    return (
      <div className="py-16 text-center text-neutral-500 dark:text-white/60">
        {t("states.empty", { defaultValue: "Aucun film trouvé." })}
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
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="rounded-full border border-black/10 px-4 py-2 text-sm disabled:opacity-40 dark:border-white/10"
          >
            {t("pagination.prev")}
          </button>

          <span className="text-sm text-black/60 dark:text-white/60">
            {t("pagination.page", { page, total: totalPages })}
          </span>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="rounded-full border border-black/10 px-4 py-2 text-sm disabled:opacity-40 dark:border-white/10"
          >
            {t("pagination.next")}
          </button>
        </div>

        <div className="text-xs text-black/45 dark:text-white/45">
          {t("pagination.total", { count: total })}
        </div>
      </div>
    </>
  );
}
