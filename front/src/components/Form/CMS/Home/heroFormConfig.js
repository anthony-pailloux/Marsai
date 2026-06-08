export const HERO_PAGE = "home";
export const HERO_SECTION = "hero";

export const HERO_FIELDS = [
  "section_visibility",
  "protocol",
  "protocol_icon",
  "media",
  "title_main",
  "title_accent",
  "tagline_before",
  "tagline_highlight",
  "tagline_after",
  "desc1",
  "desc2",
  "ctaParticipate",
  "ctaParticipate_signe",
  "ctaParticipate_link",
  "ctaLearnMore",
  "ctaLearnMore_signe",
  "ctaLearnMore_link",
];

export const HERO_FILE_FIELDS = [
  "media",
  "protocol_icon",
  "ctaParticipate_signe",
  "ctaLearnMore_signe",
];

export const HERO_DEFAULT_VALUES = {
  section_visibility: "",
  section_visibility_is_active: 1,
  protocol: "",
  protocol_is_active: 1,
  protocol_icon: "",
  protocol_icon_is_active: 1,
  media: "",
  media_is_active: 1,
  title_main: "",
  title_main_is_active: 1,
  title_accent: "",
  title_accent_is_active: 1,
  tagline_before: "",
  tagline_before_is_active: 1,
  tagline_highlight: "",
  tagline_highlight_is_active: 1,
  tagline_after: "",
  tagline_after_is_active: 1,
  desc1: "",
  desc1_is_active: 1,
  desc2: "",
  desc2_is_active: 1,
  ctaParticipate: "",
  ctaParticipate_is_active: 1,
  ctaParticipate_signe: "",
  ctaParticipate_signe_is_active: 1,
  ctaParticipate_link: "",
  ctaParticipate_link_is_active: 1,
  ctaLearnMore: "",
  ctaLearnMore_is_active: 1,
  ctaLearnMore_signe: "",
  ctaLearnMore_signe_is_active: 1,
  ctaLearnMore_link: "",
  ctaLearnMore_link_is_active: 1,
};

export const HERO_CTAS = [
  {
    key: "ctaParticipate",
    toggleName: "ctaParticipate",
    subtitle: "Gestion du premier bouton",
    signeLabel: "Signe du Premiér bouton",
  },
  {
    key: "ctaLearnMore",
    toggleName: "ctaLearnMore",
    subtitle: "Gestion du deuxiéme bouton",
    signeLabel: "Signe du deuxiéme bouton",
  },
];
