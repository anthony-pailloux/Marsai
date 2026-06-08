import { useEffect, useState } from "react";
import { typeCta, typeEyebrow, typeSectionBody, typeSectionCaption, typeSectionTitle, typeSectionSubtitle } from '../../utils/typography.js';
import { Link } from "react-router";
import { fetchPublicAwards } from "../../services/Awards/AwardsApi";
import { fetchVideos } from "../../services/Videos/VideosListApi";
import { useTranslation } from "react-i18next";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
import useCmsContent from "../../hooks/useCmsContent";
import { toMediaUrl } from "../../utils/mediaUrl";
import { getApiBaseUrl } from "../../utils/apiBase.js";

import arrowSrc from "../../assets/imgs/icones/arrowRightWhite.svg";

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
        <section className="flex flex-col items-center justify-center gap-6.25 md:gap-10 p-6.25 md:px-25 self-stretch">

          <div className="flex flex-col md:flex-row justify-between items-end self-stretch shrink-0 gap-5 p-5">
            <div>
              {isVisible(content, page, section, "eyebrow") && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px shrink-0 bg-[#2B7FFF]" />
                  <p className={`text-[#2B7FFF] ${typeEyebrow}`}>
                    {content?.[page]?.[section]?.eyebrow}
                  </p>
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
                <p className={`${typeSectionBody} text-left text-black dark:text-white`}>
                  {content?.[page]?.[section]?.description}
                </p>
              )}
            </div>

            {isVisible(content, page, section, "ctaSeeMore") && (
              <Link
                to={content?.[page]?.[section]?.ctaSeeMore_link || "/gallery"}
                className="flex justify-center items-center bg-[rgba(255,200,87,0.52)] rounded-[20px] px-5 gap-2.5"
              >
                <span className={`flex text-center text-white ${typeCta}`}>
                  {content?.[page]?.[section]?.ctaSeeMore}
                </span>
                <div className="flex justify-center items-center w-5 h-5">
                  <img src={arrowSrc} alt="" className="" />
                </div>
              </Link>
            )}
          </div>

          <div className="grid w-full grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-8">

            {loading && (
              <div>
                <span className="loading loading-spinner loading-md"></span>
                <p>{t("award.loading")}</p>
              </div>
            )}

            {!loading && errorMsg && (
              <div className="col-span-3 alert alert-error">
                <span>{t("award.error")} {errorMsg}</span>
              </div>
            )}

            {!loading && !errorMsg && videos.length === 0 && (
              <div className="col-span-3 alert">
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
                  <div
                    key={video.id}
                    className="w-full overflow-hidden rounded-[40px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-white/5"
                  >
                    <Link
                      to={`/gallery/${video.id}`}
                      aria-label={t("award.ariaViewFilm", { title })}
                    >
                      <div className="w-full aspect-video overflow-hidden rounded-t-[40px]">
                        <img src={coverUrl} alt={title} loading="lazy" className="h-full w-full object-cover"/>
                      </div>
                    </Link>

                    <div className="flex flex-col items-start gap-2 p-6 md:p-8 self-stretch">
                      <h3 className={`${typeSectionSubtitle} text-left text-black dark:text-white`}>
                        {title}
                      </h3>
                      <p className={`text-black dark:text-white/80 ${typeSectionCaption}`}>
                        {director}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}
    </>
  );
}

export default SectionAward;
