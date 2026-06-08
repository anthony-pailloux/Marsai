import { Link } from "react-router-dom";
import {
  typeBodyLg,
  typeCta,
  typeEyebrow,
  typePageHero,
} from "../../utils/typography.js";
import {
  HOME_CARD,
  HOME_EYEBROW,
  HOME_EYEBROW_ICON,
  HOME_PILL_LINK,
} from "../Home/homeCardStyles.js";

export default function AboutHeroSection({ t }) {
  return (
    <section className={`relative overflow-hidden ${HOME_CARD}`}>
      <div className="absolute inset-0 opacity-60 dark:opacity-70">
        <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_60%)]" />
      </div>

      <div className="relative p-8 sm:p-12">
        <div
          className={`${HOME_EYEBROW} ${typeEyebrow} text-black dark:text-white`}
        >
          <img
            src="/icons/home/IconStars.svg"
            alt=""
            className={HOME_EYEBROW_ICON}
          />
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

        <p
          className={`mt-6 max-w-3xl text-neutral-700 dark:text-white/70 ${typeBodyLg}`}
        >
          {t("hero.description")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/gallery"
            className={`inline-flex items-center gap-2 rounded-full bg-[#FF8C42] px-6 py-3 text-white shadow-sm transition-colors hover:bg-[#E07830] ${typeCta}`}
          >
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
  );
}
