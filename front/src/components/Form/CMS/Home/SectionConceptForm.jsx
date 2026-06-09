import CmsInput from "../Fields/CmsInput.jsx";
import { useTranslation } from "react-i18next";
import CmsHideToggle from "../Fields/CmsHideToggle.jsx";
import CmsSubmitFooter from "../Fields/CmsSubmitFooter.jsx";
import CmsFormHeader from "../Titles/CmsFormHeader.jsx";
import CmsBlock from "../Titles/CmsBlock.jsx";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";
import {
  CONCEPT_CARDS,
  CONCEPT_DEFAULT_VALUES,
  CONCEPT_FIELDS,
  CONCEPT_PAGE,
  CONCEPT_SECTION,
} from "./conceptFormConfig.js";
import ConceptFormCardEditor from "./ConceptFormCardEditor.jsx";

function SectionConceptForm({ forcedLocale }) {
  const { t } = useTranslation("home");

  const {
    page,
    section,
    locale,
    values,
    handleChange,
    message,
    messageType,
    submitLoading,
    handleSubmit,
  } = useCmsSectionForm({
    page: CONCEPT_PAGE,
    section: CONCEPT_SECTION,
    fields: CONCEPT_FIELDS,
    defaultValues: CONCEPT_DEFAULT_VALUES,
    forcedLocale,
    successMessage: "Section Concept mise à jour",
  });

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center gap-[50px] self-stretch p-[50px] font-[Outfit]"
      >
        <CmsFormHeader
          title="Gestion de la Section Concept"
          toggleName="section_visibility"
          values={values}
          handleChange={handleChange}
          page={page}
          section={section}
          locale={locale}
        />

        <CmsBlock>
          <CmsInput
            name="title_main"
            label="Titre principal"
            value={values.title_main}
            onChange={handleChange}
            placeholder={t("concept.title_main")}
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
        </CmsBlock>

        <CmsBlock>
          {CONCEPT_CARDS.map((cardIndex) => (
            <ConceptFormCardEditor
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
        </CmsBlock>

        <CmsSubmitFooter
          message={message}
          messageType={messageType}
          submitLoading={submitLoading}
        />
      </form>
    </section>
  );
}

export default SectionConceptForm;
