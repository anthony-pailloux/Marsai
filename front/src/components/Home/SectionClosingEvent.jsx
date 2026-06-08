import { useTranslation } from "react-i18next";
import { typeCta, typeEyebrow, typeSectionBody, typeSectionCaption, typeSectionTitle, typeSectionSubtitle } from '../../utils/typography.js';
import { Link } from "react-router";
import useCmsContent from "../../hooks/useCmsContent";
import { resolveCmsAsset } from "../../utils/cmsAssets";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
import { HOME_CARD, HOME_CARD_ICON_IMG, HOME_EYEBROW, HOME_EYEBROW_ICON } from "./homeCardStyles.js";

function SectionClosingEvent() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "closingEvent";

    // cherche les donnùes en bdd
    const { content, loading, message } = useCmsContent(page, locale);

    const cardIconSrc = resolveCmsAsset(content?.[page]?.[section]?.card_icon);

    if (loading) return null;

    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-14 lg:gap-16 px-5 md:px-18.75 self-stretch text-black dark:text-white w-full max-w-7xl mx-auto">

                    {/* Div left */}
                    <div className="flex flex-col items-start justify-center gap-5 md:gap-6 w-full md:max-w-xl">

                        {/* Eyebrowbox */}
                        {isVisible(content, page, section, "eyebrow") && (
                            <div className={`${HOME_EYEBROW} ${typeEyebrow} text-black dark:text-white`}>
                                {cardIconSrc ? (
                                    <img src={cardIconSrc} alt="" className={HOME_EYEBROW_ICON} />
                                ) : null}
                                <span>{content?.[page]?.[section]?.eyebrow}</span>
                            </div>
                        )}

                        {/* Title */}
                        <h2 className={`${typeSectionTitle} w-full text-left`}>
                            
                            {isVisible(content, page, section, "title_main") && (
                                <span>
                                    {content?.[page]?.[section]?.title_main || t("closingEvent.title_main")}
                                </span>
                            )}

                            {isVisible(content, page, section, "title_accent") && (
                                <span className="block italic" style={{ color: content?.[page]?.[section]?.title_accent_color || "#FF8C42" }}>
                                    {content?.[page]?.[section]?.title_accent || t("closingEvent.title_accent")}
                                </span>
                            )}

                        </h2>

                        {/* Paragraphe */}
                        <p className={`${typeSectionBody} w-full flex flex-col`}>

                            {isVisible(content, page, section, "description_ligne1") && (
                                <span>{content?.[page]?.[section]?.description_ligne1 || t("closingEvent.description.ligne1")}</span>
                            )}

                            {isVisible(content, page, section, "description_ligne2") && (
                                <span>{content?.[page]?.[section]?.description_ligne2 || t("closingEvent.description.ligne2")}</span>
                            )}

                        </p>
                    </div>

                    {/* Card / Div right */}
                    <div className={`${HOME_CARD} w-full md:w-80 shrink-0 flex flex-col items-center justify-center gap-6 p-8 md:p-10`}>
                        
                        {isVisible(content, page, section, "card_icon") && (
                            <div className="w-10 h-10">
                                <img src={cardIconSrc} alt="" className={HOME_CARD_ICON_IMG} />
                            </div>
                        )}

                        <div>
                            {isVisible(content, page, section, "card_date") && (
                                <h3 className={`text-center ${typeSectionSubtitle}`}>
                                    {content?.[page]?.[section]?.card_date || t("closingEvent.card.date")}
                                </h3>
                            )}
                            <p className={`text-center ${typeSectionCaption}`}>

                                {isVisible(content, page, section, "card_hour") && (
                                    <span>{content?.[page]?.[section]?.card_hour || t("closingEvent.card.hour")}</span>
                                )}

                                {isVisible(content, page, section, "card_localisation") && (
                                    <span> ù {content?.[page]?.[section]?.card_localisation || t("closingEvent.card.localisation")}</span>
                                )}

                            </p>
                        </div>

                        {isVisible(content, page, section, "card_ctaBooking") && (

                            <Link to={ content?.[page]?.[section]?.card_ctaBooking_link } className={`inline-flex items-center justify-center rounded-xl bg-[#CBCBCB] py-5 px-[49.5px] dark:bg-[#FFFFFF] dark:text-black ${typeCta}`}>
                                {content?.[page]?.[section]?.card_ctaBooking || t("closingEvent.card.ctaBooking")}
                            </Link>

                        )}

                    </div>
                </section>
            )}
        </>
    )
}

export default SectionClosingEvent