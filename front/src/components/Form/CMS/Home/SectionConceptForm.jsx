import CmsInput from "../Fields/CmsInput.jsx";
import { useTranslation } from "react-i18next";
import CmsTextarea from "../Fields/CmsTextarea.jsx";
import CmsHideToggle from "../Fields/CmsHideToggle.jsx";
import CmsInputColor from "../Fields/CmsImputColor.jsx";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm.jsx";
import CmsFormHeader from "../Titles/CmsFormHeader.jsx";
import CmsBlock from "../Titles/CmsBlock.jsx";
import CmsTitleBlock from "../Titles/CmsTitleBlock.jsx";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock.jsx";
import CmsFieldsRow from "../Titles/CmsFieldsRow.jsx";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";

const PAGE = "home";
const SECTION = "concept";

const FIELDS = [
  "section_visibility",
  "title_main",
  "card1_title",
  "card1_description",
  "card1_title_color",
  "card2_title",
  "card2_description",
  "card2_title_color",
  "card3_title",
  "card3_description",
  "card3_title_color",
  "card4_title",
  "card4_description",
  "card4_title_color",
];

const DEFAULT_VALUES = {
  section_visibility: "1",
  section_visibility_is_active: 1,
  title_main: "",
  title_main_is_active: 0,
  card1_title: "",
  card1_description: "",
  card1_title_color: "#FFC857",
  card1_title_is_active: 1,
  card2_title: "",
  card2_description: "",
  card2_title_color: "#00D492",
  card2_title_is_active: 1,
  card3_title: "",
  card3_description: "",
  card3_title_color: "#FF8C42",
  card3_title_is_active: 1,
  card4_title: "",
  card4_description: "",
  card4_title_color: "#2B7FFF",
  card4_title_is_active: 1,
};

function SectionConceptForm({ forcedLocale }) {
  const { t } = useTranslation("home");

  const {
    page,
    section,
    locale,
    values,
    handleChange,
    submitLoading,
    handleSubmit,
  } = useCmsSectionForm({
    page: PAGE,
    section: SECTION,
    fields: FIELDS,
    defaultValues: DEFAULT_VALUES,
    forcedLocale,
    successMessage: "Section Concept mise à jour",
  });

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="p-[50px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]"
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
          <CmsBlock>
            <CmsTitleBlock
              title="Gestion de la carte 1"
              toggleName="card1_title_is_active"
              values={values}
              handleChange={handleChange}
              page={page}
              section={section}
              locale={locale}
            />
            <CmsFieldsBlock>
              <CmsFieldsRow>
                <CmsInput
                  name="card1_title"
                  label="Titre"
                  value={values.card1_title}
                  onChange={handleChange}
                  placeholder={t("concept.card1.title")}
                />
                <CmsInputColor
                  name="card1_title_color"
                  label=""
                  value={values.card1_title_color}
                  onChange={handleChange}
                />
              </CmsFieldsRow>
              <CmsTextarea
                name="card1_description"
                label="Description"
                value={values.card1_description}
                onChange={handleChange}
                placeholder={t("concept.card1.description")}
              />
            </CmsFieldsBlock>
          </CmsBlock>

          <CmsBlock>
            <CmsTitleBlock
              title="Gestion de la carte 2"
              toggleName="card2_title_is_active"
              values={values}
              handleChange={handleChange}
              page={page}
              section={section}
              locale={locale}
            />
            <CmsFieldsBlock>
              <CmsFieldsRow>
                <CmsInput
                  name="card2_title"
                  label="Titre"
                  value={values.card2_title}
                  onChange={handleChange}
                  placeholder={t("concept.card2.title")}
                />
                <CmsInputColor
                  name="card2_title_color"
                  label=""
                  value={values.card2_title_color}
                  onChange={handleChange}
                />
              </CmsFieldsRow>
              <CmsTextarea
                name="card2_description"
                label="Description"
                value={values.card2_description}
                onChange={handleChange}
                placeholder={t("concept.card2.description")}
              />
            </CmsFieldsBlock>
          </CmsBlock>

          <CmsBlock>
            <CmsTitleBlock
              title="Gestion de la carte 3"
              toggleName="card3_title_is_active"
              values={values}
              handleChange={handleChange}
              page={page}
              section={section}
              locale={locale}
            />
            <CmsFieldsBlock>
              <CmsFieldsRow>
                <CmsInput
                  name="card3_title"
                  label="Titre"
                  value={values.card3_title}
                  onChange={handleChange}
                  placeholder={t("concept.card3.title")}
                />
                <CmsInputColor
                  name="card3_title_color"
                  label=""
                  value={values.card3_title_color}
                  onChange={handleChange}
                />
              </CmsFieldsRow>
              <CmsTextarea
                name="card3_description"
                label="Description"
                value={values.card3_description}
                onChange={handleChange}
                placeholder={t("concept.card3.description")}
              />
            </CmsFieldsBlock>
          </CmsBlock>

          <CmsBlock>
            <CmsTitleBlock
              title="Gestion de la carte 4"
              toggleName="card4_title_is_active"
              values={values}
              handleChange={handleChange}
              page={page}
              section={section}
              locale={locale}
            />
            <CmsFieldsBlock>
              <CmsFieldsRow>
                <CmsInput
                  name="card4_title"
                  label="Titre"
                  value={values.card4_title}
                  onChange={handleChange}
                  placeholder={t("concept.card4.title")}
                />
                <CmsInputColor
                  name="card4_title_color"
                  label=""
                  value={values.card4_title_color}
                  onChange={handleChange}
                />
              </CmsFieldsRow>
              <CmsTextarea
                name="card4_description"
                label="Description"
                value={values.card4_description}
                onChange={handleChange}
                placeholder={t("concept.card4.description")}
              />
            </CmsFieldsBlock>
          </CmsBlock>
        </CmsBlock>

        <div className="w-full flex justify-center">
          <BtnSubmitForm loading={submitLoading}>Mettre à jour</BtnSubmitForm>
        </div>
      </form>
    </section>
  );
}

export default SectionConceptForm;
