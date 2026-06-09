import CmsHideToggle from "../Fields/CmsHideToggle.jsx";
import CmsInput from "../Fields/CmsInput.jsx";
import { useTranslation } from "react-i18next";
import CmsTextarea from "../Fields/CmsTextarea.jsx";
import CmsInputColor from "../Fields/CmsImputColor.jsx";
import CmsFormHeader from "../Titles/CmsFormHeader.jsx";
import CmsBlock from "../Titles/CmsBlock.jsx";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";
import CmsSubmitFooter from "../Fields/CmsSubmitFooter.jsx";
import {
  AWARD_DEFAULT_VALUES,
  AWARD_FIELDS,
  AWARD_PAGE,
  AWARD_SECTION,
} from "./awardFormConfig.js";

function SectionAwardForm({ forcedLocale }) {
  const { t } = useTranslation("home");

  const {
    page,
    section,
    locale,
    values,
    handleChange,
    cmsLoading,
    message,
    messageType,
    submitLoading,
    handleSubmit,
  } = useCmsSectionForm({
    page: AWARD_PAGE,
    section: AWARD_SECTION,
    fields: AWARD_FIELDS,
    defaultValues: AWARD_DEFAULT_VALUES,
    forcedLocale,
    successMessage: "Section Palmarès mise à jour",
  });

  if (cmsLoading) return null;

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="p-[50px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]"
      >
        <CmsFormHeader
          title="Gestion de la Section Palmares"
          toggleName="section_visibility"
          values={values}
          handleChange={handleChange}
          page={page}
          section={section}
          locale={locale}
        />

        <CmsBlock>
          <div className="w-full flex gap-[20px] items-center">
            <CmsInput
              name="eyebrow"
              label="Titre du projet"
              value={values.eyebrow}
              onChange={handleChange}
              placeholder={t("award.eyebrow")}
              rightSlot={
                <CmsHideToggle
                  name="eyebrow"
                  value={values.eyebrow_is_active}
                  values={values}
                  onChange={handleChange}
                  page={page}
                  section={section}
                  locale={locale}
                />
              }
            />
            <CmsInputColor
              name="eyebrow_color"
              value={values.eyebrow_color}
              onChange={handleChange}
              placeholder={t("award.eyebrow_color")}
            />
          </div>

          <div className="w-full flex flex-col md:flex-row gap-[20px] items-end">
            <CmsInput
              name="title1"
              label="Titre principal (ligne 1)"
              value={values.title1}
              onChange={handleChange}
              placeholder={t("award.title1")}
              rightSlot={
                <CmsHideToggle
                  name="title1"
                  value={values.title1_is_active}
                  values={values}
                  onChange={handleChange}
                  page={page}
                  section={section}
                  locale={locale}
                />
              }
            />
            <CmsInput
              name="title2"
              label="Titre principal (ligne 2 dégradée)"
              value={values.title2}
              onChange={handleChange}
              placeholder={t("award.title2")}
              rightSlot={
                <CmsHideToggle
                  name="title2"
                  value={values.title2_is_active}
                  values={values}
                  onChange={handleChange}
                  page={page}
                  section={section}
                  locale={locale}
                />
              }
            />
          </div>

          <div className="w-full">
            <CmsTextarea
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              placeholder={t("award.description")}
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
          </div>

          <div className="w-full flex flex-col md:flex-row gap-[20px] items-center">
            <CmsInput
              name="ctaSeeMore"
              label="Bouton"
              value={values.ctaSeeMore}
              onChange={handleChange}
              placeholder={t("award.ctaSeeMore")}
              rightSlot={
                <CmsHideToggle
                  name="ctaSeeMore"
                  value={values.ctaSeeMore_is_active}
                  values={values}
                  onChange={handleChange}
                  page={page}
                  section={section}
                  locale={locale}
                />
              }
            />
            <CmsInput
              name="ctaSeeMore_link"
              label="Lien du bouton"
              value={values.ctaSeeMore_link}
              onChange={handleChange}
              placeholder={t("award.ctaSeeMore_link")}
            />
            <CmsInputColor
              name="ctaSeeMore_color"
              value={values.ctaSeeMore_color}
              onChange={handleChange}
              placeholder={t("award.ctaSeeMore_color")}
            />
          </div>

          <CmsSubmitFooter
            message={message}
            messageType={messageType}
            submitLoading={submitLoading}
            btnClassName="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]"
          />
        </CmsBlock>
      </form>
    </section>
  );
}

export default SectionAwardForm;
