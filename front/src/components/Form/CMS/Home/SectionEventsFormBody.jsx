import CmsInput from "../Fields/CmsInput.jsx";
import CmsHideToggle from "../Fields/CmsHideToggle.jsx";
import CmsInputColor from "../Fields/CmsImputColor.jsx";
import CmsInputImage from "../Fields/CmsInputImage.jsx";
import EventsFormCardEditor from "./EventsFormCardEditor.jsx";
import { EVENTS_CARDS, EVENTS_LIST_FIELDS } from "./eventsFormConfig.js";

export default function SectionEventsFormBody({
  t,
  values,
  handleChange,
  page,
  section,
  locale,
}) {
  return (
    <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit] w-full">
      <div className="w-full">
        <div className="pb-[20px]">
          <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
            Gestion du titre de la section
          </h4>
        </div>
        <div className="flex flex-col gap-[50px] md:flex-wrap md:justify-between w-full">
          <div className="flex items-center gap-[10px] w-full">
            <CmsInput
              name="title_main"
              label="Titre principal"
              value={values.title_main}
              onChange={handleChange}
              placeholder={t("events.title_main")}
              rightSlot={
                <CmsHideToggle
                  name="title_main"
                  value={values.title_main_is_active}
                  values={values}
                  onChange={handleChange}
                  page={page}
                  section={section}
                  locale={locale}
                />
              }
            />
          </div>
          <div className="flex items-center gap-[10px] w-full">
            <CmsInput
              name="title_accent"
              label="Titre accent coloré"
              value={values.title_accent}
              onChange={handleChange}
              placeholder={t("events.title_accent")}
              rightSlot={
                <CmsHideToggle
                  name="title_accent"
                  value={values.title_accent_is_active}
                  values={values}
                  onChange={handleChange}
                  page={page}
                  section={section}
                  locale={locale}
                />
              }
            />
            <CmsInputColor
              name="title_accent_color"
              label=""
              value={values.title_accent_color}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="pb-[20px]">
          <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
            Gestion de la liste
          </h4>
        </div>
        <div className="flex flex-col md:flex-wrap md:justify-between gap-[10px] w-full">
          {EVENTS_LIST_FIELDS.map((f) => (
            <CmsInput
              key={f.name}
              name={f.name}
              label={f.label}
              value={values[f.name]}
              onChange={handleChange}
              placeholder={t(f.placeholderKey)}
              rightSlot={
                <CmsHideToggle
                  name={f.name}
                  value={values[`${f.name}_is_active`]}
                  values={values}
                  onChange={handleChange}
                  page={page}
                  section={section}
                  locale={locale}
                />
              }
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-[20px] md:gap-[30px]">
        <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
          Gestion du bouton
        </h4>
        <div className="flex flex-col md:flex-wrap w-full gap-[10px]">
          <CmsInput
            name="ctaAgenda"
            label="Intitulé du bouton"
            value={values.ctaAgenda}
            onChange={handleChange}
            placeholder={t("events.ctaAgenda")}
          />
          <CmsInput
            name="ctaAgenda_link"
            label="Lien du bouton"
            value={values.ctaAgenda_link}
            onChange={handleChange}
            placeholder={t("events.ctaAgenda_link")}
          />
          <CmsInputImage
            name="ctaAgenda_icon"
            label="Icon du bouton"
            value={values.ctaAgenda_icon}
            onChange={handleChange}
            placeholder={t("events.ctaAgenda_icon")}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-[20px]">
        <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
          Gestion des cartes
        </h4>
        <div className="flex flex-col md:flex-wrap gap-[20px]">
          {EVENTS_CARDS.map((cardIndex) => (
            <EventsFormCardEditor
              key={cardIndex}
              cardIndex={cardIndex}
              values={values}
              handleChange={handleChange}
              page={page}
              section={section}
              locale={locale}
              t={t}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
