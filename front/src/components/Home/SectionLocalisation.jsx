import Localisation from "../Maps/Localisation"
import { typeEyebrow, typeSectionBody, typeSectionCaption, typeSectionTitle } from '../../utils/typography.js';
import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isVisible, isSectionVisible } from "../../utils/isVisible";
import { resolveCmsAsset } from "../../utils/cmsAssets";
import { HOME_CARD_BODY, HOME_CARD_DESC, HOME_CARD_TITLE, HOME_EYEBROW, HOME_EYEBROW_ICON } from "./homeCardStyles.js";

function SectionLocalisation() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "localisationEvent";

    const { content } = useCmsContent(page, locale);

    const eyebrowIconSrc = resolveCmsAsset(content?.[page]?.[section]?.eyebrow_icon) || null;

    const spaces = [1, 2];

    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col items-start gap-8 md:gap-10 px-5 md:px-18.75 w-full max-w-7xl mx-auto text-black dark:text-white">

                    {isVisible(content, page, section, "eyebrow") && (
                        <div className={`${HOME_EYEBROW} ${typeEyebrow} text-black dark:text-white`}>
                            {isVisible(content, page, section, "eyebrow_icon") && eyebrowIconSrc && (
                                <img src={eyebrowIconSrc} alt="" className={HOME_EYEBROW_ICON} />
                            )}
                            <span>{content?.[page]?.[section]?.eyebrow || t("localisationEvent.eyebrow")}</span>
                        </div>
                    )}

                    <div className="flex w-full flex-col items-start gap-4 md:gap-6">
                        <h2 className={`${typeSectionTitle} w-full text-left capitalize`}>
                            {content?.[page]?.[section]?.venue_namePart1 || t("localisationEvent.venue.namePart1")}
                            <span className="block md:inline md:ml-2 text-brand">
                                {content?.[page]?.[section]?.venue_namePart2 || t("localisationEvent.venue.namePart2")}
                            </span>
                        </h2>

                        <div className="flex w-full flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-x-8 md:gap-y-2 text-left">
                            {isVisible(content, page, section, "venue_cityTagline") && (
                                <p
                                    className={`${typeSectionCaption} text-brand`}
                                >
                                    {content?.[page]?.[section]?.venue_cityTagline || t("localisationEvent.venue.cityTagline")}
                                </p>
                            )}

                            {isVisible(content, page, section, "address_street") && (
                                <p className={`${typeSectionBody} font-bold`}>
                                    {content?.[page]?.[section]?.address_street || t("localisationEvent.address.street")},{" "}
                                    {content?.[page]?.[section]?.address_postalCode || t("localisationEvent.address.postalCode")}{" "}
                                    {content?.[page]?.[section]?.address_city || t("localisationEvent.address.city")}
                                </p>
                            )}

                            {isVisible(content, page, section, "access_tram") && (
                                <p className={`${typeEyebrow} font-normal text-black/70 dark:text-white/70`}>
                                    {content?.[page]?.[section]?.access_tram || t("localisationEvent.access.tram")}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                        {spaces.map((n) => {
                            const title = content?.[page]?.[section]?.[`space${n}_name`];
                            const description = content?.[page]?.[section]?.[`space${n}_description`];
                            return (
                                isVisible(content, page, section, `space${n}_name`) && (
                                    <div key={n} className={HOME_CARD_BODY}>
                                        <h3 className={`${HOME_CARD_TITLE} text-brand`}>
                                            {title}
                                        </h3>
                                        <p className={HOME_CARD_DESC}>
                                            {description}
                                        </p>
                                    </div>
                                )
                            );
                        })}
                    </div>

                    {isVisible(content, page, section, "maps_link") && (
                        <div className="w-full self-stretch">
                            <Localisation />
                        </div>
                    )}

                </section>
            )}
        </>
    )
}

export default SectionLocalisation
