import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toMediaUrl } from "../../utils/mediaUrl";
import { typeBadge, typeBodySm, typeCardTitle, typeEyebrow } from "../../utils/typography.js";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 639px)").matches; // < sm
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = (e) => setIsMobile(e.matches);

    // Safari < 14 fallback
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return isMobile;
}

export default function VideoCard({ video, apiBase }) {
  const { t } = useTranslation("gallery");
  const isMobile = useIsMobile();

  const title =
    video.title ||
    video.title_en ||
    t("card.fallbacks.title", "NEURAL ODYSSEY");

  const director =
    `${video.director_name || ""} ${video.director_lastname || ""}`.trim() ||
    t("card.fallbacks.director", "Director");

  const country =
    video.country ||
    video.director_country ||
    t("card.fallbacks.country", "Country");

  // ✅ S3 + fallback local automatique
  const coverUrl = video.cover
    ? toMediaUrl(video.cover, "covers", apiBase)
    : "/cover-fallback.jpg";

  // ✅ mobile => feed, desktop => details
  const to = isMobile ? `/gallery/feed/${video.id}` : `/gallery/${video.id}`;

  return (
    <article className="w-full">
      <div className="relative overflow-hidden rounded-2xl group">
        <Link
          to={to}
          className="relative z-10 block"
          aria-label={t("card.aria.viewFilm", { title })}
        >
          <img
            src={coverUrl}
            alt={title}
            className="
              h-[120px] w-full cursor-pointer object-cover sm:h-[130px]
              transition-transform duration-500 group-hover:scale-105
            "
            loading="lazy"
          />

          {/* petit overlay play (optionnel) */}
          <span
            className="
              pointer-events-none absolute inset-0 grid place-items-center
              opacity-0 group-hover:opacity-100 transition
            "
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-black/60 backdrop-blur text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 7l10 5-10 5V7z" fill="currentColor" />
              </svg>
            </span>
          </span>
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className={`text-neutral-900 dark:text-white ${typeCardTitle}`}>
          {title}
        </h3>

        <div className={`grid grid-cols-2 gap-x-10 text-neutral-500 dark:text-white/50 ${typeEyebrow}`}>
          <div>
            <div className="font-semibold leading-none">
              {t("card.labels.director")}
            </div>
            <div className={`mt-3 normal-case text-neutral-800 dark:text-white/80 leading-none ${typeBadge}`}>
              {director}
            </div>
          </div>

          <div className="ml-auto text-right">
            <div className="font-semibold leading-none">
              {t("card.labels.origin")}
            </div>

            <div className="flex items-center justify-end">
              <span className="grid h-13 w-13 place-items-center">
                <img
                  src="/icons/videoDetails/globe.png"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain scale-110 -translate-y-[10px]"
                  draggable="false"
                />
              </span>

              <span className={`normal-case text-neutral-800 dark:text-white/80 leading-none ${typeBadge}`}>
                {country}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
