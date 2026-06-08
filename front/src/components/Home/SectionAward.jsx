import { useEffect, useState } from "react";
import { typeCardTitle, typeEyebrow, typeSectionBody, typeSectionCaption, typeSectionTitle } from '../../utils/typography.js';
import { Link } from "react-router";
import { fetchPublicAwards } from "../../services/Awards/AwardsApi";
import { fetchVideos } from "../../services/Videos/VideosListApi";
import { useTranslation } from "react-i18next";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
import useCmsContent from "../../hooks/useCmsContent";
import { resolveCmsAssetWithFallback } from "../../utils/cmsAssets.js";
import { toMediaUrl } from "../../utils/mediaUrl";
import { getApiBaseUrl } from "../../utils/apiBase.js";
import { HOME_CARD, HOME_EYEBROW, HOME_EYEBROW_ICON, HOME_PILL_LINK } from "./homeCardStyles.js";



function SectionAward() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const { t, i18n } = useTranslation("home");
  const isFr = i18n.language?.startsWith("fr");

  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

  const page = "home";
  const section = "award";

  const { content, loading: cmsLoading } = useCmsContent(page, locale);

  const eyebrowIconSrc = resolveCmsAssetWithFallback(
    content?.[page]?.[section]?.eyebrow_icon,
    t("award.eyebrow_icon", { defaultValue: "/icons/home/IconStars.svg" })
  );

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setErrorMsg("");

      try {
        let showcase = [];

        try {
          const awards = await fetchPublicAwards({ signal: controller.signal });
          for (const award of awards) {
            for (const video of award.videos || []) {
              showcase.push({ ...video, award_title: award.title, award_img: award.img });
              if (showcase.length >= 3) break;
            }
            if (showcase.length >= 3) break;
          }
        } catch (err) {
          if (controller.signal.aborted) return;
          console.warn("Awards indisponibles, fallback videos:", err?.message);
        }

        if (showcase.length === 0) {
          const data = await fetchVideos({ signal: controller.signal });
          const list = Array.isArray(data) ? data : (data?.videos ?? []);
          showcase = list.slice(0, 3);
        }

        if (!controller.signal.aborted) setVideos(showcase);
      } catch (err) {
        if (controller.signal.aborted) return;
        setErrorMsg(err?.message || "Erreur inconnue");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  if (cmsLoading) return null;

  return (
    <>
      {isSectionVisible(content, page, section) && (
        <section className="flex flex-col items-center gap-6 md:gap-8 px-5 md:px-18.75 py-6 md:py-8 self-stretch w-full max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end self-stretch gap-4 md:gap-5">
            <div className="max-w-xl">
              {isVisible(content, page, section, "eyebrow") && (
                <div className={`${HOME_EYEBROW} mb-3 ${typeEyebrow} text-black dark:text-white`}>
                  {eyebrowIconSrc ? (
                    <img src={eyebrowIconSrc} alt="" className={HOME_EYEBROW_ICON} />
                  ) : null}
                  <span>{content?.[page]?.[section]?.eyebrow}</span>
                </div>
              )}
              <h2 className={`${typeSectionTitle} text-black dark:text-white`}>
                {isVisible(content, page, section, "title1") && (
                  <span className="block">
                    {content?.[page]?.[section]?.title1}
                  </span>
                )}
                {isVisible(content, page, section, "title2") && (
                  <span className="block bg-linear-to-b from-black to-[rgba(144,144,144,0.2)] bg-clip-text text-transparent dark:from-white dark:to-white/20">
                    {content?.[page]?.[section]?.title2}
                  </span>
                )}
              </h2>
              {isVisible(content, page, section, "description") && (
                <p className={`mt-3 ${typeSectionBody} text-left text-black dark:text-white`}>
                  {content?.[page]?.[section]?.description}
                </p>
              )}
            </div>

            {isVisible(content, page, section, "ctaSeeMore") && (
              <Link
                to={content?.[page]?.[section]?.ctaSeeMore_link || "/gallery"}
                className={`${HOME_PILL_LINK} ${typeEyebrow} text-black dark:text-white`}
              >
                <span>{content?.[page]?.[section]?.ctaSeeMore}</span>
                <img src="/icons/home/arrowRight.svg" alt="" className={HOME_EYEBROW_ICON} />
              </Link>
            )}
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">

            {loading && (
              <div className="col-span-full">
                <span className="loading loading-spinner loading-md"></span>
                <p>{t("award.loading")}</p>
              </div>
            )}

            {!loading && errorMsg && (
              <div className="col-span-full alert alert-error">
                <span>{t("award.error")} {errorMsg}</span>
              </div>
            )}

            {!loading && !errorMsg && videos.length === 0 && (
              <div className="col-span-full alert">
                <span>{t("award.notFound")}</span>
              </div>
            )}

            {!loading &&
              !errorMsg &&
              videos.map((video) => {
                const title = isFr ? (video?.title || video?.title_en || "Sans titre") : (video?.title_en || video?.title || "Untitled");

                const director =
                  `${video?.director_name || ""} ${video?.director_lastname || ""}`.trim() ||
                  "Unknown director";

                const coverUrl = video?.cover
                  ? toMediaUrl(video.cover, "covers", getApiBaseUrl())
                  : "";

                return (
                  <article
                    key={video.id}
                    className={`${HOME_CARD} overflow-hidden`}
                  >
                    <Link
                      to={`/gallery/${video.id}`}
                      aria-label={t("award.ariaViewFilm", { title })}
                      className="group block"
                    >
                      <div className="h-[130px] w-full overflow-hidden sm:h-[135px] md:h-[140px]">
                        <img
                          src={coverUrl}
                          alt={title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    </Link>

                    <div className="flex flex-col items-start gap-1 p-4 md:p-5">
                      <h3 className={`line-clamp-2 ${typeCardTitle} text-left text-black dark:text-white`}>
                        {title}
                      </h3>
                      <p className={`text-black/70 dark:text-white/70 ${typeSectionCaption}`}>
                        {director}
                      </p>
                    </div>
                  </article>
                );
              })}
          </div>
        </section>
      )}
    </>
  );
}

export default SectionAward;
