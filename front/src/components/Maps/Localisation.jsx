import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { HOME_CARD } from "../Home/homeCardStyles.js";

function Localisation() {
    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const section = "localisationEvent";
    const { content } = useCmsContent(locale);

    return (
        <div className={`mx-auto w-full max-w-[974px] overflow-hidden ${HOME_CARD}`}>
            <div className="relative aspect-video w-full">
                <iframe
                    title="Google Map"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={content?.[section]?.maps_link || t("localisationEvent.maps_link")}
                />
            </div>
        </div>
    );
}

export default Localisation;
