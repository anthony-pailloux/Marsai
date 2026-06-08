import { useTranslation } from "react-i18next";
import {
  HOME_CARD_DASHED,
  HOME_EYEBROW,
  HOME_EYEBROW_ICON,
  HOME_LIST_ITEM,
  HOME_TIME_PILL,
} from "../Home/homeCardStyles.js";
import { typeEyebrow } from "../../utils/typography.js";
import { formatDayLabel } from "../../utils/eventsPageUtils.js";

const horlogeIcon = "/icons/home/IconClock.svg";

export default function EventsProgramSection({
  programDays,
  effectiveDay,
  onSelectDay,
  items,
  locale,
}) {
  const { t } = useTranslation("event");

  return (
    <section id="programme" className="flex flex-col items-start space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className={`${HOME_EYEBROW} ${typeEyebrow} text-black dark:text-white`}>
          <img src={horlogeIcon} alt="" className={HOME_EYEBROW_ICON} />
          <span>{t("programmeTitle")}</span>
        </div>
        {programDays.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {programDays.map((day) => {
              const isSelected = effectiveDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onSelectDay(day)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold normal-case tracking-normal transition-colors ${
                    isSelected
                      ? "bg-[#FF8C42] text-white dark:bg-[#FF8C42] dark:text-white"
                      : "border border-black/10 bg-black/5 text-black hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  }`}
                >
                  {formatDayLabel(day, locale)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <ul className="mt-4 w-full space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className={`flex items-start gap-4 ${HOME_LIST_ITEM}`}>
              <span className={`mt-1 ${HOME_TIME_PILL}`}>{item.time}</span>
              {item.day && (
                <span className="mt-1 text-xs text-black/70 dark:text-white/70">
                  {formatDayLabel(item.day, locale)}
                </span>
              )}
              <div className="space-y-1">
                <p className="text-sm font-medium text-black dark:text-white">
                  {item.title}
                </p>
                {item.speaker && (
                  <p className="text-left text-xs text-black/60 dark:text-white/60">
                    {item.speaker}
                  </p>
                )}
              </div>
            </li>
          ))
        ) : (
          <li
            className={`px-4 py-6 text-center text-sm text-black/60 dark:text-white/60 ${HOME_CARD_DASHED}`}
          >
            {effectiveDay ? t("noSlotDay") : t("noSlot")}
          </li>
        )}
      </ul>
    </section>
  );
}
