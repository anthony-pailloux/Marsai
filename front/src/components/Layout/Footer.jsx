import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import Newsletter from "../Form/Newsletter";

import AdminEntryButton from "./AdminEntryButton.jsx";
import useCmsContent from "../../hooks/useCmsContent.js";
import { resolveCmsAsset, resolveCmsAssetWithFallback } from "../../utils/cmsAssets.js";
import { isVisible } from "../../utils/isVisible.js";
import {
  typeFooterHeading,
  typeFooterLink,
  typeFooterMeta,
  typeFooterQuote,
} from "../../utils/typography.js";

function Footer() {

  const { t, i18n } = useTranslation("footer");
  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

  const page = "layout";
  const section = "footer";

  const { content, loading } = useCmsContent(page, locale);


  const logoSrc = resolveCmsAsset(content?.[page]?.[section]?.brand_logo)
  
  const fbIconSrc = resolveCmsAssetWithFallback(content?.[page]?.[section]?.social_facebook_icon, t("social.facebook.icon"));
  const instaIconSrc = resolveCmsAssetWithFallback(content?.[page]?.[section]?.social_instagram_icon, t("social.instagram.icon"));
  const youtubeIconSrc = resolveCmsAssetWithFallback(content?.[page]?.[section]?.social_youtube_icon, t("social.youtube.icon"));
  const xIconSrc = resolveCmsAssetWithFallback(content?.[page]?.[section]?.social_x_icon, t("social.x.icon"));

  const fbHref = content?.[page]?.[section]?.social_facebook_href;
  const instaHref = content?.[page]?.[section]?.social_instagram_href;
  const youtubeHref = content?.[page]?.[section]?.social_youtube_href;
  const xHref = content?.[page]?.[section]?.social_x_href;

  const social = [
    { label: "facebook", src: fbIconSrc, alt: "Facebook", href: fbHref, title: "Facebook" },
    { label: "instagram", src: instaIconSrc, alt: "Instagram", href: instaHref, title: "Instagram" },
    { label: "youtube", src: youtubeIconSrc, alt: "YouTube", href: youtubeHref, title: "Youtube" },
    { label: "x", src: xIconSrc, alt: "X", href: xHref, title: "X" },
  ];

  if (loading) return null;

  return (
    <footer className="w-full border-t border-black/10 bg-[#F5F6F8] text-black dark:border-[#FFFFFF]/60 dark:bg-black dark:text-white flex-col md:flex-row">

      <div className="mx-auto flex w-full flex-col px-6 py-5 md:px-8 md:py-6">

        {/* GRID PRINCIPAL */}

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {/* LEFT */}
          <div className="min-w-0 lg:col-span-1">
            {logoSrc ? (
              <Link to="/">
                <div className="w-32 shrink-0 md:w-36">
                  <img src={logoSrc} alt="Logo" className="w-full h-auto" draggable={false}/>
                </div> 
              </Link>
            ): null}

            {/* Texte exact maquette */}
            {isVisible(content, page, section, "brand_quote") && (
              <p className={`mt-3 text-black/80 dark:text-white/80 ${typeFooterQuote}`}>
                {content?.[page]?.[section]?.brand_quote}
              </p>
            )}

            {/* SOCIAL */}
            {isVisible(content, page, section, "social") && (
              <div className="mt-4 flex items-center gap-3">
                {social.map((i) => (
                  <div key={i.alt}>
                    {isVisible(content, page, section, `social_${i.label}_label`) && (
                      <a
                        href={i.href}
                        className="
                          flex items-center justify-center
                          h-10 w-10
                          rounded-full
                          border border-black/15 dark:border-[#FFFFFF]/60
                          bg-[#ECECEC] dark:bg-[#FFFFFF]/5
                          transition
                          hover:scale-105
                        "
                      >
                        <img
                          src={i.src}
                          alt={i.alt}
                          title={i.title}
                          className="
                            w-5 h-5
                            object-contain
                            invert dark:invert-0
                          "
                        />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CENTER */}
          <div className="min-w-0 md:col-span-1 lg:col-span-2">

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

              {/* NAVIGATION */}
              <div className="min-w-0">
                <h3 className={`text-amber-500 ${typeFooterHeading}`}>
                  {content?.[page]?.[section]?.sections_navigation || t("sections.navigation")}
                </h3>

                <ul className={`mt-3 space-y-2.5 ${typeFooterLink}`}>
                  <li>
                    <Link to={content?.[page]?.[section]?.links_gallery_href}>
                      {content?.[page]?.[section]?.links_gallery_label || t("links.gallery")}
                    </Link>
                  </li>
                  <li>
                    <Link to={content?.[page]?.[section]?.links_program_href}>
                      {content?.[page]?.[section]?.links_program_label || t("links.program")}
                    </Link>
                  </li>
                  <li>
                    <Link to={content?.[page]?.[section]?.links_jury_href}>
                      {content?.[page]?.[section]?.links_jury_label || t("jury")}
                    </Link>
                  </li>
                </ul>
              </div>
            
              {/* LEGAL */}
              <div className="min-w-0">
                <h3 className={`text-orange-500 ${typeFooterHeading}`}>
                  {content?.[page]?.[section]?.sections_legal}
                </h3>

                <ul className={`mt-3 space-y-2.5 ${typeFooterLink}`}>
                  <li>
                    <Link to={content?.[page]?.[section]?.links_partners_href}>
                      {content?.[page]?.[section]?.links_patners_label || t("links.partners")}
                    </Link>
                  </li>
                  <li>
                    <Link to={content?.[page]?.[section]?.links_faq_href}>
                      {content?.[page]?.[section]?.links_faq_label || t("links.faq")}
                    </Link>
                  </li>
                  <li>
                    <Link to={content?.[page]?.[section]?.links_contact_href}>
                      {content?.[page]?.[section]?.links_contact_label || t("links.contact")}
                    </Link>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* RIGHT - NEWSLETTER */}
          <div className="min-w-0 md:col-span-2 lg:col-span-1 flex md:justify-start lg:justify-end">
            <div className="max-w-105 md:max-w-150">
              <Newsletter />
            </div>
          </div>

        </div>

        {/* SEPARATOR */}
        <div className="mt-6 h-px w-full bg-black/20 md:mt-8 dark:bg-[#FFFFFF]/20" />

        {/* BOTTOM BAR */}
        <div className="mt-4 flex w-full flex-col items-center justify-between gap-3 opacity-70 md:mt-5 md:flex-row">
          <span className={`w-full text-center md:text-left ${typeFooterMeta}`}>
            {t("bottom.copyright")}
          </span>

          <div className="flex w-full flex-col items-center justify-end gap-3 md:flex-row md:gap-6">
            <span className={typeFooterMeta}>
              {t("designSystem")}
            </span>

            <Link to="/legal" className={typeFooterMeta}>
              {t("links.legal")}
            </Link>
             
            <AdminEntryButton/>
                
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
