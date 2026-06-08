import { useTranslation } from "react-i18next"
import { typeHomeHero, typeHomeHeroBody, typeHomeHeroCta, typeHomeHeroEyebrow, typeHomeHeroSub } from '../../utils/typography.js';
import { Link } from "react-router"
import useCmsContent from "../../hooks/useCmsContent";
import { isVisible, isSectionVisible } from "../../utils/isVisible";
import { resolveCmsAsset, resolveCmsAssetWithFallback } from "../../utils/cmsAssets";

function SectionHero() {

    // Gére la traduction
    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "hero";

    // cherche les données en bdd
    const { content, loading } = useCmsContent(page, locale);

    const protocolIconSrc = resolveCmsAssetWithFallback(content?.[page]?.[section]?.protocol_icon, t("hero.protocol_icon"));

    const ctaParticipate_signeSrc = resolveCmsAssetWithFallback(content?.[page]?.[section]?.ctaParticipate_signe, t("hero.ctaParticipate_signe"));

    const ctaLearnMore_signeSrc = resolveCmsAssetWithFallback(content?.[page]?.[section]?.ctaLearnMore_signe, t("hero.ctaLearnMore_signe"));
    
    if (loading) return null;
    
    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="relative w-full h-screen flex flex-col items-center justify-center pt-10">

                    {/* BACKGROUND DE LA SECTION : VIDEO OU IMAGE */}
                    {content?.[page]?.[section]?.media && (
                        content?.[page]?.[section]?.media.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                            <video className="absolute inset-0 h-full w-full object-cover brightness-[0.72] contrast-[1.05] saturate-[1.05] z-0 pointer-events-none" autoPlay muted loop playsInline >
                                <source src={resolveCmsAsset(content?.[page]?.[section]?.media) || t("hero.media")} type={content?.[page]?.[section]?.media.endsWith(".webm") ? "video/webm" : "video/mp4"} />
                            </video>
                        ) : (
                            <img src={resolveCmsAsset(content?.[page]?.[section]?.media)} className="absolute inset-0 h-full w-full object-cover brightness-[0.72] contrast-[1.05] saturate-[1.05] z-1"/>
                        )
                    )}


                    {/* LOGO, TITRE, ECT. */}
                    <div className="flex py-6 flex-col justify-center items-center gap-[clamp(1rem,2vw,3rem)] self-stretch z-20">

                        <div className="flex flex-col justify-center items-center gap-12.5 self-stretch">
                            
                            <div className="flex px-4.25 py-2.25 justify-center items-start gap-2">

                                {isVisible(content, page, section, "protocol_icon") && (
                                    <div>
                                        <img src={protocolIconSrc} className="h-[1.1em] w-[1.1em] opacity-80" />
                                    </div>
                                )}

                                {isVisible(content, page, section, "protocol") && (
                                    <p className={`text-center text-black/60 dark:text-white/60 ${typeHomeHeroEyebrow}`}>
                                        {content?.[page]?.[section]?.protocol || t("hero.protocol")}
                                    </p>
                                )}

                            </div>
                            
                            <h1 className={`flex items-center justify-center self-stretch text-white ${typeHomeHero}`}>
                                {isVisible(content, page, section, "title_main") && (
                                    <span>
                                        {content?.[page]?.[section]?.title_main || t("hero.title_main")}
                                    </span>
                                )}

                                {isVisible(content, page, section, "title_accent") && (
                                    <span className="bg-linear-to-b from-[#51A2FF] via-[#FFB020] to-[#FF8C42] bg-clip-text text-transparent">
                                        {content?.[page]?.[section]?.title_accent  || t("hero.title_accent")}
                                    </span>
                                )}
                            </h1>

                            <p className={`${typeHomeHeroSub} text-white`}>

                                {isVisible(content, page, section, "tagline_before") && (
                                    <span>
                                        {content?.[page]?.[section]?.tagline_before || t("hero.tagline_before")}
                                    </span>
                                )}

                                {isVisible(content, page, section, "tagline_highlight") && (
                                    <span className="bg-linear-to-r from-[#FFB020] via-[#FFB020] to-[#FF8C42] bg-clip-text text-transparent" >
                                        {" "}{content?.[page]?.[section]?.tagline_highlight || t("hero.tagline_highlight")}{" "}
                                    </span>
                                )}

                                {isVisible(content, page, section, "tagline_after") && (
                                    <span>
                                        {content?.[page]?.[section]?.tagline_after || t("hero.tagline_after")}
                                    </span>
                                )}

                            </p>
                        </div>

                        <div className={`flex flex-col items-center justify-center gap-2 self-stretch px-1 text-center text-white/40 md:gap-1.5 ${typeHomeHeroBody}`}>
                            
                            {isVisible(content, page, section, "desc1") && (
                                <p>{content?.[page]?.[section]?.desc1 || t("hero.desc1")}</p>
                            )}
                            
                            {isVisible(content, page, section, "desc2") && (
                                <p>{content?.[page]?.[section]?.desc2 || t("hero.desc2")}</p>
                            )}

                        </div>

                        <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:items-center md:justify-center">
                            <Link to={content?.[page]?.[section]?.ctaParticipate_link || t("hero.ctaParticipate_link")} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-[0_0_20px_0_rgba(255,255,255,0.08)] transition-transform hover:scale-[1.02]">

                                {isVisible(content, page, section, "ctaParticipate") && (
                                    <span className={`text-center text-black ${typeHomeHeroCta}`}>
                                        {content?.[page]?.[section]?.ctaParticipate || t("hero.ctaParticipate")}
                                    </span>
                                )}

                                {isVisible(content, page, section, "ctaParticipate_signe") && (
                                    <div className="size-4 shrink-0">
                                        <img src={ctaParticipate_signeSrc} alt=""/>
                                    </div>
                                )}

                            </Link>

                            <Link to={content?.[page]?.[section]?.ctaLearnMore_link || t("hero.ctaLearnMore_link")} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-white transition-colors hover:bg-white/10">
                                
                                {isVisible(content, page, section, "ctaLearnMore") && (
                                    <span className={`text-center ${typeHomeHeroCta}`}>
                                        {content?.[page]?.[section]?.ctaLearnMore || t("hero.ctaLearnMore")}
                                    </span>
                                )}

                                {isVisible(content, page, section, "ctaLearnMore_signe") && (
                                    <div className="size-4 shrink-0">
                                        <img src={ctaLearnMore_signeSrc} />
                                    </div>
                                )}

                            </Link>

                        </div>

                    </div>

                </section>
            )}
        </>
    )
}

export default SectionHero
