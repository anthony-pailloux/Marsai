/** Styles de cartes unifies — homepage et pages publiques (Info, Programme, Jury). */
import { typeCardBody, typeCardTitle } from "../../utils/typography.js";

/** Carte standard */
export const HOME_CARD =
  "rounded-2xl border border-black/10 bg-black/[0.05] dark:border-white/10 dark:bg-white/5";

/** Pill eyebrow / label de section */
export const HOME_EYEBROW =
  "inline-flex shrink-0 items-center gap-2.5 self-start rounded-full border border-black/10 bg-black/5 px-5 py-2 dark:border-white/10 dark:bg-white/5";

export const HOME_CARD_BODY = `${HOME_CARD} p-8 md:p-10 flex flex-col gap-4`;

export const HOME_CARD_COMPACT = `${HOME_CARD} p-5 md:p-6 flex flex-col gap-3`;

/** Item de liste (programme, timeline…) */
export const HOME_LIST_ITEM = `${HOME_CARD} rounded-xl p-4 md:p-5`;

/** Etat vide */
export const HOME_CARD_DASHED =
  "rounded-xl border border-dashed border-black/15 bg-black/[0.05] dark:border-white/15 dark:bg-white/5";

export const HOME_CARD_ICON =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/10";

export const HOME_CARD_ICON_IMG = "h-7 w-7 object-contain";

export const HOME_CARD_TITLE = `${typeCardTitle} text-black dark:text-white`;

export const HOME_CARD_DESC = `${typeCardBody} text-black/80 dark:text-white/80`;

export const HOME_PARTNER_CARD =
  `${HOME_CARD} flex aspect-[5/3] items-center justify-center p-6 md:p-8`;

export const HOME_PARTNER_IMG =
  "max-h-14 md:max-h-16 w-auto max-w-[75%] object-contain";
