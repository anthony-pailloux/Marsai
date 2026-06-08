import { Link } from "react-router"
import { typeBodySm, typeCta, typeEyebrow, typeSectionTitle } from '../../utils/typography.js';
import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
import { resolveCmsAssetWithFallback } from "../../utils/cmsAssets";
import {
    HOME_CARD,
    HOME_CARD_BODY,
    HOME_CARD_DESC,
    HOME_CARD_ICON,
    HOME_CARD_ICON_IMG,
    HOME_CARD_TITLE,
    HOME_EYEBROW,
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

    const accentColor = content?.[page]?.[section]?.title_accent_color || "#FFB020";

    const visibleListItems = listFields.filter(({ key }) => isVisible(content, page, section, key));

    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col items-center gap-8 md:gap-10 px-5 md:px-18.75 md:py-6 self-stretch w-full max-w-7xl mx-auto">

                    <div className="grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">

                        <div className="flex flex-col items-start gap-4 md:gap-5">
                            <div className={`${HOME_EYEBROW} ${typeEyebrow} text-black dark:text-white`}>
                                {ctaAgendaIconSrc ? (
                                    <img src={ctaAgendaIconSrc} alt="" className="h-5 w-5 shrink-0 object-contain" />
                                ) : null}
                                <span>{t("events.eyebrow")}</span>
                            </div>

                            <h2 className={`${typeSectionTitle} text-left text-black dark:text-white`}>
                                {isVisible(content, page, section, "title_main") && (
                                    <span className="block">{content?.[page]?.[section]?.title_main}</span>
                                )}
                                {isVisible(content, page, section, "title_accent") && (
                                    <span className="block mt-1.5 md:mt-2" style={{ color: accentColor }}>
                                        {content?.[page]?.[section]?.title_accent}
                                    </span>
                                )}
                            </h2>
                        </div>

                        <div className={`${HOME_CARD} flex flex-col gap-4 p-5 md:p-6`}>
                            {visibleListItems.length > 0 && (
                                <ul className="flex flex-col gap-2">
                                    {visibleListItems.map(({ key }, index) => (
                                        <li
                                            key={key}
                                            className="flex items-center gap-3 rounded-xl border border-black/10 bg-black/[0.03] px-3.5 py-2 dark:border-white/10 dark:bg-white/[0.03]"
                                        >
                                            <span
                                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                                                style={{
                                                    backgroundColor: `${accentColor}33`,
                                                    color: accentColor,
                                                }}
                                            >
                                                {index + 1}
                                            </span>
                                            <p className={`leading-snug text-black dark:text-white ${typeBodySm}`}>
                                                {content?.[page]?.[section]?.[key]}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {isVisible(content, page, section, "ctaAgenda") && (
                                <Link
                                    to={content?.[page]?.[section]?.ctaAgenda_link || "/events"}
                                    className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 transition-colors hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                                >
                                    {ctaAgendaIconSrc ? (
                                        <img src={ctaAgendaIconSrc} alt="" className="h-4 w-4 shrink-0 object-contain" />
                                    ) : null}
                                    <span className={`text-black dark:text-white ${typeCta}`}>
                                        {content?.[page]?.[section]?.ctaAgenda}
                                    </span>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 self-stretch text-left w-full">
                        {cards
                        .filter((n) => isVisible(content, page, section, `card${n}_title`))
                        .map((n) => {
                            const cardsIconSrc = getCardIconSrc(n);
                            const cardLink = content?.[page]?.[section]?.[`card${n}_link`] || t(`events.cards.card${n}.link`, { defaultValue: "/events" });

                            return (
                                <Link key={n} to={cardLink} className={`${HOME_CARD_BODY} transition-colors hover:bg-black/[0.08] dark:hover:bg-white/[0.08]`}>
                                    <div className={HOME_CARD_ICON}>
                                        {cardsIconSrc ? (
                                            <img src={cardsIconSrc} alt="" className={HOME_CARD_ICON_IMG} />
                                        ) : null}
                                    </div>
                                    <h3 className={HOME_CARD_TITLE}>
                                        {content?.[page]?.[section]?.[`card${n}_title`]}
                                    </h3>
                                    <p className={HOME_CARD_DESC}>
                                        {content?.[page]?.[section]?.[`card${n}_description`]}
                                    </p>
                                </Link>
                            )
                        })}
                    </div>

                </section>
            )}
        </>
    )
}

export default SectionEvent
