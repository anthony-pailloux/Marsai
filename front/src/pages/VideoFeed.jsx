import { useParams } from "react-router-dom";
import FeedSlide from "../components/Videos/FeedSlide.jsx";
import useVideoFeed from "../hooks/useVideoFeed.js";
import { typeBadge } from "../utils/typography.js";

export default function VideoFeed() {
  const { id } = useParams();
  const startId = String(id || "");

  const { items, loading, containerRef, activeIndex, goBack } =
    useVideoFeed(startId);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] grid place-items-center bg-neutral-950 text-white">
        <div className="text-white/70">Chargement…</div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="fixed inset-0 z-[9999] grid place-items-center bg-neutral-950 text-white">
        <button type="button" onClick={goBack} className="text-white/70 underline">
          Retour à la galerie
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-neutral-950 text-white">
      <div className="absolute left-0 right-0 top-0 z-20 px-4 pt-4">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            className={`inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15 backdrop-blur hover:bg-white/15 ${typeBadge}`}
          >
            ← Retour galerie
          </button>

          <div className={`text-white/60 ${typeBadge}`}>
            {activeIndex + 1} / {items.length}
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll overscroll-y-contain snap-y snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        <style>{`div::-webkit-scrollbar{display:none;}`}</style>

        {items.map((v, i) => (
          <FeedSlide key={v.id} video={v} index={i} activeIndex={activeIndex} />
        ))}
      </div>
    </div>
  );
}
