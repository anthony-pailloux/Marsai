import { Link } from "react-router"
import { typeCta, typeSectionBody, typeSectionTitle } from '../../utils/typography.js';
import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
import { resolveCmsAssetWithFallback } from "../../utils/cmsAssets";
import {
    HOME_CARD_BODY,
    HOME_CARD_DESC,
    HOME_CARD_ICON,
    HOME_CARD_ICON_IMG,
    HOME_CARD_TITLE,
} from "./homeCardStyles.js";

function SectionEvent() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "events";

    const listFields = [
        { key: "list_item1", fallback: "events.list.item1" },
        { key: "list_item2", fallback: "events.list.item2" },
        { key: "list_item3", fallback: "events.list.item3" },
    ];

    const cards = [1, 2, 3];

    const { content } = useCmsContent(page, locale);

    const ctaAgendaIconSrc = resolveCmsAssetWithFallback(content?.[page]?.[section]?.ctaAgenda_icon, t("events.ctaAgenda_icon"));

    function getCardIconSrc(n) {
       return resolveCmsAssetWithFallback(content?.[page]?.[section]?.[`card${n}_icon`], t(`events.cards.card${n}.icon`));
    }

    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col items-center gap-5 md:gap-12 md:py-12 p-5 md:px-24.75 self-stretch w-full max-w-7xl mx-auto">

                    <div className="flex flex-col gap-5 md:gap-8 items-start w-full">

                        <h2 className={`${typeSectionTitle} text-left text-black dark:text-white`}>

                            {isVisible(content, page, section, "title_main") && (
                                <span>{content?.[page]?.[section]?.title_main}</span>
                            )}

                            {isVisible(content, page, section, "title_accent") && (
                                <span className="block text-[#FFB020] mt-3">
                                    {content?.[page]?.[section]?.title_accent}
                                </span>
                            )}

                        </h2>

                        <div className={`${typeSectionBody} text-left text-black dark:text-white`}>
                            <ol className="list-decimal gap-5 px-5 md:p-5">
                                {listFields
                                    .filter(({ key }) => isVisible(content, page, section, key))
                                    .map(({ key }) => (
                                        <li key={key}>
                                            {content?.[page]?.[section]?.[key]}
                                        </li>
                                    ))
                                }
                            </ol>
                        </div>
                        <Link to={content?.[page]?.[section]?.ctaAgenda_link} className="flex h-10.5 px-6.25 py-3.25 gap-2 justify-center items-center rounded-[100px] border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/15">
                            <div>
                                {ctaAgendaIconSrc ? (
                                    <img src={ctaAgendaIconSrc} alt={content?.[page]?.[section]?.ctaAgenda ?? ""} />
                                ) : null}
                            </div>
                            <span className={`text-center text-black dark:text-white ${typeCta}`}>
                                {content?.[page]?.[section]?.ctaAgenda}
                            </span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 self-stretch text-left w-full">
                        {cards
                        .filter((n) => isVisible(content, page, section, `card${n}_title`))
                        .map((n) => {
                            const cardsIconSrc = getCardIconSrc(n);

                            return (
                                <div key={n} className={HOME_CARD_BODY}>
                                    <div className={HOME_CARD_ICON}>
                                        {cardsIconSrc ? (
                                            <img src={cardsIconSrc} alt={content?.[section]?.[`card${n}_title`]} className={HOME_CARD_ICON_IMG} />
                                        ) : null}
                                    </div>
                                    <h3 className={HOME_CARD_TITLE}>
                                        {content?.[page]?.[section]?.[`card${n}_title`]}
                                    </h3>
                                    <p className={HOME_CARD_DESC}>
                                        {content?.[page]?.[section]?.[`card${n}_description`]}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                </section>
            )}
        </>
    )
}

export default SectionEvent