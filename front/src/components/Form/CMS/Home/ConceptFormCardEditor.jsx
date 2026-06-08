import CmsInput from "../Fields/CmsInput.jsx";
import CmsTextarea from "../Fields/CmsTextarea.jsx";
import CmsInputColor from "../Fields/CmsImputColor.jsx";
import CmsTitleBlock from "../Titles/CmsTitleBlock.jsx";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock.jsx";
import CmsFieldsRow from "../Titles/CmsFieldsRow.jsx";
import CmsBlock from "../Titles/CmsBlock.jsx";

export default function ConceptFormCardEditor({
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
    <CmsBlock>
      <CmsTitleBlock
        title={`Gestion de la carte ${cardIndex}`}
        toggleName={`${prefix}_title_is_active`}
        values={values}
        handleChange={handleChange}
        page={page}
        section={section}
        locale={locale}
      />
      <CmsFieldsBlock>
        <CmsFieldsRow>
          <CmsInput
            name={`${prefix}_title`}
            label="Titre"
            value={values[`${prefix}_title`]}
            onChange={handleChange}
            placeholder={t(`concept.card${cardIndex}.title`)}
          />
          <CmsInputColor
            name={`${prefix}_title_color`}
            label=""
            value={values[`${prefix}_title_color`]}
            onChange={handleChange}
          />
        </CmsFieldsRow>
        <CmsTextarea
          name={`${prefix}_description`}
          label="Description"
          value={values[`${prefix}_description`]}
          onChange={handleChange}
          placeholder={t(`concept.card${cardIndex}.description`)}
        />
      </CmsFieldsBlock>
    </CmsBlock>
  );
}
