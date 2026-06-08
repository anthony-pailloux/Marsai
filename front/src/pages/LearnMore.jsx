import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { typeBody, typePageHero } from "../utils/typography.js";
import { LEARN_MORE_COPY } from "./learnMoreCopy.js";
import LearnMoreCards from "../components/LearnMore/LearnMoreCards.jsx";

function LearnMore() {
  const { i18n } = useTranslation();
  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";
  const copy = LEARN_MORE_COPY[locale];

  return (
    <main className="relative min-h-screen bg-white text-black dark:bg-[#07040F] dark:text-white">
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute -top-24 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-[#FFB020]/20 blur-3xl" />
        <div className="absolute top-40 left-10 h-72 w-72 rounded-full bg-[#51A2FF]/15 blur-3xl" />
        <div className="absolute top-56 right-10 h-72 w-72 rounded-full bg-[#FF8C42]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 py-10 md:px-10 md:py-14">
        <div className="flex flex-col gap-4">
          <h1 className={typePageHero}>
            <span className="text-black dark:text-white">{copy.title}</span>
            <span className="ml-2 bg-gradient-to-r from-[#51A2FF] via-[#FFB020] to-[#FF8C42] bg-clip-text text-transparent">
              MarsAI
            </span>
          </h1>

          <p className={`max-w-3xl text-black/70 dark:text-white/70 ${typeBody}`}>
            {copy.subtitle}
          </p>
        </div>

        <LearnMoreCards copy={copy} />

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-black/5 bg-black/[0.02] p-6 dark:border-white/10 dark:bg-white/5 md:mt-12 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold tracking-wide text-black/70 dark:text-white/70">
              {copy.ctaTitle}
            </p>
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">
              {copy.ctaDesc}
            </p>
          </div>

          <Link
            to="/participation"
            className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-extrabold tracking-wide text-white shadow-sm hover:opacity-90 dark:bg-white dark:text-black"
          >
            {copy.ctaBtn}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default LearnMore;
