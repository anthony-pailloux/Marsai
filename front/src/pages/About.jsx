import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AboutHeroSection from "../components/About/AboutHeroSection.jsx";
import AboutStatsSection from "../components/About/AboutStatsSection.jsx";
import AboutVisionSection from "../components/About/AboutVisionSection.jsx";
import AboutWorkflowSection from "../components/About/AboutWorkflowSection.jsx";
import AboutQualitySection from "../components/About/AboutQualitySection.jsx";

export default function About() {
  const { t } = useTranslation("about");

  return (
    <div className="bg-white pt-[96px] text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <AboutHeroSection t={t} />
        <AboutStatsSection t={t} />
        <AboutVisionSection t={t} />
        <AboutWorkflowSection t={t} />
        <AboutQualitySection t={t} />

        <div className="mt-14 flex flex-wrap gap-6 text-sm font-semibold">
          <Link to="/contact" className="underline underline-offset-4">
            {t("footer.contact")}
          </Link>
        </div>
      </div>
    </div>
  );
}
