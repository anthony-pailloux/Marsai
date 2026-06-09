import { useTranslation } from "react-i18next";
import CmsFormHeader from "../Titles/CmsFormHeader";
import CmsSubmitFooter from "../Fields/CmsSubmitFooter.jsx";
import CmsTitleBlock from "../Titles/CmsTitleBlock";
import CmsBlock from "../Titles/CmsBlock";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock";
import CmsInput from "../Fields/CmsInput";
import CmsHideToggle from "../Fields/CmsHideToggle";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";

const PAGE = "gallery";
const SECTION = "hero";

const FIELDS = [
  "section_visibility",
  "title_main",
  "title_accent",
  "description",
];

const DEFAULT_VALUES = {
  section_visibility: "1",
  section_visibility_is_active: 1,
  title_main: "",
  title_main_is_active: 1,
  title_accent: "",
  title_accent_is_active: 1,
  description: "",
  description_is_active: 1,
};

function GallerySectionHeroForm({ forcedLocale }) {
  const { t } = useTranslation("gallery");

  const {
    page,
    section,
    locale,
    values,
    handleChange,
    submitLoading,
    toastScope,
    handleSubmit,
  } = useCmsSectionForm({
    page: PAGE,
    section: SECTION,
    fields: FIELDS,
    defaultValues: DEFAULT_VALUES,
    forcedLocale,
  });

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="p-12.5 flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit]"
      >
        <CmsFormHeader
          title="Gestion de la Section Hero"
          toggleName="section_visibility"
          values={values}
          handleChange={handleChange}
          page={page}
          section={section}
          locale={locale}
        />

        <div className="flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit]">
          <CmsBlock>
            <CmsTitleBlock title="Gestion du titre" />
            <CmsFieldsBlock>
              <CmsInput
                name="title_main"
                label="Titre principal"
                value={values.title_main}
                onChange={handleChange}
                placeholder={t("title.line1")}
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
                label="Titre accent"
                value={values.title_accent}
                onChange={handleChange}
                placeholder={t("title.line2")}
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
            </CmsFieldsBlock>
          </CmsBlock>
        </div>

        <div className="flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit]">
          <CmsBlock>
            <CmsTitleBlock title="Gestion de la description" />
            <CmsFieldsBlock>
              <CmsInput
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                placeholder={t("description")}
                rightSlot={
                  <CmsHideToggle
                    name="description"
                    value={values.description_is_active}
                    values={values}
                    onChange={handleChange}
                    page={page}
                    section={section}
                    locale={locale}
                  />
                }
              />
            </CmsFieldsBlock>
          </CmsBlock>
        </div>

        <CmsSubmitFooter
          toastScope={toastScope}
          submitLoading={submitLoading}
          btnClassName="flex w-50 h-13.25 items-center justify-center gap-3.25 px-5.25 py-2.5 rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]"
        />
      </form>
    </section>
  );
}

export default GallerySectionHeroForm;
