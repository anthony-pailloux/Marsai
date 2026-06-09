import { useTranslation } from "react-i18next";
import CmsSubmitFooter from "../Fields/CmsSubmitFooter.jsx";
import CmsFormHeader from "../Titles/CmsFormHeader.jsx";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";
import {
  EVENTS_DEFAULT_VALUES,
  EVENTS_FIELDS,
  EVENTS_FILE_FIELDS,
  EVENTS_PAGE,
  EVENTS_SECTION,
} from "./eventsFormConfig.js";
import SectionEventsFormBody from "./SectionEventsFormBody.jsx";

function SectionEventsForm({ forcedLocale }) {
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
    page: EVENTS_PAGE,
    section: EVENTS_SECTION,
    fields: EVENTS_FIELDS,
    defaultValues: EVENTS_DEFAULT_VALUES,
    forcedLocale,
    fileFields: EVENTS_FILE_FIELDS,
    successMessage: "Section Programme mise à jour",
  });

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="p-[50px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]"
      >
        <CmsFormHeader
          title="Gestion de la Section Programme"
          toggleName="section_visibility"
          values={values}
          handleChange={handleChange}
          page={page}
          section={section}
          locale={locale}
        />

        <SectionEventsFormBody
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

export default SectionEventsForm;
