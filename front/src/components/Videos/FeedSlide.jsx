import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getApiUrl, getApiBaseUrl } from "../../utils/apiBase.js";
import { typeBadge, typeBodySm, typeCardTitle, typeEyebrow } from "../../utils/typography.js";

const PLACEHOLDER_COVER = "/cover-fallback.jpg";

export default function FeedSlide({ video, index, activeIndex }) {
  const videoRef = useRef(null);

  const coverUrl =
    video?.cover && String(video.cover).trim()
      ? `${getApiBaseUrl()}/uploads/covers/${video.cover}`
      : PLACEHOLDER_COVER;

  const streamUrl = `${getApiUrl()}/videos/${video.id}/stream`;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const isActive = index === activeIndex;

    if (isActive) {
      el.muted = true;
      const p = el.play();
      if (p?.catch) p.catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [index, activeIndex]);

  const title = video.title || video.title_en || "Sans titre";
  const director =
    `${video.director_name || ""} ${video.director_lastname || ""}`.trim();

  return (
    <section
      data-snap-item
      data-index={index}
      className="relative h-screen w-full snap-start bg-black"
    >
      <video
        ref={videoRef}
        src={streamUrl}
        poster={coverUrl}
        className="absolute inset-0 h-full w-full object-contain"
        playsInline
        controls
        preload="metadata"
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
          <div className="max-w-[70%]">
            <div className={`text-white/60 ${typeEyebrow}`}>
              MarsAI • Court métrage
            </div>
            <h2 className={`mt-2 line-clamp-2 text-white ${typeCardTitle}`}>
              {title}
            </h2>
            <div className={`mt-2 text-white/75 ${typeBodySm}`}>{director}</div>
          </div>

          <Link
            to={`/gallery/${video.id}`}
            className={`pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-white ring-1 ring-white/15 backdrop-blur hover:bg-white/15 ${typeBadge}`}
          >
            Détails
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
