import { useTranslation } from "react-i18next";
import { typeSectionTitle } from '../../utils/typography.js';
import useCmsContent from "../../hooks/useCmsContent.js";
import { resolveCmsAssetWithFallback } from "../../utils/cmsAssets.js";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
import {
    HOME_CARD_BODY,
    HOME_CARD_DESC,
    HOME_CARD_ICON,
    HOME_CARD_ICON_IMG,
    HOME_CARD_TITLE,
} from "./homeCardStyles.js";

function SectionConcept() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "concept";
    const cards = [1, 2, 3, 4];

    const { content, loading } = useCmsContent(page, locale);

    if (loading) return null;

    return (
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col justify-center items-center gap-5 px-5 md:px-18.75 w-full max-w-7xl mx-auto">

                    {isVisible(content, page, section, "title_main") && (
                        <h2 className={`${typeSectionTitle} w-full py-5`}>
                            {content?.[page]?.[section]?.title_main || t("concept.title_main")}
                        </h2>
                    )}

                    <div className="grid md:grid-cols-4 gap-4 md:gap-6 self-stretch text-left">

                        {cards.map((n) => {
                            const title = content?.[page]?.[section]?.[`card${n}_title`] || t(`concept.card${n}.title`);
                            const desc = content?.[page]?.[section]?.[`card${n}_description`] || t(`concept.card${n}.description`);
                            const iconSrc = resolveCmsAssetWithFallback(
                                content?.[page]?.[section]?.[`card${n}_icon`],
                                t(`concept.card${n}.icon`)
                            );

                            return (
                                <div key={n} className={HOME_CARD_BODY}>
                                    {isVisible(content, page, section, `card${n}_title`) && (
                                        <>
                                            {iconSrc ? (
                                                <div className={HOME_CARD_ICON}>
                                                    <img src={iconSrc} alt="" className={HOME_CARD_ICON_IMG} />
                                                </div>
                                            ) : null}
                                            <h3 className={`${HOME_CARD_TITLE} text-brand`}>
                                                {title}
                                            </h3>
                                            <p className={HOME_CARD_DESC}>
                                                {desc}
                                            </p>
                                        </>
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

export default SectionConcept