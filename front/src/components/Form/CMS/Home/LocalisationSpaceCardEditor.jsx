import CmsInput from "../Fields/CmsInput.jsx";
import CmsTextarea from "../Fields/CmsTextarea.jsx";
import CmsInputColor from "../Fields/CmsImputColor.jsx";
import CmsSubtitleBlock from "../Titles/CmsSubtitleBlock.jsx";
import CmsBlock from "../Titles/CmsBlock.jsx";
import CmsFieldsRow from "../Titles/CmsFieldsRow.jsx";

export default function LocalisationSpaceCardEditor({
  spaceIndex,
  values,
  handleChange,
  page,
  section,
  locale,
  t,
}) {
  const prefix = `space${spaceIndex}`;

  return (
    <CmsBlock>
      <CmsSubtitleBlock
        title={`Gestion de la carte ${spaceIndex}`}
        toggleName={`${prefix}_name`}
        values={values}
        handleChange={handleChange}
        page={page}
        section={section}
        locale={locale}
      />
      <CmsBlock>
        <CmsFieldsRow>
          <CmsInput
            name={`${prefix}_name`}
            label="Nom"
            value={values[`${prefix}_name`]}
            onChange={handleChange}
            placeholder={t(`localisationEvent.${prefix}.name`)}
          />
          <CmsInputColor
            name={`${prefix}_color`}
            label=""
            value={values[`${prefix}_color`]}
            onChange={handleChange}
          />
        </CmsFieldsRow>
        <CmsTextarea
          name={`${prefix}_description`}
          label="Déscription"
          value={values[`${prefix}_description`]}
          onChange={handleChange}
          placeholder={t(`localisationEvent.${prefix}.description`)}
        />
      </CmsBlock>
    </CmsBlock>
  );
}
