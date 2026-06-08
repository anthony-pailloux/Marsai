import { useTranslation } from "react-i18next";
import PartnersGallery from "../components/Partner/PartnerGallery"
import SectionHero from "../components/Partner/SectionHero"
import useCmsContent from "../hooks/useCmsContent";
import { isSectionVisible } from "../utils/isVisible";

function PartnersPage() {

    // Gére la traduction
    const { i18n } = useTranslation("partners");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "partners";
    const hero = "hero";

    const { content, loading } = useCmsContent(page, locale);
    
    if (loading) return null;

    return(
        <div>
            {isSectionVisible(content, page, hero) && (
                < SectionHero />
            )}
            < PartnersGallery />
        </div>
    )
}

export default PartnersPage