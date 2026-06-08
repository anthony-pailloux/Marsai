import { useTranslation } from "react-i18next";
import arrowIcon from "../../assets/imgs/icones/arrow.png";
import baliseIcon from "../../assets/imgs/icones/balise.png";
import carsIcon from "../../assets/imgs/icones/cars.png";
import wagonIcon from "../../assets/imgs/icones/wagon.png";
import {
  HOME_CARD,
  HOME_CARD_COMPACT,
  HOME_EYEBROW,
  HOME_EYEBROW_ICON,
} from "../Home/homeCardStyles.js";
import { typeEyebrow } from "../../utils/typography.js";

export default function EventsAccessSection() {
  const { t } = useTranslation("event");

  return (
    <section id="acces" className="flex flex-col items-start space-y-6">
      <div className={`${HOME_EYEBROW} ${typeEyebrow} text-black dark:text-white`}>
        <img src={arrowIcon} alt="" className={HOME_EYEBROW_ICON} />
        <span>{t("accessTitle")}</span>
      </div>

      <div className="grid w-full gap-4 md:grid-cols-3">
        <article className={HOME_CARD_COMPACT}>
          <img src={wagonIcon} alt="" className={HOME_EYEBROW_ICON} />
          <h3 className={`text-brand ${typeEyebrow}`}>{t("transportTitle")}</h3>
          <p className="mt-3 text-sm text-black/80 dark:text-white/80">
            {t("transportBus")}
          </p>
          <p className="text-sm text-black/80 dark:text-white/80">
            {t("transportMetro")}
          </p>
        </article>

        <article className={HOME_CARD_COMPACT}>
          <img src={carsIcon} alt="" className={HOME_EYEBROW_ICON} />
          <h3 className={`text-brand ${typeEyebrow}`}>{t("carTitle")}</h3>
          <p className="mt-3 text-sm text-black/80 dark:text-white/80">
            {t("carAddress")}
          </p>
          <p className="text-sm text-black/80 dark:text-white/80">
            {t("carParking")}
          </p>
        </article>

        <article className={HOME_CARD_COMPACT}>
          <img src={baliseIcon} alt="" className={HOME_EYEBROW_ICON} />
          <h3 className={`text-brand ${typeEyebrow}`}>{t("addressTitle")}</h3>
          <p className="mt-3 text-sm text-black/80 dark:text-white/80">
            {t("addressValue")}
          </p>
        </article>
      </div>

      <div className={`mx-auto mt-6 w-full max-w-[974px] overflow-hidden ${HOME_CARD}`}>
        <div className="relative aspect-video w-full">
          <iframe
            src="https://www.google.com/maps?q=%C3%89cole+de+la+Plateforme+12+Rue+d%27Uzes+13002+Marseille&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("mapTitle")}
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
