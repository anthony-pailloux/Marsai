import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isVisible } from "../../utils/isVisible";
import { typePageHero, typePageHeroDesc } from "../../utils/typography.js";

function SectionHero() {

    const page = "legal";
    const section = "hero";    

    const { i18n } = useTranslation(page);
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const { content, loading } = useCmsContent(page, locale);
    
    if (loading) return null;

    return(
        <section className="flex flex-col items-center gap-4 text-center">
            <h2 className={typePageHero}>
                {isVisible(content, page, section, "title_main") && (
                    <span>
                        {content?.[page]?.[section]?.title_main}{" "}
                    </span>
                )}
                {isVisible(content, page, section, "title_accent") && (
                    <span>
                        {content?.[page]?.[section]?.title_accent}
                    </span>
                )}
            </h2>
            {isVisible(content, page, section, "description") && (
                <p className={`mx-auto max-w-2xl ${typePageHeroDesc}`}>
                    {content?.[page]?.[section]?.description}
                </p>
            )}
        </section>
    )
}

export default SectionHero
