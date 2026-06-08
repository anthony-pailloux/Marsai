import { useTranslation } from "react-i18next";
import CmsBlock from "../Titles/CmsBlock";
import CmsFormHeader from "../Titles/CmsFormHeader";
import CmsTitleBlock from "../Titles/CmsTitleBlock";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock";
import CmsInput from "../Fields/CmsInput";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsSubtitleBlock from "../Titles/CmsSubtitleBlock";
import CmsInputColor from "../Fields/CmsImputColor";
import CmsFieldsRow from "../Titles/CmsFieldsRow";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";

function SectionProjectedStatsForm({ forcedLocale }) {
  const { t } = useTranslation("home");

  const PAGE = "home";
  const SECTION = "projectedStats";
  const FIELDS = [
  "section_visibility",
  "heading_title_main",
  "heading_title_accent",
  "heading_title_accent_color",
  "heading_tagline",
  "stat1_value",
  "stat1_label",
  "stat1_label_color",
  "stat2_value",
  "stat2_label",
  "stat2_label_color",
  ];

  const DEFAULT_VALUES = {section_visibility:"",
        section_visibility_is_active: 1,

        heading_title_main: "",
        heading_title_main_is_active: 1,

        heading_title_accent: "",
        heading_title_accent_color: "",
        heading_title_accent_is_active: 1,

        heading_tagline: "",
        heading_tagline_is_active: 1,

        stat1_value: "",
        stat1_label: "",
        stat1_label_color: "",
        stat1_value_is_active: 1,

        stat2_value: "",
        stat2_label: "",
        stat2_label_color: "",
        stat2_value_is_active: 1};

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
    successMessage: "Section Localisation de l'événement mise à jour",
  });


    return(
        <section>
            <form onSubmit={ handleSubmit } className="p-[50px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
                
                {/***** Titre du formulaire *****/}
                <CmsFormHeader title="Gestion de la Section Chiffres projetés" toggleName="section_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>
                
                <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
                    
                    {/* Gestion du Titre */}
                    <CmsBlock>
                        
                        <CmsTitleBlock title="Gestion du titre" toggleName="" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                        <CmsBlock>

                            <CmsBlock>

                                <CmsSubtitleBlock title="Titre principal"  toggleName="heading_title_main" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                                <CmsInput name="heading_title_main" label="Titre" value={values.heading_title_main} onChange={handleChange} placeholder={t("projectedStats.heading.title_main")} />
                            
                            </CmsBlock>

                            <CmsBlock>

                                <CmsSubtitleBlock title="Titre accent"  toggleName="heading_title_accent" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                                
                                <CmsFieldsRow>
                                    <CmsInput name="heading_title_accent" label="Titre" value={values.heading_title_accent} onChange={handleChange} placeholder={t("projectedStats.heading.title_accent")} />
                                    <CmsInputColor name="heading_title_accent_color" value={values.heading_title_accent_color} onChange={handleChange} />
                                </CmsFieldsRow>

                            </CmsBlock>

                        </CmsBlock>

                    </CmsBlock>

                    {/* Gestion du slogant */}
                    <CmsBlock>
                        <CmsTitleBlock title="Gestion du slogant" toggleName="heading_tagline" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                        <CmsInput name="heading_tagline" label="Slogant" value={values.heading_tagline} onChange={handleChange} placeholder={t("projectedStats.heading.tagline")} />
                    </CmsBlock>

                    {/* Gestion des cards */}
                    <CmsBlock>

                        <CmsTitleBlock title="Gestion des cartes" />

                        {/* Card 1 */}
                        <CmsBlock>
                            <CmsSubtitleBlock title="Gestion de la carte 1" toggleName="stat1_value" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                            
                            <CmsFieldsBlock>

                                <CmsInput name="stat1_value" label="Valeur" value={values.stat1_value} onChange={handleChange} placeholder={t("projectedStats.stat1.value")} />

                                <CmsFieldsRow>
                                    <CmsInput name="stat1_label" label="Label" value={values.stat1_label} onChange={handleChange} placeholder={t("projectedStats.stat1.label")} />
                                    <CmsInputColor name="stat1_label_color" value={values.stat1_label_color} onChange={handleChange} />
                                </CmsFieldsRow>

                            </CmsFieldsBlock>

                        </CmsBlock>

                        {/* Card 2 */}
                        <CmsBlock>
                            <CmsSubtitleBlock title="Gestion de la carte 2" toggleName="stat2_value" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                            
                            <CmsFieldsBlock>

                                <CmsInput name="stat2_value" label="Valeur" value={values.stat2_value} onChange={handleChange} placeholder={t("projectedStats.stat2.value")} />

                                <CmsFieldsRow>
                                    <CmsInput name="stat2_label" label="Label" value={values.stat2_label} onChange={handleChange} placeholder={t("projectedStats.stat2.label")} />
                                    <CmsInputColor name="stat2_label_color" value={values.stat2_label_color} onChange={handleChange} />
                                </CmsFieldsRow>

                            </CmsFieldsBlock>

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

export default SectionProjectedStatsForm