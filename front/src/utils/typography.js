/**
 * Classes typographiques MarsAI — une seule échelle pour tout le site.
 * Police unique : Arimo (définie dans index.css).
 * Ne pas modifier les couleurs ici.
 */

/** Navigation header / footer / mobile */
export const typeNav =
  "text-xs md:text-sm font-bold uppercase tracking-[0.2em]";

/** Titres de colonnes footer */
export const typeFooterHeading =
  "text-xs font-semibold uppercase tracking-[0.2em]";

/** Copyright, mentions légales, meta footer */
export const typeFooterMeta =
  "text-xs font-bold uppercase tracking-[0.2em]";

/** Liens footer */
export const typeFooterLink = "text-sm leading-relaxed";

/** Citation marque footer */
export const typeFooterQuote = "text-sm italic leading-relaxed";

/** Petit label au-dessus d'une section (eyebrow, protocol, kicker) — span ou p */
export const typeEyebrow =
  "text-xs font-semibold uppercase tracking-[0.2em]";

/** Titre hero pages secondaires (Contact, FAQ, Partners…) — h1 ou h2 */
export const typePageHero =
  "font-extrabold tracking-tight leading-tight text-hero-fluid";

/** Titre hero plein écran Home (vidéo) — h1 */
export const typeHomeHero =
  "font-extrabold uppercase tracking-tight text-center text-home-hero-fluid leading-tight";

/** Sous-titre hero Home (tagline) */
export const typeHomeHeroSub =
  "font-semibold uppercase tracking-[0.2em] text-center text-home-hero-sub-fluid leading-snug";

/** Descriptions hero Home */
export const typeHomeHeroBody =
  "leading-relaxed text-center text-home-hero-body-fluid";

/** Eyebrow / protocol hero Home */
export const typeHomeHeroEyebrow =
  "font-semibold uppercase tracking-[0.2em] text-home-hero-eyebrow-fluid";

/** CTA hero Home */
export const typeHomeHeroCta =
  "text-sm font-bold uppercase tracking-[0.14em]";

/** H2 de section — titres de blocs (Home, About, contenu) */
export const typeSectionTitle =
  "font-extrabold tracking-tight leading-tight uppercase text-section-fluid";

/** @deprecated Utiliser typeSectionTitle */
export const typeSectionTitleLg = typeSectionTitle;

/** @deprecated Utiliser typeSectionTitle */
export const typeSectionHeading = typeSectionTitle;

/** H3 dans les cards / sous-blocs */
export const typeSectionSubtitle =
  "text-lg md:text-xl font-bold tracking-tight uppercase";

/** Paragraphe principal */
export const typeBody = "text-base leading-relaxed";

/** Paragraphe secondaire, meta, descriptions courtes */
export const typeBodySm = "text-sm leading-relaxed";

/** @deprecated Utiliser typeBody */
export const typeSectionBody = typeBody;

/** @deprecated Utiliser typeBody */
export const typeBodyLg = typeBody;

/** Légende / label de card */
export const typeSectionCaption =
  "text-xs font-bold uppercase tracking-[0.2em]";

/** Meta, footnotes, dt/dd labels */
export const typeCaption = "text-xs leading-normal";

/** Description sous hero de page */
export const typePageHeroDesc =
  "text-base leading-relaxed text-black/70 dark:text-white/70";

/** Chiffre statistique */
export const typeStat =
  "text-3xl md:text-4xl font-extrabold tracking-tight";

/** Label de CTA (boutons pill des sections) */
export const typeCta =
  "text-sm font-bold uppercase tracking-[0.14em]";

/** Titre de card — aligné sur h3 section */
export const typeCardTitle = typeSectionSubtitle;

/** Corps de card */
export const typeCardBody = typeBodySm;

/** Titre de bloc newsletter (footer) */
export const typeNewsletterTitle =
  "text-sm font-bold uppercase tracking-tight md:text-base";

/** Badges, pills, tags UI */
export const typeBadge =
  "text-xs font-semibold uppercase tracking-wide";

/** Titre page admin */
export const typeAdminTitle =
  "text-2xl md:text-3xl font-extrabold tracking-tight";

/** Titre section admin */
export const typeAdminSection = "text-xl font-semibold tracking-tight";

/** Meta / sous-titre admin */
export const typeAdminMeta =
  "text-sm text-black/60 dark:text-white/60";

/** Chiffre KPI admin */
export const typeAdminStat =
  "text-2xl md:text-3xl font-extrabold tracking-tight";
