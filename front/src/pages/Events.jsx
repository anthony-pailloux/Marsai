import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import arrowIcon from "../assets/imgs/icones/arrow.png";
import baliseIcon from "../assets/imgs/icones/balise.png";
import wagonIcon from "../assets/imgs/icones/wagon.png";
import carsIcon from "../assets/imgs/icones/cars.png";
import { getEvents } from "../services/Events/EventsApi.js";
import { getProgram } from "../services/Events/ConferenceProgramAPI.js";
import BookingModal from "../components/BookingModal.jsx";
import { useTranslation } from "react-i18next";
import {
  typeBody,
  typeBodySm,
  typeCta,
  typeEyebrow,
  typeSectionBody,
  typeSectionSubtitle,
  typeStat,
} from "../utils/typography.js";
import {
  HOME_CARD,
  HOME_CARD_BODY,
  HOME_CARD_COMPACT,
  HOME_CARD_DASHED,
  HOME_CARD_ICON,
  HOME_CARD_ICON_IMG,
  HOME_EYEBROW,
  HOME_EYEBROW_ICON,
  HOME_LIST_ITEM,
  HOME_PILL_LINK,
  HOME_TIME_PILL,
} from "../components/Home/homeCardStyles.js";

const agendaIcon = "/icons/home/IconCalendar.svg";
const horlogeIcon = "/icons/home/IconClock.svg";
const starIcon = "/icons/home/IconStars.svg";
const peopleIcon = "/icons/home/IconPeople.svg";

function formatDayLabel(dayStr, locale = "fr") {
  if (!dayStr) return "—";
  const d = new Date(dayStr + "T12:00:00");
  if (Number.isNaN(d.getTime())) return dayStr;
  const s = d.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Events() {
  const { t, i18n } = useTranslation("event");
  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

  const [workshops, setWorkshops] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [programItems, setProgramItems] = useState([]);
  const [selectedProgramDay, setSelectedProgramDay] = useState(null);

  const programDays = [
    ...new Set(programItems.map((item) => item.day).filter(Boolean)),
  ].sort();

  const effectiveDay = selectedProgramDay ?? programDays[0] ?? null;
  const filteredProgramItems = effectiveDay
    ? programItems.filter((item) => item.day === effectiveDay)
    : programItems;

  useEffect(() => {
    getEvents()
      .then(setWorkshops)
      .catch((err) => console.error("Erreur chargement événements:", err));
  }, []);

  useEffect(() => {
    getProgram()
      .then(setProgramItems)
      .catch((err) => console.error("Erreur programme:", err));
  }, []);

  return (
    <main className="w-full p-[25px] md:px-[100px] md:py-[50px]">
      <div className="mx-auto px-6 py-12 space-y-16">
        {/* INFOS PRATIQUES */}
        <section id="infos-pratiques" className="flex flex-col items-start space-y-6">
          <div className={`${HOME_EYEBROW} ${typeEyebrow} text-black dark:text-white`}>
            <img src={agendaIcon} alt="" className={HOME_EYEBROW_ICON} />
            <span>{t("title")}</span>
          </div>

          <div className="space-y-3">
            <p className={`text-black dark:text-white ${typeEyebrow}`}>
              {t("datePlaceholder")}
            </p>
            <p className={`text-[#FF8C42] ${typeStat}`}>
              {t("city")}
            </p>
          </div>

          <article className={`mt-6 flex w-full gap-5 ${HOME_CARD_COMPACT} backdrop-blur`}>
            <div className={HOME_CARD_ICON}>
              <img src={baliseIcon} alt="" className={HOME_CARD_ICON_IMG} />
            </div>
            <div className="space-y-2 justify-center w-full ">
              <h3 className={`text-brand ${typeEyebrow}`}>
                {t("platformTitle")}
              </h3>
              <p className="text-sm text-black/80 dark:text-white/80">
                {t("platformDesc")}<br/>
                {t("platformDesc2")}
              </p>
              <p className="text-xs font-medium text-black/60 dark:text-white/60">
                {t("platformAddress")}
              </p>
            </div>
          </article>
        </section>

        {/* PROGRAMME DES CONFÉRENCES */}
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
                      onClick={() => setSelectedProgramDay(day)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors normal-case tracking-normal ${
                        isSelected
                          ? "bg-[#FF8C42] text-white dark:bg-[#FF8C42] dark:text-white"
                          : "border border-black/10 bg-black/5 text-black dark:border-white/10 dark:bg-white/5 dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
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
            {filteredProgramItems.length > 0
              ? filteredProgramItems.map((item) => (
                  <li
                    key={item.id}
                    className={`flex items-start gap-4 ${HOME_LIST_ITEM}`}
                  >
                    <span className={`mt-1 ${HOME_TIME_PILL}`}>
                      {item.time}
                    </span>
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
                        <p className="text-xs text-black/60 dark:text-white/60 text-left">
                          {item.speaker}
                        </p>
                      )}
                    </div>
                  </li>
                ))
              : (
                <li className={`px-4 py-6 text-center text-sm text-black/60 dark:text-white/60 ${HOME_CARD_DASHED}`}>
                  {effectiveDay ? t("noSlotDay") : t("noSlot")}
                </li>
              )}
          </ul>
        </section>

        {/* ACCÈS */}
        <section id="acces" className="flex flex-col items-start space-y-6">
          <div className={`${HOME_EYEBROW} ${typeEyebrow} text-black dark:text-white`}>
            <img src={arrowIcon} alt="" className={HOME_EYEBROW_ICON} />
            <span>{t("accessTitle")}</span>
          </div>

          <div className="grid w-full gap-4 md:grid-cols-3">
            <article className={HOME_CARD_COMPACT}>
              <img src={wagonIcon} alt="" className={HOME_EYEBROW_ICON} />
              <h3 className={`text-brand ${typeEyebrow}`}>
                {t("transportTitle")}
              </h3>
              <p className="mt-3 text-sm text-black/80 dark:text-white/80">
                {t("transportBus")}
              </p>
              <p className="text-sm text-black/80 dark:text-white/80">
                {t("transportMetro")}
              </p>
            </article>

            <article className={HOME_CARD_COMPACT}>
              <img src={carsIcon} alt="" className={HOME_EYEBROW_ICON} />
              <h3 className={`text-brand ${typeEyebrow}`}>
                {t("carTitle")}
              </h3>
              <p className="mt-3 text-sm text-black/80 dark:text-white/80">
                {t("carAddress")}
              </p>
              <p className="text-sm text-black/80 dark:text-white/80">
                {t("carParking")}
              </p>
            </article>

            <article className={HOME_CARD_COMPACT}>
              <img src={baliseIcon} alt="" className={HOME_EYEBROW_ICON} />
              <h3 className={`text-brand ${typeEyebrow}`}>
                {t("addressTitle")}
              </h3>
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

        {/* ATELIERS PRATIQUES */}
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
              {workshops.length > 0
                ? workshops.map((w) => (
                    <li
                      key={w.id}
                      className={`flex flex-col justify-between gap-3 ${HOME_LIST_ITEM}`}
                    >
                      <div className="flex items-center justify-between gap-3 flex-wrap">
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
                        <h4 className={`text-black dark:text-white ${typeBodySm} font-semibold`}>
                          {w.title}
                        </h4>
                        {w.description && (
                          <p className="mt-1 text-xs text-black/60 dark:text-white/60 line-clamp-2">
                            {w.description}
                          </p>
                        )}

                      </div>
                      <p className="text-xs font-medium text-black/80 dark:text-white/80">
                        {(() => {
                          const capacity = w.stock != null ? Number(w.stock) : null;
                          const registered = Number(w.registered ?? 0);
                          const remaining = capacity != null ? Math.max(0, capacity - registered) : null;
                          if (remaining == null) return "—";
                          return t("placeRemaining", { count: remaining });
                        })()}
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
                          onClick={() => setSelectedEvent(w)}
                          className={`inline-flex items-center justify-center rounded-full bg-[#FF8C42] px-5 py-2 text-white transition-colors hover:bg-[#E07830] ${typeCta}`}
                        >
                          {t("reserveCta")}
                        </button>
                      </div>
                    </li>
                  ))
                : (  
                    <li
                      className={`col-span-2 flex items-center justify-center p-6 text-sm text-black/70 dark:text-white/70 ${HOME_CARD_DASHED}`}
                    >
                      {t("noWorkshops")}
                    </li>
                  )}
            </ul>
          </article>
        </section>
      </div>

      {selectedEvent && (
        <BookingModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSuccess={() => {
            setSelectedEvent(null);
            getEvents().then(setWorkshops).catch(console.error);
          }}
        />
      )}
    </main>
  );
}

export default Events;