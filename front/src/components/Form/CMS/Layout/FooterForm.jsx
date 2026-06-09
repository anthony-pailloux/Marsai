import CmsTextarea from "../Fields/CmsTextarea";
import CmsInputImage from "../Fields/CmsInputImage";
import CmsHideToggle from "../Fields/CmsHideToggle";
import { useTranslation } from "react-i18next";
import iconPaintDark from "../../../../assets/imgs/icones/IconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/IconPaint.svg";
import CmsSubmitFooter from "../Fields/CmsSubmitFooter.jsx";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";
import saveFooterCmsSection from "../../../../utils/saveFooterCmsSection.js";
import {
  PAGE,
  SECTION,
  FIELDS,
  DEFAULT_VALUES,
  FILE_FIELDS,
  hydrateFooterValues,
} from "./footerFormConfig.js";
import FooterSocialSection from "./FooterSocialSection.jsx";
import FooterNavSection from "./FooterNavSection.jsx";

function FooterForm({ forcedLocale }) {
  const { t } = useTranslation("footer");

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
    page: PAGE,
    section: SECTION,
    fields: FIELDS,
    defaultValues: DEFAULT_VALUES,
    forcedLocale,
    fileFields: FILE_FIELDS,
    saveFn: saveFooterCmsSection,
    hydrateValues: hydrateFooterValues,
    successMessage: "Footer mis à jour",
  });

  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full p-12.5 flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit]"
      >
        <div className="flex items-center gap-2.5 self-stretch w-full">
          <div>
            <img src={iconPaintDark} alt="" className="hidden dark:block" />
            <img src={iconPaint} alt="" className="block dark:hidden" />
          </div>
          <h3 className="text-5 md:text-[30px] font-bold tracking-[3.2px] uppercase w-full">
            Gestion du pieds du site
          </h3>
        </div>

        <div className="w-full">
          <div className="flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit] w-full border-t-2 border-gray-600 pt-5">
            <div className="flex flex-col pb-2.5 justify-start gap-7.5 self-stretch uppercase placeholder:uppercase w-full">
              <div className="text-[16px] md:text-5 font-bold tracking-[3.2px] uppercase w-full">
                <h4 className="text-[16px] md:text-5 font-bold tracking-[3.2px] uppercase w-full">
                  Gestion du côté gauche
                </h4>
              </div>
              <div>
                <CmsInputImage
                  name="brand_logo"
                  label="Logo"
                  valueUrl={values.brand_logo}
                  onChange={handleChange}
                  page={page}
                  section={section}
                  locale={locale}
                />
              </div>
            </div>

            <div className="flex flex-col pb-2.5 justify-start gap-7.5 self-stretch uppercase placeholder:uppercase w-full">
              <div>
                <CmsTextarea
                  name="brand_quote"
                  label="Citation"
                  value={values.brand_quote}
                  onChange={handleChange}
                  rightSlot={
                    <CmsHideToggle
                      name="brand_quote"
                      value={values.brand_quote_is_active}
                      values={values}
                      onChange={handleChange}
                      page={page}
                      section={section}
                      locale={locale}
                    />
                  }
                />
              </div>
            </div>

            <FooterSocialSection
              values={values}
              handleChange={handleChange}
              page={page}
              section={section}
              locale={locale}
              t={t}
            />
          </div>

          <FooterNavSection
            values={values}
            handleChange={handleChange}
            page={page}
            section={section}
            locale={locale}
            t={t}
          />

          <div className="flex items-center border-t-2 border-gray-600 pt-5">
            <h4 className="text-[16px] md:text-5 font-bold tracking-[3.2px] uppercase w-full">
              Gestion de la newsletter
            </h4>
            <CmsHideToggle
              name="newsletter"
              value={values.newsletter_is_active}
              values={values}
              onChange={handleChange}
              page={page}
              section={section}
              locale={locale}
            />
          </div>
        </div>

        <CmsSubmitFooter
          message={message}
          messageType={messageType}
          submitLoading={submitLoading}
          btnClassName="flex h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333] w-full"
          wrapperClassName="flex w-full flex-col justify-center"
        />
      </form>
    </section>
  );
}

export default FooterForm;
