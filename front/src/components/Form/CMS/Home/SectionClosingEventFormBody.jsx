import { useMemo } from "react";
import CmsInput from "../Fields/CmsInput.jsx";
import CmsHideToggle from "../Fields/CmsHideToggle.jsx";
import CmsInputImage from "../Fields/CmsInputImage.jsx";
import { CLOSING_FIELDS } from "./closingEventFormConfig.js";

export default function SectionClosingEventFormBody({
  t,
  values,
  handleChange,
  page,
  section,
  locale,
}) {
  const orderIndexByKey = useMemo(
    () => Object.fromEntries(CLOSING_FIELDS.map((k, i) => [k, i])),
    [],
  );

  return (
    <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
      <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">
        <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
          Gestion du sur-titre
        </h4>
        <CmsInput
          name="eyebrow"
          label="Nom"
          value={values.eyebrow}
          onChange={handleChange}
          placeholder={t("closingEvent.eyebrow")}
          rightSlot={
            <CmsHideToggle
              name="eyebrow"
              value={values.eyebrow_is_active}
              values={values}
              onChange={handleChange}
              page={page}
              section={section}
              locale={locale}
              order_index={orderIndexByKey.eyebrow}
            />
          }
        />
      </div>

      <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">
        <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
          Gestion du Titre
        </h4>
        <div className="flex flex-col md:flex-row justify-around w-full pb-[10px] gap-[50px]">
          <CmsInput
            name="title_main"
            label="Titre principal en Blanc"
            value={values.title_main}
            onChange={handleChange}
            placeholder={t("closingEvent.title_main")}
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
          <CmsInput
            name="title_accent"
            label="Titre accent en dégradé"
            value={values.title_accent}
            onChange={handleChange}
            placeholder={t("closingEvent.title_accent")}
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
        </div>
      </div>

      <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch w-full">
        <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
          Gestion de la description
        </h4>
        <div className="flex flex-wrap p-[10px] gap-[30px] md:justify-between md:items-end uppercase placeholder:uppercase">
          {["description_ligne1", "description_ligne2"].map((name, i) => (
            <CmsInput
              key={name}
              name={name}
              label={`Description (ligne ${i + 1})`}
              value={values[name]}
              onChange={handleChange}
              placeholder={t(`closingEvent.description.ligne${i + 1}`)}
              rightSlot={
                <CmsHideToggle
                  name={name}
                  value={values[`${name}_is_active`]}
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

      <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch w-full">
        <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
          Gestion de la carte de l'événement
        </h4>
        <div className="flex flex-wrap p-[10px] gap-[30px] md:justify-between md:items-end uppercase placeholder:uppercase">
          <CmsInputImage
            name="card_icon"
            label="Icon"
            value={values.card_icon}
            onChange={handleChange}
            placeholder={t("closingEvent.card.icon")}
            rightSlot={
              <CmsHideToggle
                name="card_icon"
                value={values.card_icon_is_active}
                values={values}
                onChange={handleChange}
                page={page}
                section={section}
                locale={locale}
              />
            }
          />
          {[
            { name: "card_date", label: "Date", key: "date" },
            { name: "card_hour", label: "Heure", key: "hour" },
            { name: "card_localisation", label: "Lieux", key: "localisation" },
          ].map((field) => (
            <CmsInput
              key={field.name}
              name={field.name}
              label={field.label}
              value={values[field.name]}
              onChange={handleChange}
              placeholder={t(`closingEvent.card.${field.key}`)}
              rightSlot={
                <CmsHideToggle
                  name={field.name}
                  value={values[`${field.name}_is_active`]}
                  values={values}
                  onChange={handleChange}
                  page={page}
                  section={section}
                  locale={locale}
                />
              }
            />
          ))}
          <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch w-full">
            <div className="flex justify-between items-center">
              <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase">
                Gestion du bouton
              </h5>
              <CmsHideToggle
                name="card_ctaBooking"
                value={values.card_ctaBooking_is_active}
                values={values}
                onChange={handleChange}
                page={page}
                section={section}
                locale={locale}
              />
            </div>
            <div className="flex flex-col gap-[20px]">
              <CmsInput
                name="card_ctaBooking"
                label="Nom"
                value={values.card_ctaBooking}
                onChange={handleChange}
                placeholder={t("closingEvent.card.ctaBooking")}
              />
              <CmsInput
                name="card_ctaBooking_link"
                label="Lien"
                value={values.card_ctaBooking_link}
                onChange={handleChange}
                placeholder={t("closingEvent.card.ctaBooking_link")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
