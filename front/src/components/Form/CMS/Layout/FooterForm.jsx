import CmsInput from "../Fields/CmsInput";
import CmsTextarea from "../Fields/CmsTextarea";
import CmsInputImage from "../Fields/CmsInputImage";
import CmsHideToggle from "../Fields/CmsHideToggle";
import { useTranslation } from "react-i18next";
import iconPaintDark from "../../../../assets/imgs/icones/IconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/IconPaint.svg";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";
import saveFooterCmsSection from "../../../../utils/saveFooterCmsSection.js";

const PAGE = "layout";
const SECTION = "footer";

const FIELDS = [
  "brand_logo",
  "brand_quote",
  "sections_navigation",
  "sections_legal",
  "links_gallery_label",
  "links_gallery_href",
  "links_program_label",
  "links_program_href",
  "links_jury_label",
  "links_jury_href",
  "links_partners_label",
  "links_partners_href",
  "links_faq_label",
  "links_faq_href",
  "links_contact_label",
  "links_contact_href",
  "links_legal_label",
  "links_legal_href",
  "bottom_copyright",
  "bottom_designSystem",
  "social",
  "social_facebook_label",
  "social_facebook_href",
  "social_facebook_icon",
  "social_instagram_label",
  "social_instagram_href",
  "social_instagram_icon",
  "social_youtube_label",
  "social_youtube_href",
  "social_youtube_icon",
  "social_x_label",
  "social_x_href",
  "social_x_icon",
  "aria_openSocial",
];

const DEFAULT_VALUES = {
  brand_logo: "",
  brand_logo_is_active: 1,
  brand_quote: "",
  brand_quote_is_active: 1,
  sections_navigation: "",
  sections_navigation_is_active: 1,
  sections_legal: "",
  sections_legal_is_active: 1,
  links_gallery_label: "",
  links_gallery_label_is_active: 1,
  links_gallery_href: "",
  links_program_label: "",
  links_program_label_is_active: 1,
  links_program_href: "",
  links_jury_label: "",
  links_jury_label_is_active: 1,
  links_jury_href: "",
  links_partners_label: "",
  links_partners_label_is_active: 1,
  links_partners_href: "",
  links_faq_label: "",
  links_faq_label_is_active: 1,
  links_faq_href: "",
  links_contact_label: "",
  links_contact_label_is_active: 1,
  links_contact_href: "",
  links_legal_label: "",
  links_legal_label_is_active: 1,
  links_legal_href: "",
  bottom_copyright: "",
  bottom_copyright_is_active: 1,
  bottom_designSystem: "",
  bottom_designSystem_is_active: 1,
  social: "",
  social_is_active: 1,
  social_facebook_label: "",
  social_facebook_label_is_active: 1,
  social_facebook_href: "",
  social_facebook_icon: "",
  social_instagram_label: "",
  social_instagram_label_is_active: 1,
  social_instagram_href: "",
  social_instagram_icon: "",
  social_youtube_label: "",
  social_youtube_label_is_active: 1,
  social_youtube_href: "",
  social_youtube_icon: "",
  social_x_label: "",
  social_x_label_is_active: 1,
  social_x_href: "",
  social_x_icon: "",
  aria_openSocial: "",
  aria_openSocial_is_active: 1,
  newsletter_is_active: 1,
};

const FILE_FIELDS = [
  "brand_logo",
  "social_facebook_icon",
  "social_instagram_icon",
  "social_youtube_icon",
  "social_x_icon",
];

function hydrateFooterValues(built, cmsSection) {
  built.social_is_active = Number(cmsSection?.social_is_active ?? 1);
  built.newsletter_is_active = Number(cmsSection?.newsletter_is_active ?? 1);
  return built;
}

function FooterForm({ forcedLocale }) {
  const { t } = useTranslation("footer");

  const {
    page,
    section,
    locale,
    values,
    handleChange,
    submitLoading,
    handleSubmit,
    message,
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
        <>
            <section className="w-full">
                <form onSubmit={handleSubmit} className="w-full p-12.5 flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit]">
                    {/***** Titre du formulaire *****/}
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
                                    <CmsInputImage name="brand_logo" label="Logo" valueUrl={values.brand_logo} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>

                            </div>

                            <div className="flex flex-col pb-2.5 justify-start gap-7.5 self-stretch uppercase placeholder:uppercase w-full">
                                <div>
                                    <CmsTextarea name="brand_quote" label="Citation" value={values.brand_quote} onChange={handleChange} rightSlot={
                                        <CmsHideToggle name="brand_quote" value={values.brand_quote_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col pb-2.5 justify-start gap-7.5 self-stretch uppercase placeholder:uppercase w-full border-t-2 border-gray-300 pt-5">
                                <div className="flex items-center">
                                    <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">Gestion des liens sociaux</h5>
                                    <CmsHideToggle name="social" value={values.social_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>
                                <div className="flex flex-col gap-5 border-t border-gray-300 pt-5">
                                    <div className="flex">
                                        <h6 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                            Facebook
                                        </h6>
                                        <CmsHideToggle name="social_facebook_label" value={values.social_facebook_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <CmsInputImage name="social_facebook_icon" label="Icon" valueUrl={values.social_facebook_icon} onChange={handleChange} page={page} section={section} locale={locale} />
                                        <div className="flex flex-col md:flex-row gap-5">
                                            <CmsInput name="social_facebook_label" label="Nom" value={values.social_facebook_label} onChange={handleChange} placeholder={t("social.facebook")} />
                                            <CmsInput name="social_facebook_href" label="Lien" value={values.social_facebook_href} onChange={handleChange} placeholder={"https://www.facebook.com"} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 border-t border-gray-300 pt-5">
                                    <div className="flex">
                                        <h6 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                            Instagram
                                        </h6>
                                        <CmsHideToggle name="social_instagram_label" value={values.social_instagram_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <CmsInputImage name="social_instagram_icon" label="Icon" valueUrl={values.social_instagram_icon} onChange={handleChange} page={page} section={section} locale={locale} />
                                        <div className="flex flex-col md:flex-row gap-5">
                                            <CmsInput name="social_instagram_label" label="Nom" value={values.social_instagram_label} onChange={handleChange} placeholder={t("social.instagram")} />
                                            <CmsInput name="social_instagram_href" label="Lien" value={values.social_instagram_href} onChange={handleChange} placeholder={"https://www.instagram.com"} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 border-t border-gray-300 pt-5">
                                    <div className="flex">
                                        <h6 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                            Youtube
                                        </h6>
                                        <CmsHideToggle name="social_youtube_label" value={values.social_youtube_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <CmsInputImage name="social_youtube_icon" label="Icon" valueUrl={values.social_youtube_icon} onChange={handleChange} page={page} section={section} locale={locale} />
                                        <div className="flex flex-col md:flex-row gap-5">
                                            <CmsInput name="social_youtube_label" label="Nom" value={values.social_youtube_label} onChange={handleChange} placeholder={t("social.youtube")} />
                                            <CmsInput name="social_youtube_href" label="Lien" value={values.social_youtube_href} onChange={handleChange} placeholder={"https://www.youtube.com"} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 border-t border-gray-300 pt-5">
                                    <div>
                                        <h6 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                            X
                                        </h6>
                                        <CmsHideToggle name="social_x_label" value={values.social_x_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <CmsInputImage name="social_x_icon" label="Icon" valueUrl={values.social_x_icon} onChange={handleChange} page={page} section={section} locale={locale} />
                                        <div className="flex flex-col md:flex-row gap-5">
                                            <CmsInput name="social_x_label" label="Nom" value={values.social_x_label} onChange={handleChange} placeholder={t("social.x")} />
                                            <CmsInput name="social_x_href" label="Lien" value={values.social_x_href} onChange={handleChange} placeholder={"https://x.com"} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col pb-2.5 justify-start gap-7.5 self-stretch uppercase placeholder:uppercase w-full border-t-2 border-gray-600 pt-5">

                            <div className="text-[16px] md:text-5 font-bold tracking-[3.2px] uppercase w-full">
                                <h4 className="text-[16px] md:text-5 font-bold tracking-[3.2px] uppercase w-full">
                                    Gestion de la navigation
                                </h4>
                            </div>

                            <div className="flex flex-col pb-2.5 justify-start gap-5 self-stretch uppercase placeholder:uppercase w-full border-t-2 border-gray-300 pt-5">

                                <div className="flex flex-col md:flex-row pb-2.5 justify-start gap-5 self-stretch uppercase placeholder:uppercase w-full">
                                    <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                        Gestion de la section Navigation
                                    </h5>
                                    <CmsHideToggle name="sections_navigation" value={values.sections_navigation_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>
                                <div>
                                    < CmsInput name="sections_navigation" label="Titre de section" value={values.sections_navigation} onChange={handleChange} placeholder={t("sections.navigation")} />
                                </div>
                                <div className="flex flex-col gap-5 w-full border-t border-gray-300 pt-5">
                                    <div className="flex items-center">
                                        <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">Gestion du premier lien</h5>
                                        < CmsHideToggle name="links_gallery_label" value={values.links_gallery_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        < CmsInput name="links_gallery_label" label="Nom" value={values.links_gallery_label} onChange={handleChange} placeholder={t("links.gallery")} />
                                        < CmsInput name="links_gallery_href" label="Lien" value={values.links_gallery_href} onChange={handleChange} placeholder={"/gallery"} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 w-full border-t border-gray-300 pt-5">
                                    <div className="flex items-center">
                                        <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">Gestion du deuxième lien</h5>
                                        < CmsHideToggle name="links_program_label" value={values.links_program_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        < CmsInput name="links_program_label" label="Nom" value={values.links_program_label} onChange={handleChange} placeholder={t("links.program")} />
                                        < CmsInput name="links_program_href" label="Lien" value={values.links_program_href} onChange={handleChange} placeholder={"/program"} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 w-full border-t border-gray-300 pt-5">
                                    <div className="flex items-center">
                                        <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">Gestion du troisième lien</h5>
                                        < CmsHideToggle name="links_jury_label" value={values.links_jury_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        < CmsInput name="links_jury_label" label="Nom" value={values.links_jury_label} onChange={handleChange} placeholder={t("links.jury")} />
                                        < CmsInput name="links_jury_href" label="Lien" value={values.links_jury_href} onChange={handleChange} placeholder={"/jury"} />
                                    </div>
                                </div>

                            </div>

                            <div className="flex flex-col pb-2.5 justify-start gap-5 self-stretch uppercase placeholder:uppercase w-full border-t-2 border-gray-300 pt-5">

                                <div className="flex flex-col md:flex-row pb-2.5 justify-start gap-5 self-stretch uppercase placeholder:uppercase w-full">
                                    <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                        Gestion de la section Legal
                                    </h5>
                                    <CmsHideToggle name="sections_legal" value={values.sections_legal_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>
                                <div>
                                    < CmsInput name="sections_legal" label="Titre de section" value={values.sections_legal} onChange={handleChange} placeholder={t("sections.legal")} />
                                </div>
                                <div className="flex flex-col gap-5 w-full border-t border-gray-300 pt-5">
                                    <div className="flex items-center">
                                        <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">Gestion du premier lien</h5>
                                        < CmsHideToggle name="links_partners_label" value={values.links_partners_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        < CmsInput name="links_partners_label" label="Nom" value={values.links_partners_label} onChange={handleChange} placeholder={t("links.partners")} />
                                        < CmsInput name="links_partners_href" label="Lien" value={values.links_partners_href} onChange={handleChange} placeholder={"/partners"} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 w-full border-t border-gray-300 pt-5">
                                    <div className="flex items-center">
                                        <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">Gestion du deuxième lien</h5>
                                        < CmsHideToggle name="links_faq_label" value={values.links_faq_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        < CmsInput name="links_faq_label" label="Nom" value={values.links_faq_label} onChange={handleChange} placeholder={t("links.faq")} />
                                        < CmsInput name="links_faq_href" label="Lien" value={values.links_faq_href} onChange={handleChange} placeholder={"/faq"} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 w-full border-t border-gray-300 pt-5">
                                    <div className="flex items-center">
                                        <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">Gestion du troisième lien</h5>
                                        < CmsHideToggle name="links_contact_label" value={values.links_contact_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        < CmsInput name="links_contact_label" label="Nom" value={values.links_contact_label} onChange={handleChange} placeholder={t("links.contact")} />
                                        < CmsInput name="links_contact_href" label="Lien" value={values.links_contact_href} onChange={handleChange} placeholder={"/contact"} />
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="flex items-center border-t-2 border-gray-600 pt-5">
                            <h4 className="text-[16px] md:text-5 font-bold tracking-[3.2px] uppercase w-full">
                                Gestion de la newsletter
                            </h4>
                            < CmsHideToggle name="newsletter" value={values.newsletter_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                        </div>

                    </div>

                    <div className="w-full flex flex-col justify-center">
                        <BtnSubmitForm loading={submitLoading} className="flex h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333] w-full">
                            Mettre à jour
                        </BtnSubmitForm>
                        {message && <p className="text-sm">{message}</p>}
                    </div>

                </form>
            </section>
        </>
    )
}

export default FooterForm