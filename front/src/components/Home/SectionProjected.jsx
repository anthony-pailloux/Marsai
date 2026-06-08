import { useTranslation } from "react-i18next";
import { typeEyebrow, typeSectionCaption, typeSectionTitle, typeStat } from '../../utils/typography.js';
import useCmsContent from "../../hooks/useCmsContent";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
import { HOME_CARD } from "./homeCardStyles.js";

function SectionProjected() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";
    // const stats =t("projectedStats.stats", {
    //     returnObjects: true,
    //     defaultValue: []
    // })

    const page = "home";
    const section = "projectedStats";

    const stats = [ 1, 2 ];

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);

    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col md:flex-row md:items-center md:justify-center gap-8 md:gap-12 lg:gap-16 px-5 md:px-25 self-stretch w-full max-w-7xl mx-auto">
                    <div className="flex w-full md:max-w-xs shrink-0 flex-col items-start gap-3 text-left">
                        <h2 className={`${typeSectionTitle} w-full`}>
                            {content?.[page]?.[section]?.heading_title_main  || t("projectedStats.heading.title_main")}
                            <span className="block text-brand">
                                {content?.[page]?.[section]?.heading_title_accent || t("projectedStats.heading.title_accent")}
                            </span>
                        </h2>
                        <p className={`${typeEyebrow} font-normal w-full`}>
                            {content?.[page]?.[section]?.heading_tagline || t("projectedStats.heading.tagline")}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 md:gap-8 shrink-0">
                        {stats.map((n) => {
                            const value = content?.[page]?.[section]?.[`stat${n}_value`];
                            const label = content?.[page]?.[section]?.[`stat${n}_label`];
                            return (
                                <div key={n} >
                                    {isVisible(content, page, section, `stat${n}_value`) && (
                                        <div className={`${HOME_CARD} flex w-73.5 flex-col items-center gap-2 px-6 py-8`}>
                                            <p className={`text-center ${typeStat}`}>
                                                {value}
                                            </p>
                                            <p className={`text-center text-brand ${typeSectionCaption}`}>
                                                {label}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </section>
            )}
        </>
    )
}

export default SectionProjected