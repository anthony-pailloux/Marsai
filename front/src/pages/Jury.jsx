import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useCmsContent from "../hooks/useCmsContent";
import { isSectionVisible, isVisible } from "../utils/isVisible";

import { getApiUrl, getApiBaseUrl } from "../utils/apiBase.js";
import {
  typeBodySm,
  typeCardTitle,
  typeEyebrow,
  typePageHero,
  typePageHeroDesc,
  typeSectionSubtitle,
} from "../utils/typography.js";
import { HOME_CARD } from "../components/Home/homeCardStyles.js";

function resolveImg(src) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  if (src.startsWith("/imgs/")) return src;
  if (src.startsWith("/uploads/")) return `${getApiBaseUrl()}${src}`;
  return `${getApiBaseUrl()}/uploads/jury/${src}`;
}

export default function Jury() {
  const { t, i18n } = useTranslation("jury");
  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

  const page = "jury";
  const hero = "hero";

  const { content } = useCmsContent(page, locale);

  const [jury, setJury] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function loadJury() {
    try {
      setLoading(true);
      setErr("");

      const res = await fetch(`${getApiUrl()}/jury`, {
        headers: { Accept: "application/json" },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // Si l'API renvoie une erreur lisible, on la garde, sinon fallback i18n
        throw new Error(data?.error || t("errorLoading"));
      }

      const list = Array.isArray(data?.jury) ? data.jury : [];
      setJury(list);
    } catch (e) {
      setErr(e?.message || t("errorLoading"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJury();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const president = useMemo(
    () => jury.find((j) => Number(j.is_president) === 1) || null,
    [jury],
  );

  const members = useMemo(() => {
    return jury
      .filter((j) => Number(j.is_president) !== 1)
      .slice()
      .sort(
        (a, b) => Number(a.sort_order ?? 999) - Number(b.sort_order ?? 999),
      );
  }, [jury]);

  if (loading) return null;

  return (
    <div className="pt-25">
      {/* ================= TOP SECTION ================= */}
      
      <div className="mx-auto w-full max-w-6xl px-6">

        {/* Section Hero */}
        {isSectionVisible(content, page, hero) && (
          <section className="flex flex-col gap-10">
            <h1 className={typePageHero}>
              {isVisible(content, page, hero, "title_main") && (
                <span className="block text-black dark:text-white">
                  {content?.[page]?.[hero]?.title_main || t("titleLine1")}
                </span>
              )}
              {isVisible(content, page, hero, "title_accent") && (
                <span className="block text-brand">
                  {content?.[page]?.[hero]?.title_accent || t("titleLine2")}
                </span>
              )}
            </h1>

            {isVisible(content, page, hero, "description") && (
              <p className={typePageHeroDesc}>
                {content?.[page]?.[hero]?.description}
              </p>
            )}
          </section>
        )}

        {loading ? (
          <div className="py-16 text-center text-black/50 dark:text-white/55">
            {t("loading")}
          </div>
        ) : err ? (
          <div className="py-16 text-center text-red-600 dark:text-red-300">
            {err}
          </div>
        ) : !president ? (
          <div className="py-16 text-center text-black/50 dark:text-white/55">
            {t("noPresidentDefined")}
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* President image */}
            <div className="flex justify-center md:justify-start">
              <div className={`relative w-full max-w-105 overflow-hidden ${HOME_CARD} shadow-xl`}>
                <img
                  src={resolveImg(president.img)}
                  alt={`${president.first_name || ""} ${president.name || ""}`.trim()}
                  className="h-120 w-full object-cover grayscale"
                  draggable={false}
                />

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className={`text-brand ${typeEyebrow}`}>
                    {president.role_label || t("president.defaultRole")}
                  </div>
                  <div className={`mt-3 text-white ${typeCardTitle}`}>
                    {(president.first_name || "").toUpperCase()}{" "}
                    {(president.name || "").toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* President text */}
            <div>
              <h2 className={typeSectionSubtitle}>
                {t("president.sectionTitle")}{" "}
                <span className="text-brand">
                  {t("president.sectionTitleAccent")}
                </span>
              </h2>

              <div
                className="mt-8 max-w-130 rounded-[28px] p-7 text-white
                              bg-linear-to-br from-orange-600 via-blue-900 to-black shadow-xl"
              >
                <div className={`text-white/70 ${typeEyebrow}`}>
                  {president.profession || t("president.professionFallback")}
                </div>

                <p className={`mt-4 text-white/80 ${typeBodySm}`}>
                  {president.bio || t("president.bioFallback")}
                </p>

                {president.filmography_url && (
                  <a
                    href={president.filmography_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex rounded-full
                               bg-linear-to-r from-orange-500 to-orange-500
                               px-6 py-3 text-xs font-bold text-white"
                  >
                    {t("president.filmographyCta")}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= MEMBERS GRID ================= */}
      <div className="mt-20 bg-linear-to-b from-[#FFF3E0] to-white py-16 dark:from-white/5 dark:to-black">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <h2 className={typeSectionSubtitle}>
              {t("members.title")}
            </h2>

            <p className={`max-w-130 text-black/70 dark:text-white/70 ${typeBodySm}`}>
              {t("members.description")}
            </p>
          </div>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <a
                key={m.id}
                href={m.filmography_url || "#"}
                target={m.filmography_url ? "_blank" : undefined}
                rel={m.filmography_url ? "noreferrer" : undefined}
                className={`group relative overflow-hidden ${HOME_CARD} bg-black shadow-xl`}
              >
                <img
                  src={resolveImg(m.img)}
                  alt={`${m.first_name || ""} ${m.name || ""}`.trim()}
                  className="h-105 w-full object-cover"
                  draggable={false}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-0 w-full p-7">
                  <div className={`text-brand ${typeEyebrow}`}>
                    {m.role_label || ""}
                  </div>

                  <div className={`mt-3 text-white ${typeCardTitle}`}>
                    {(m.first_name || "").toUpperCase()}{" "}
                    {(m.name || "").toUpperCase()}
                  </div>

                  <div className={`mt-2 text-white/70 ${typeBodySm}`}>
                    {m.profession || ""}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}