import { useTranslation } from "react-i18next";
import useCmsContent from "../hooks/useCmsContent";
import useJuryPage from "../hooks/useJuryPage.js";
import JuryHeroSection from "../components/Jury/JuryHeroSection.jsx";
import JuryPresidentSection from "../components/Jury/JuryPresidentSection.jsx";
import JuryMembersGrid from "../components/Jury/JuryMembersGrid.jsx";

export default function Jury() {
  const { t, i18n } = useTranslation("jury");
  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

  const page = "jury";
  const hero = "hero";

  const { content } = useCmsContent(page, locale);
  const { loading, president, members } = useJuryPage(t);

  if (loading) return null;

  return (
    <div className="pt-25">
      <div className="mx-auto w-full max-w-6xl px-6">
        <JuryHeroSection content={content} page={page} hero={hero} t={t} />
        <JuryPresidentSection president={president} t={t} />
      </div>

      <JuryMembersGrid members={members} t={t} />
    </div>
  );
}
