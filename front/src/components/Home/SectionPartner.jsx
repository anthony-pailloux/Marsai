import { useEffect, useState } from "react";
import { typeEyebrow, typeSectionTitle } from '../../utils/typography.js';
import { useTranslation } from "react-i18next";
import GetPartnerApi from "../../services/Partner/GetPartnerApi";
import useCmsContent from "../../hooks/useCmsContent";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
import { HOME_EYEBROW, HOME_PARTNER_CARD, HOME_PARTNER_IMG } from "./homeCardStyles.js";

const API_URL = import.meta.env.VITE_API_URL;

function SectionPartner() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "partnersSection";

    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Message, setMessage] = useState("");

    const { content, message } = useCmsContent(page, locale);

    async function GetAllPartner() {
        try {
            setLoading(true);
            setMessage("");

            const res = await GetPartnerApi();
            const data = Array.isArray(res.data) ? res.data : [];
            setPartners(data.slice(0, 8));

        } catch (error) {
            console.error(error);
            setMessage("Erreur serveur");

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        GetAllPartner();
    }, []);

    return(
        <>
            { isSectionVisible(content, page, section) && (
                <section className="flex flex-col items-center gap-10 md:gap-14 p-5 md:px-18.75 md:py-12 self-stretch w-full max-w-7xl mx-auto">

                    <header className="flex flex-col items-center gap-4 w-full shrink-0">

                        {isVisible(content, page, section, "eyebrow") && (
                            <div className={`${HOME_EYEBROW} self-center ${typeEyebrow} text-black dark:text-white`}>
                                <span>{content?.[page]?.[section]?.eyebrow}</span>
                            </div>
                        )}

                        <h2 className={`text-center ${typeSectionTitle} w-full`}>
                            {isVisible(content, page, section, "title_main") && (
                                <span>
                                    {content?.[page]?.[section]?.title_main || t("partnersSection.title_main")}
                                </span>
                            )}
                            {isVisible(content, page, section, "title_accent") && (
                                <span
                                    className="block md:inline md:ml-2"
                                    style={{ color: content?.[page]?.[section]?.title_accent_color || "#00D3F2" }}
                                >
                                    {content?.[page]?.[section]?.title_accent || t("partnersSection.title_accent")}
                                </span>
                            )}
                        </h2>
                    </header>

                    <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {partners.length > 0 && partners.map((p) => (
                            <div key={p.id ?? p.name} className={HOME_PARTNER_CARD}>
                                <img
                                    src={`${API_URL}${p.img}`}
                                    alt={p.name}
                                    className={HOME_PARTNER_IMG}
                                />
                            </div>
                        ))}
                    </div>

                </section>
            )}
        </>
    )
}

export default SectionPartner