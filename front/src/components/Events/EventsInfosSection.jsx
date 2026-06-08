import { useTranslation } from "react-i18next";
import baliseIcon from "../../assets/imgs/icones/balise.png";
import {
  HOME_CARD_COMPACT,
  HOME_CARD_ICON,
  HOME_CARD_ICON_IMG,
  HOME_EYEBROW,
  HOME_EYEBROW_ICON,
} from "../Home/homeCardStyles.js";
import { typeEyebrow, typeStat } from "../../utils/typography.js";

const agendaIcon = "/icons/home/IconCalendar.svg";

export default function EventsInfosSection() {
  const { t } = useTranslation("event");

  return (
    <section id="infos-pratiques" className="flex flex-col items-start space-y-6">
      <div className={`${HOME_EYEBROW} ${typeEyebrow} text-black dark:text-white`}>
        <img src={agendaIcon} alt="" className={HOME_EYEBROW_ICON} />
        <span>{t("title")}</span>
      </div>

      <div className="space-y-3">
        <p className={`text-black dark:text-white ${typeEyebrow}`}>
          {t("datePlaceholder")}
        </p>
        <p className={`text-[#FF8C42] ${typeStat}`}>{t("city")}</p>
      </div>

      <article className={`mt-6 flex w-full gap-5 ${HOME_CARD_COMPACT} backdrop-blur`}>
        <div className={HOME_CARD_ICON}>
          <img src={baliseIcon} alt="" className={HOME_CARD_ICON_IMG} />
        </div>
        <div className="w-full justify-center space-y-2">
          <h3 className={`text-brand ${typeEyebrow}`}>{t("platformTitle")}</h3>
          <p className="text-sm text-black/80 dark:text-white/80">
            {t("platformDesc")}
            <br />
            {t("platformDesc2")}
          </p>
          <p className="text-xs font-medium text-black/60 dark:text-white/60">
            {t("platformAddress")}
          </p>
        </div>
      </article>
    </section>
  );
}
