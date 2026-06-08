import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  typeBodyLg,
  typeCta,
  typeEyebrow,
  typePageHero,
  typeSectionCaption,
  typeSectionHeading,
  typeStat,
} from "../utils/typography.js";
import {
  HOME_CARD,
  HOME_CARD_BODY,
  HOME_CARD_COMPACT,
  HOME_EYEBROW,
  HOME_EYEBROW_ICON,
  HOME_PILL_LINK,
} from "../components/Home/homeCardStyles.js";

export default function About() {
  const { t } = useTranslation("about");

  return (
    <div className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white pt-[96px]">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        {/* HERO */}
        <section className={`relative overflow-hidden ${HOME_CARD}`}>
          {/* background glow */}
          <div className="absolute inset-0 opacity-60 dark:opacity-70">
            <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
            <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_60%)]" />
          </div>

          <div className="relative p-8 sm:p-12">
            <div className={`${HOME_EYEBROW} ${typeEyebrow} text-black dark:text-white`}>
              <img src="/icons/home/IconStars.svg" alt="" className={HOME_EYEBROW_ICON} />
              <span>{t("hero.badge")}</span>
            </div>

            <h1 className={`mt-6 ${typePageHero}`}>
              <span>{t("hero.title1")} </span>
              <span className="text-neutral-900 dark:text-white">
                {t("hero.title2")}
              </span>
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                {t("hero.title3")}
              </span>
            </h1>

            <p className={`mt-6 max-w-3xl text-neutral-700 dark:text-white/70 ${typeBodyLg}`}>
              {t("hero.description")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/gallery"
                className={`inline-flex items-center gap-2 rounded-full bg-[#FF8C42] px-6 py-3 text-white shadow-sm transition-colors hover:bg-[#E07830] ${typeCta}`}
              >
                {/* icon */}
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                {t("hero.ctaGallery")}
              </Link>

              <Link
                to="/participation"
                className={`${HOME_PILL_LINK} px-6 py-3 ${typeCta} text-black dark:text-white`}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-black/5 dark:bg-white/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                {t("hero.ctaSubmit")}
              </Link>
            </div>
          </div>
        </section>

        {/* STATS (cards + icons) */}
        <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "films", icon: "🎬", v: "600+" },
            { k: "countries", icon: "🌍", v: "120+" },
            { k: "visitors", icon: "🏛️", v: "3000" },
            { k: "bilingual", icon: "🗣️", v: "FR/EN" },
          ].map((s) => (
            <div
              key={s.k}
              className={`${HOME_CARD_COMPACT}`}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-neutral-100 text-lg dark:bg-white/10">
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <div className={`leading-none ${typeStat}`}>
                    {s.v}
                  </div>
                  <div className={`mt-1 text-neutral-600 dark:text-white/60 ${typeSectionCaption}`}>
                    {t(`stats.${s.k}`)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* VISION */}
        <section className={`mt-14 ${HOME_CARD_BODY}`}>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/10 text-brand">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3l9 4.5-9 4.5-9-4.5L12 3z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M3 7.5V17l9 4.5 9-4.5V7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h2 className={typeSectionHeading}>{t("vision.title")}</h2>
          </div>

          <div className="mt-6 space-y-3 text-sm leading-relaxed text-neutral-700 dark:text-white/70">
            <p>{t("vision.p1")}</p>
            <p>{t("vision.p2")}</p>
            <p>{t("vision.p3")}</p>
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="mt-14">
          <h2 className={typeSectionHeading}>{t("workflow.title")}</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", key: "step1" },
              { n: "02", key: "step2" },
              { n: "03", key: "step3" },
              { n: "04", key: "step4" },
            ].map((x) => (
              <div
                key={x.key}
                className={`${HOME_CARD_COMPACT}`}
              >
                <div className={`text-neutral-500 dark:text-white/50 ${typeSectionCaption}`}>
                  {x.n}
                </div>
                <div className="mt-2 text-sm font-bold">
                  {t(`workflow.${x.key}`)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QUALITY */}
        <section className={`mt-14 ${HOME_CARD_BODY}`}>
          <h2 className={typeSectionHeading}>{t("quality.title")}</h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 text-sm text-neutral-700 dark:text-white/70">
            <div className="flex gap-3">
              <span className="mt-[2px]">🔐</span>
              <p>{t("quality.security")}</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-[2px]">🌐</span>
              <p>{t("quality.i18n")}</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-[2px]">⚡</span>
              <p>{t("quality.performance")}</p>
            </div>
          </div>
        </section>

        {/* FOOT */}
        <div className="mt-14 flex flex-wrap gap-6 text-sm font-semibold">
          <Link to="/contact" className="underline underline-offset-4">
            {t("footer.contact")}
          </Link>
        </div>
      </div>
    </div>
  );
}
