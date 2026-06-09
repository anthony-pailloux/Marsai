import { useTranslation } from "react-i18next";
import CmsFormHeader from "../Titles/CmsFormHeader.jsx";
import CmsSubmitFooter from "../Fields/CmsSubmitFooter.jsx";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";
import {
  LOCALISATION_DEFAULT_VALUES,
  LOCALISATION_FIELDS,
  LOCALISATION_FILE_FIELDS,
  LOCALISATION_PAGE,
  LOCALISATION_SECTION,
} from "./localisationEventFormConfig.js";
import SectionLocalisationEventFormBody from "./SectionLocalisationEventFormBody.jsx";

function SectionLocalisationEventForm({ forcedLocale }) {
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
    page: LOCALISATION_PAGE,
    section: LOCALISATION_SECTION,
    fields: LOCALISATION_FIELDS,
    defaultValues: LOCALISATION_DEFAULT_VALUES,
    forcedLocale,
    fileFields: LOCALISATION_FILE_FIELDS,
    successMessage: "Section Localisation de l'événement mise à jour",
  });

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="p-[50px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]"
      >
        <CmsFormHeader
          title="Gestion de la Section Localisation de l'événement"
          toggleName="section_visibility"
          values={values}
          handleChange={handleChange}
          page={page}
          section={section}
          locale={locale}
        />

        <SectionLocalisationEventFormBody
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
          btnClassName="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]"
        />
      </form>
    </section>
  );
}

export default SectionLocalisationEventForm;
