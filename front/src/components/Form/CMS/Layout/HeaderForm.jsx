import { useTranslation } from "react-i18next"
import CmsInputImage from "../Fields/CmsInputImage";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInput from "../Fields/CmsInput";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";
import CmsFormHeader from "../Titles/CmsFormHeader.jsx";
import CmsTitleBlock from "../Titles/CmsTitleBlock.jsx";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock.jsx";
import CmsBlock from "../Titles/CmsBlock.jsx";
import CmsSubtitleBlock from "../Titles/CmsSubtitleBlock.jsx";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";


function HeaderForm({ forcedLocale }) {
  const { t } = useTranslation("header");

  const PAGE = "layout";
  const SECTION = "header";
  const FIELDS = [
  "logo",
  "home",
  "home_link",
  "first",
  "first_link",
  "seconde",
  "seconde_link",
  "third",
  "third_link",
  "btn",
  "btn_link",
  "icon_country",
  ];

  const DEFAULT_VALUES = {logo: "",
        logo_is_active: 1,

        home: "",
        home_link: "",
        home_is_active: 1,

        first: "",
        first_link: "",
        first_is_active: 1,

        seconde: "",
        seconde_link: "",
        secode_is_active: 1,

        third: "",
        third_link: "",
        third_is_active: 1,

        btn: "",
        btn_link: "",
        btn_is_active: 1,

        icon_country: "",
        icon_country_is_active: 1};

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
    fileFields: ["logo", "icon_country"],
    successMessage: "Header mis à jour",
  });


    return (
        <section className="w-full">
            <form onSubmit={handleSubmit} className="w-full p-12.5 flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit]">
                
                {/***** Titre du formulaire *****/}
                <CmsFormHeader title="Gestion de la Header" />

                <div className="w-full">

                    <div className="flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit] w-full">
                        
                        <CmsBlock>

                            <CmsTitleBlock title="Gestion du logo"/>

                            <CmsFieldsBlock>
                                <CmsInputImage name="logo" label="Logo" valueUrl={values.logo} onChange={handleChange} page={page} section={section} locale={locale} />
                            </CmsFieldsBlock>

                        </CmsBlock>

                    </div>

                    <div className="flex flex-col pb-2.5 justify-start gap-7.5 self-stretch uppercase placeholder:uppercase w-full">

                        <CmsTitleBlock title="Gestion de la navigation"/>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion du deuxiéme lien" toggleName="first" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                            
                            <CmsFieldsBlock>
                                < CmsInput name="first" label="Nom" value={values.first} onChange={handleChange} placeholder={t("first")} />
                                < CmsInput name="first_link" label="Lien" value={values.first_link} onChange={handleChange} placeholder={t("first_link")} />
                            </CmsFieldsBlock>
                            
                        </CmsBlock>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion du troisième lien" toggleName="seconde" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                            <CmsFieldsBlock>
                                < CmsInput name="seconde" label="Nom" value={values.seconde} onChange={handleChange} placeholder={t("seconde")} />
                                < CmsInput name="seconde_link" label="Lien" value={values.seconde_link} onChange={handleChange} placeholder={t("seconde_link")} />
                            </CmsFieldsBlock>
                            
                        </CmsBlock>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion du quatriéme lien" toggleName="third" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                            
                            <CmsFieldsBlock>
                                < CmsInput name="third" label="Nom" value={values.third} onChange={handleChange} placeholder={t("third")} />
                                < CmsInput name="third_link" label="Lien" value={values.third_link} onChange={handleChange} placeholder={t("third_link")} />
                            </CmsFieldsBlock>
                            
                        </CmsBlock>

                    </div>

                    <div className="flex flex-col items-start justify-center pb-2.5 gap-12.5 self-stretch font-[Outfit] w-full uppercase placeholder:uppercase ">
                        
                        <CmsTitleBlock title="Gestion des boutons"/>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion du premier bouton" toggleName="btn" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                            <CmsFieldsBlock>
                                <CmsInput name="btn" label="Nom" value={values.btn} onChange={handleChange} placeholder={t("btn")} />
                                <CmsInput name="btn_link" label="Lien" value={values.btn_link} onChange={handleChange} placeholder={t("btn_link")} />
                            </CmsFieldsBlock>
                            
                        </CmsBlock>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion du bouton switch des langues" toggleName="icon_country" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                            
                        </CmsBlock>

                    </div>

                </div>

                <div className="w-full flex justify-center">
                    <BtnSubmitForm loading={submitLoading} className="flex h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333] w-full">
                        Mettre à jour
                    </BtnSubmitForm>
                </div>

            </form>
        </section>
    )
}

export default HeaderForm
