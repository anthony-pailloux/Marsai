import { useTranslation } from "react-i18next";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm.jsx";
import CmsFormHeader from "../Titles/CmsFormHeader.jsx";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";
import {
  CLOSING_DEFAULT_VALUES,
  CLOSING_FIELDS,
  CLOSING_FILE_FIELDS,
  CLOSING_PAGE,
  CLOSING_SECTION,
} from "./closingEventFormConfig.js";
import SectionClosingEventFormBody from "./SectionClosingEventFormBody.jsx";

function SectionClosingEventForm({ forcedLocale }) {
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
    page: CLOSING_PAGE,
    section: CLOSING_SECTION,
    fields: CLOSING_FIELDS,
    defaultValues: CLOSING_DEFAULT_VALUES,
    forcedLocale,
    fileFields: CLOSING_FILE_FIELDS,
    successMessage: "Section de la soirée de clôture mise à jour",
  });

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="p-[50px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]"
      >
        <CmsFormHeader
          title="Gestion de la Section de soirée de clôture"
          toggleName="section_visibility"
          values={values}
          handleChange={handleChange}
          page={page}
          section={section}
          locale={locale}
        />

        <SectionClosingEventFormBody
          t={t}
          values={values}
          handleChange={handleChange}
          page={page}
          section={section}
          locale={locale}
        />

        <div className="w-full flex justify-center">
          <BtnSubmitForm
            loading={submitLoading}
            className="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]"
          >
            Mettre à jour
          </BtnSubmitForm>
        </div>
      </form>
    </section>
  );
}

export default SectionClosingEventForm;
