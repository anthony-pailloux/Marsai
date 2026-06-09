import { useTranslation } from "react-i18next";
import CmsSubmitFooter from "../Fields/CmsSubmitFooter.jsx";
import CmsFormHeader from "../Titles/CmsFormHeader.jsx";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";
import {
  HERO_DEFAULT_VALUES,
  HERO_FIELDS,
  HERO_FILE_FIELDS,
  HERO_PAGE,
  HERO_SECTION,
} from "./heroFormConfig.js";
import SectionHeroFormBody from "./SectionHeroFormBody.jsx";

function SectionHeroForm({ forcedLocale }) {
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
    page: HERO_PAGE,
    section: HERO_SECTION,
    fields: HERO_FIELDS,
    defaultValues: HERO_DEFAULT_VALUES,
    forcedLocale,
    fileFields: HERO_FILE_FIELDS,
    successMessage: "Section Hero mise à jour",
  });

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center gap-[50px] self-stretch p-[50px] font-[Outfit]"
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

        <SectionHeroFormBody
          t={t}
          values={values}
          handleChange={handleChange}
          page={page}
          section={section}
          locale={locale}
        />

        <CmsSubmitFooter
          message={message}
          messageType={messageType}
          submitLoading={submitLoading}
          btnClassName="flex h-[53px] items-center justify-center gap-[13px] rounded-[5px] border border-[#DBE3E6] bg-white px-[21px] py-[10px] dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]"
        />
      </form>
    </section>
  );
}

export default SectionHeroForm;
