import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isVisible } from "../../utils/isVisible";
import { typePageHero, typePageHeroDesc } from "../../utils/typography.js";

function SectionHero() {

    const page = "faq";
    const section = "hero";

    const { t, i18n } = useTranslation(page);
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const { content, loading } = useCmsContent(page, locale);
    
    if (loading) return null;

    return(
        <section className="flex flex-col items-center gap-4 px-12 py-12 md:px-25 md:py-11">
            <h2 className={`text-center ${typePageHero}`}>
                {isVisible(content, page, section, "title_main") && (
                    <span>
                        {content?.[page]?.[section]?.title_main || t("hero.title_main")}
                    </span>
                )}
                {isVisible(content, page, section, "title_accent") && (
                    <span className="block bg-[linear-gradient(180deg,#51A2FF_0%,#FFB020_50%,#FF8C42_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent">
                        {content?.[page]?.[section]?.title_accent || t("hero.title_accent")}
                    </span>
                )}
            </h2>
            {isVisible(content, page, section, "description") && (
                <p className={`max-w-3xl text-center ${typePageHeroDesc}`}>
                    {content?.[page]?.[section]?.description}
                </p>
            )}
        </section>
    )
}

export default SectionHero
