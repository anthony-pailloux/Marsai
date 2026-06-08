import { useTranslation } from "react-i18next"
import CmsInput from "../Fields/CmsInput";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInputImage from "../Fields/CmsInputImage";
import CmsInputFile from "../Fields/CmsInputFile.jsx";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm.jsx";
import CmsFormHeader from "../Titles/CmsFormHeader.jsx";
import CmsTitleBlock from "../Titles/CmsTitleBlock.jsx";
import CmsSubtitleBlock from "../Titles/CmsSubtitleBlock.jsx";
import CmsBlock from "../Titles/CmsBlock.jsx";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock.jsx";
import CmsFieldsRow from "../Titles/CmsFieldsRow.jsx";
import CmsInputColor from "../Fields/CmsImputColor";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";

function SectionPartners({ forcedLocale }) {
  const { t } = useTranslation("home");

  const PAGE = "home";
  const SECTION = "partnersSection";
  const FIELDS = [
  "section_visibility",
  "eyebrow",
  "title_main",
  "title_accent",
  "title_accent_color",
  ];

  const DEFAULT_VALUES = {section_visibility:"",
        section_visibility_is_active: 1,

        eyebrow: "",
        eyebrow_is_active: 1,

        title_main: "",
        title_main_is_active: 1,

        title_accent: "",
        title_accent_color: "",
        title_accent_is_active: 1};

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
    fileFields: ["media", "eyebrow_icon", "ctaParticipate_signe", "ctaLearnMore_signe"],
    successMessage: "Section Hero mise à jour",
  });


    return(
        <section>
            <form onSubmit={ handleSubmit } className="p-[50px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">

                {/***** Titre du formulaire *****/}
                <CmsFormHeader title="Gestion de la Section Partenaires" toggleName="section_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>

                <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">

                    {/* Gestion du eyebrow */}
                    <CmsBlock>
                        
                        <CmsTitleBlock title="Gestion du sur-titre" toggleName={values.eyebrow_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                        
                        <CmsFieldsBlock>
                            <CmsInput name="eyebrow" label="" value={values.eyebrow} onChange={handleChange} placeholder={t("partners.eyebrow")} />
                        </CmsFieldsBlock>

                    </CmsBlock>

                    <CmsBlock>
                        
                        <CmsTitleBlock title="Gestion du titre" />
                        
                        <CmsBlock>
                            <CmsSubtitleBlock title="Gestion du titre principale" toggleName={values.title_main_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                            <CmsInput name="title_main" label="Titre" value={values.title_main} onChange={handleChange} placeholder={t("partners.title_main")} />
                        </CmsBlock>

                        <CmsBlock>
                            <CmsSubtitleBlock title="Gestion du titre accent" toggleName={values.title_accent_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                            <CmsFieldsRow>
                                <CmsInput name="title_accent" label="Titre" value={values.title_accent} onChange={handleChange} placeholder={t("partners.title_accent")} />
                                <CmsInputColor name="title_accent_color" label="" value={values.title_accent_color} onChange={handleChange} />
                            </CmsFieldsRow>
                        </CmsBlock>

                    </CmsBlock>

                </div>

                <div className="w-full flex justify-center">
                    <BtnSubmitForm loading={submitLoading} className="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                        Mettre à jour
                    </BtnSubmitForm>
                </div>
            
            </form>
        </section>
    )
}

export default SectionPartners