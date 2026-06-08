import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isVisible } from "../../utils/isVisible";
import { typePageHero, typePageHeroDesc } from "../../utils/typography.js";

function SectionHero() {

    const page = "contact";
    const section = "hero";    

    const { i18n } = useTranslation(page);
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const { content, loading } = useCmsContent(page, locale);
    
    if (loading) return null;

    return(
        <section className="flex flex-col items-center gap-4 px-12 py-12 md:px-25 md:py-11">

            <h2 className={`text-center ${typePageHero}`}>
                
                {isVisible(content, page, section, "title_main") && (
                    <span>
                        {content?.[page]?.[section]?.title_main}{" "}
                    </span>
                )}

                {isVisible(content, page, section, "title_accent") && (
                    <span className="block bg-[linear-gradient(101deg,#51A2FF_11.31%,rgba(255,176,32,0.70)_34.85%,#FF8C42_58.38%)] bg-clip-text [-webkit-background-clip:text] text-transparent">
                        {content?.[page]?.[section]?.title_accent}
                    </span>
                )}

            </h2>

            {isVisible(content, page, section, "description") && (
                <div className="flex justify-center">
                    <p className={`w-full max-w-3xl text-center ${typePageHeroDesc}`}>
                        {content?.[page]?.[section]?.description}
                    </p>
                </div>
            )}

        </section>
    )
}

export default SectionHero
