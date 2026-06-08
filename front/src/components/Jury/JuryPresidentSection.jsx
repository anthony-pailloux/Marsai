import { HOME_CARD } from "../Home/homeCardStyles.js";
import {
  juryMemberName,
  resolveJuryImg,
} from "../../utils/juryPageUtils.js";
import {
  typeBodySm,
  typeCardTitle,
  typeEyebrow,
  typeSectionSubtitle,
} from "../../utils/typography.js";

export default function JuryPresidentSection({ president, t }) {
  if (!president) {
    return (
      <div className="py-16 text-center text-black/50 dark:text-white/55">
        {t("noPresidentDefined")}
      </div>
    );
  }

  return (
    <div className="mt-14 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
      <div className="flex justify-center md:justify-start">
        <div
          className={`relative w-full max-w-105 overflow-hidden ${HOME_CARD} shadow-xl`}
        >
          <img
            src={resolveJuryImg(president.img)}
            alt={juryMemberName(president)}
            className="h-120 w-full object-cover grayscale"
            draggable={false}
          />

          <div className="absolute inset-x-0 bottom-0 p-8">
            <div className={`text-brand ${typeEyebrow}`}>
              {president.role_label || t("president.defaultRole")}
            </div>
            <div className={`mt-3 text-white ${typeCardTitle}`}>
              {(president.first_name || "").toUpperCase()}{" "}
              {(president.name || "").toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className={typeSectionSubtitle}>
          {t("president.sectionTitle")}{" "}
          <span className="text-brand">{t("president.sectionTitleAccent")}</span>
        </h2>

        <div className="mt-8 max-w-130 rounded-[28px] bg-linear-to-br from-orange-600 via-blue-900 to-black p-7 text-white shadow-xl">
          <div className={`text-white/70 ${typeEyebrow}`}>
            {president.profession || t("president.professionFallback")}
          </div>

          <p className={`mt-4 text-white/80 ${typeBodySm}`}>
            {president.bio || t("president.bioFallback")}
          </p>

          {president.filmography_url && (
            <a
              href={president.filmography_url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-linear-to-r from-orange-500 to-orange-500 px-6 py-3 text-xs font-bold text-white"
            >
              {t("president.filmographyCta")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
