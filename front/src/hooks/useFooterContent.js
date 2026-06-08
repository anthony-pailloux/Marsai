import { useTranslation } from "react-i18next";
import useCmsContent from "./useCmsContent.js";
import { resolveCmsAsset, resolveCmsAssetWithFallback } from "../utils/cmsAssets.js";

const PAGE = "layout";
const SECTION = "footer";

const SOCIAL_KEYS = [
  { label: "facebook", alt: "Facebook", title: "Facebook" },
  { label: "instagram", alt: "Instagram", title: "Instagram" },
  { label: "youtube", alt: "YouTube", title: "Youtube" },
  { label: "x", alt: "X", title: "X" },
];

const NAV_LINKS = [
  { hrefKey: "links_gallery_href", labelKey: "links_gallery_label", fallback: "links.gallery" },
  { hrefKey: "links_program_href", labelKey: "links_program_label", fallback: "links.program" },
  { hrefKey: "links_jury_href", labelKey: "links_jury_label", fallback: "jury" },
];

const LEGAL_LINKS = [
  { hrefKey: "links_partners_href", labelKey: "links_patners_label", fallback: "links.partners" },
  { hrefKey: "links_faq_href", labelKey: "links_faq_label", fallback: "links.faq" },
  { hrefKey: "links_contact_href", labelKey: "links_contact_label", fallback: "links.contact" },
];

export default function useFooterContent() {
  const { t, i18n } = useTranslation("footer");
  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";
  const { content, loading } = useCmsContent(PAGE, locale);
  const sectionData = content?.[PAGE]?.[SECTION] || {};

  const logoSrc = resolveCmsAsset(sectionData.brand_logo);

  const social = SOCIAL_KEYS.map((item) => ({
    ...item,
    src: resolveCmsAssetWithFallback(
      sectionData[`social_${item.label}_icon`],
      t(`social.${item.label}.icon`),
    ),
    href: sectionData[`social_${item.label}_href`],
  }));

  const navLinks = NAV_LINKS.map((link) => ({
    to: sectionData[link.hrefKey],
    label: sectionData[link.labelKey] || t(link.fallback),
  }));

  const legalLinks = LEGAL_LINKS.map((link) => ({
    to: sectionData[link.hrefKey],
    label: sectionData[link.labelKey] || t(link.fallback),
  }));

  return {
    t,
    content,
    page: PAGE,
    section: SECTION,
    sectionData,
    loading,
    logoSrc,
    social,
    navLinks,
    legalLinks,
  };
}
