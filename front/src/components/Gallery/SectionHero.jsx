import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isVisible } from "../../utils/isVisible";
import { typePageHero, typePageHeroDesc } from "../../utils/typography.js";

function SectionHero() {
    const { t, i18n } = useTranslation("gallery");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "gallery";
    const section = "hero";

    const { content, loading } = useCmsContent(page, locale);
    
    if (loading) return null;

    return (
        <section className="mb-8 flex flex-col gap-5">
            <h2 className={typePageHero}>
                {isVisible(content, page, section, "title_main") && (
                    <span className="block text-black dark:text-white">
                        {content?.[page]?.[section]?.title_main || t("title.line1")}
                    </span>
                )}
                {isVisible(content, page, section, "title_accent") && (
                    <span className="block text-brand">
                        {content?.[page]?.[section]?.title_accent || t("title.line2")}
                    </span>
                )}
            </h2>
            {isVisible(content, page, section, "description") && (
                <p className={typePageHeroDesc}>
                    {content?.[page]?.[section]?.description}
                </p>
            )}
        </section>
    )
}

export default SectionHero
