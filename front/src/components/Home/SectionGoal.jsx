import { useTranslation } from "react-i18next";
import { typeSectionTitle } from '../../utils/typography.js';
import { isSectionVisible, isVisible } from "../../utils/isVisible";
import { resolveCmsAssetWithFallback } from "../../utils/cmsAssets";
import useCmsContent from "../../hooks/useCmsContent";
import {
    HOME_CARD_BODY,
    HOME_CARD_DESC,
    HOME_CARD_ICON,
    HOME_CARD_ICON_IMG,
    HOME_CARD_TITLE,
} from "./homeCardStyles.js";

function SectionGoal() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "goal";

    const { content } = useCmsContent(page, locale);

    const card1Icon = resolveCmsAssetWithFallback(content?.[page]?.[section]?.card1_icon, t("goal.cards.card1.icon")) || null;
    const card2Icon = resolveCmsAssetWithFallback(content?.[page]?.[section]?.card2_icon, t("goal.cards.card2.icon")) || null;
    const card3Icon = resolveCmsAssetWithFallback(content?.[page]?.[section]?.card3_icon, t("goal.cards.card3.icon")) || null;

    const cards = [
        { icon: card1Icon, titleKey: "card1_title", descKey: "card1_description" },
        { icon: card2Icon, titleKey: "card2_title", descKey: "card2_description" },
        { icon: card3Icon, titleKey: "card3_title", descKey: "card3_description" },
    ];

    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col items-center justify-center md:gap-5 px-5 md:px-18.75 self-stretch dark:text-white text-left w-full max-w-7xl mx-auto">

                    <h2 className={`${typeSectionTitle} w-full py-5`}>
                        {isVisible(content, page, section, "title_main") && (
                            <span className="block">{content?.[page]?.[section]?.title_main} </span>
                        )}
                        {isVisible(content, page, section, "title_accent") && (
                            <span className="block text-brand">{content?.[page]?.[section]?.title_accent}</span>
                        )}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 self-stretch w-full">
                        {cards.map(({ icon, titleKey, descKey }) => (
                            isVisible(content, page, section, titleKey) ? (
                                <div key={titleKey} className={HOME_CARD_BODY}>
                                    <div className={HOME_CARD_ICON}>
                                        {icon && (
                                            <img
                                                src={icon}
                                                alt={content?.[page]?.[section]?.[titleKey] || ""}
                                                className={HOME_CARD_ICON_IMG}
                                            />
                                        )}
                                    </div>
                                    <h3 className={HOME_CARD_TITLE}>
                                        {content?.[page]?.[section]?.[titleKey]}
                                    </h3>
                                    <p className={HOME_CARD_DESC}>
                                        {content?.[page]?.[section]?.[descKey]}
                                    </p>
                                </div>
                            ) : null
                        ))}
                    </div>

                </section>
            )}
        </>
    )
}

export default SectionGoal