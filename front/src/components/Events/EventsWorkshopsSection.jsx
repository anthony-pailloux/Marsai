import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HOME_CARD_BODY,
  HOME_CARD_DASHED,
  HOME_EYEBROW,
  HOME_EYEBROW_ICON,
  HOME_LIST_ITEM,
  HOME_PILL_LINK,
  HOME_TIME_PILL,
} from "../Home/homeCardStyles.js";
import {
  typeBodySm,
  typeCta,
  typeEyebrow,
  typeSectionBody,
  typeSectionSubtitle,
} from "../../utils/typography.js";

const peopleIcon = "/icons/home/IconPeople.svg";
const starIcon = "/icons/home/IconStars.svg";

function getRemainingPlaces(workshop, t) {
  const capacity = workshop.stock != null ? Number(workshop.stock) : null;
  const registered = Number(workshop.registered ?? 0);
  const remaining = capacity != null ? Math.max(0, capacity - registered) : null;
  if (remaining == null) return "—";
  return t("placeRemaining", { count: remaining });
}

export default function EventsWorkshopsSection({ workshops, onReserve }) {
  const { t } = useTranslation("event");

  return (
    <section id="ateliers" className="flex flex-col items-start space-y-6 pb-4">
      <div className={`${HOME_EYEBROW} ${typeEyebrow} text-black dark:text-white`}>
        <img src={starIcon} alt="" className={HOME_EYEBROW_ICON} />
        <span>{t("workshopsTitle")}</span>
      </div>

      <article className={`w-full ${HOME_CARD_BODY}`}>
        <div className="flex items-center justify-between gap-4">
          <h3 className={`text-black dark:text-white ${typeSectionSubtitle}`}>
            {t("workshopsHeading")}{" "}
            <span className="text-[#FF8C42]">{t("workshopsHeadingAccent")}</span>
          </h3>
          <img src={peopleIcon} alt="" className={HOME_EYEBROW_ICON} />
        </div>

        <p className={`mt-4 text-black/80 dark:text-white/80 ${typeSectionBody}`}>
          {t("workshopsIntro")}
        </p>

        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {workshops.length > 0 ? (
            workshops.map((w) => (
              <li
                key={w.id}
                className={`flex flex-col justify-between gap-3 ${HOME_LIST_ITEM}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className={HOME_TIME_PILL}>
                    {w.date
                      ? new Date(w.date).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </span>
                  <span className="text-xs text-black/70 dark:text-white/70">
                    {w.location ? `• ${w.location}` : `• ${t("locationDefault")}`}
                  </span>
                </div>
                <div>
                  <h4
                    className={`font-semibold text-black dark:text-white ${typeBodySm}`}
                  >
                    {w.title}
                  </h4>
                  {w.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-black/60 dark:text-white/60">
                      {w.description}
                    </p>
                  )}
                </div>
                <p className="text-xs font-medium text-black/80 dark:text-white/80">
                  {getRemainingPlaces(w, t)}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Link
                    to={`/events/${w.id}`}
                    className={`${HOME_PILL_LINK} ${typeEyebrow} text-black dark:text-white`}
                  >
                    {t("seeDetail")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => onReserve(w)}
                    className={`inline-flex items-center justify-center rounded-full bg-[#FF8C42] px-5 py-2 text-white transition-colors hover:bg-[#E07830] ${typeCta}`}
                  >
                    {t("reserveCta")}
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li
              className={`col-span-2 flex items-center justify-center p-6 text-sm text-black/70 dark:text-white/70 ${HOME_CARD_DASHED}`}
            >
              {t("noWorkshops")}
            </li>
          )}
        </ul>
      </article>
    </section>
  );
}
