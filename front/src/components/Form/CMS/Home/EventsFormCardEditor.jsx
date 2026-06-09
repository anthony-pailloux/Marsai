import CmsInput from "../Fields/CmsInput.jsx";
import CmsTextarea from "../Fields/CmsTextarea.jsx";
import CmsInputImage from "../Fields/CmsInputImage.jsx";
import CmsHideToggle from "../Fields/CmsHideToggle.jsx";

export default function EventsFormCardEditor({
  cardIndex,
  values,
  handleChange,
  page,
  section,
  locale,
  t,
}) {
  const prefix = `card${cardIndex}`;

  return (
    <div className="flex flex-col w-full gap-[20px] md:gap-[30px]">
      <div className="flex justify-between items-center">
        <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase">
          Card {cardIndex}
        </h5>
        <CmsHideToggle
          name={`${prefix}_title`}
          value={values[`${prefix}_title_is_active`]}
          values={values}
          onChange={handleChange}
          page={page}
          section={section}
          locale={locale}
        />
      </div>
      <div>
        <CmsInputImage
          name={`${prefix}_icon`}
          label="Icon de la card"
          value={values[`${prefix}_icon`]}
          onChange={handleChange}
          placeholder={t(`events.cards.card${cardIndex}.icon`)}
        />
        <div className="flex items-center gap-[10px] w-full">
          <CmsInput
            name={`${prefix}_title`}
            label="Titre"
            value={values[`${prefix}_title`]}
            onChange={handleChange}
            placeholder={t(`events.cards.card${cardIndex}.title`)}
          />
        </div>
        <CmsTextarea
          name={`${prefix}_description`}
          label="Déscription"
          value={values[`${prefix}_description`]}
          onChange={handleChange}
          placeholder={t(`events.cards.card${cardIndex}.description`)}
        />
        <CmsInput
          name={`${prefix}_link`}
          label="Lien"
          value={values[`${prefix}_link`]}
          onChange={handleChange}
          placeholder={t(`events.cards.card${cardIndex}.link`)}
        />
      </div>
    </div>
  );
}
