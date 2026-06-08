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
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";

function SectionHeroForm({ forcedLocale }) {
  const { t } = useTranslation("home");

  const PAGE = "home";
  const SECTION = "hero";
  const FIELDS = [
  "section_visibility",
  "protocol",
  "protocol_icon",
  "media",
  "title_main",
  "title_accent",
  "tagline_before",
  "tagline_highlight",
  "tagline_after",
  "desc1",
  "desc2",
  "ctaParticipate",
  "ctaParticipate_signe",
  "ctaParticipate_link",
  "ctaLearnMore",
  "ctaLearnMore_signe",
  "ctaLearnMore_link",
  ];

  const DEFAULT_VALUES = {section_visibility:"",
        section_visibility_is_active: 1,

        protocol:"",
        protocol_is_active: 1,

        protocol_icon: "",
        protocol_icon_is_active: 1,

        media:"",
        media_is_active: 1,

        title_main:"",
        title_main_is_active: 1,

        title_accent:"",
        title_accent_is_active: 1,

        tagline_before:"",
        tagline_before_is_active: 1,

        tagline_highlight:"",
        tagline_highlight_is_active: 1,

        tagline_after:"",
        tagline_after_is_active: 1,

        desc1:"",
        desc1_is_active: 1,

        desc2:"",
        desc2_is_active: 1,

        ctaParticipate:"",
        ctaParticipate_is_active: 1,

        ctaParticipate_signe:"",
        ctaParticipate_signe_is_active: 1,

        ctaParticipate_link:"",
        ctaParticipate_link_is_active: 1,        

        ctaLearnMore:"",
        ctaLearnMore_is_active: 1,

        ctaLearnMore_signe:"",
        ctaLearnMore_signe_is_active: 1,

        ctaLearnMore_link:"",
        ctaLearnMore_link_is_active: 1};

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
    fileFields: ["media", "protocol_icon", "ctaParticipate_signe", "ctaLearnMore_signe"],
    successMessage: "Section Hero mise à jour",
  });
  const orderIndexByKey = Object.fromEntries(FIELDS.map((k, i) => [k, i]));


    return(
        <section>
            <form onSubmit={ handleSubmit } className="p-[50px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
                
                {/***** Titre du formulaire *****/}
                <CmsFormHeader title="Gestion de la Section Hero" toggleName="section_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>

                <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">

                    {/* Gestion du protocol */}
                    <CmsBlock>
                        
                        <CmsTitleBlock title="Gestion du protocol"/>
                        
                        <CmsFieldsBlock>
                            <CmsInput name="protocol" label="Protocol" value={values.protocol} onChange={handleChange} placeholder={t("hero.protocol")}   rightSlot={
                                <CmsHideToggle name="protocol" value={values.protocol_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} order_index={orderIndexByKey.protocol} />}
                            />

                            <CmsInputImage name="protocol_icon" label="Icon du protocol" valueUrl={values.protocol_icon} onChange={handleChange} rightSlot={
                                <CmsHideToggle name="protocol_icon" value={values.protocol_icon_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />
                        </CmsFieldsBlock>

                    </CmsBlock>

                    {/* Gestion de la video ou image */}
                    <CmsBlock>
                        
                        <CmsTitleBlock title="Gestion de la vidéo ou de l'image du fond"/>
                        
                        <CmsFieldsBlock>
                            <CmsInputFile name="media" label="Média du fond (vidéo / gif / image)" accept="video/*,image/*" value={values.media} valueUrl={values.media} onChange={handleChange} />
                        </CmsFieldsBlock>

                    </CmsBlock>


                    {/* Gestion des Titres */}
                    <CmsBlock>

                        <CmsTitleBlock title="Gestion du titre"/>

                        <CmsFieldsBlock>
                            {/* Gestion du titre principal en blanc */}
                            < CmsInput name="title_main" label="Titre principal en Blanc" value={values.title_main} onChange={handleChange} placeholder={t("hero.title_main")} rightSlot={
                                <CmsHideToggle name="title_main" value={values.title_main_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            {/* Gestion du titre accent ou sécondaire en dégradé */}
                            < CmsInput name="title_accent" label="Titre accent en dégradé" value={values.title_accent} onChange={handleChange} placeholder={t("hero.title_accent")} rightSlot={
                                <CmsHideToggle name="title_accent" value={values.title_accent_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />                            
                        </CmsFieldsBlock>

                    </CmsBlock>

                    {/* Gestion du slogan */}
                    <CmsBlock>

                        <CmsTitleBlock title="Gestion du slogan"/>

                        <CmsFieldsBlock>
                            < CmsInput name="tagline_before" label="Slogan (avant le point culminant en dégradé)" value={values.tagline_before} onChange={handleChange} placeholder={t("hero.tagline_before")} rightSlot={
                                <CmsHideToggle name="tagline_before" value={values.tagline_before_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            < CmsInput name="tagline_highlight" label="Slogan (point culminant en dégradé)" value={values.tagline_highlight} onChange={handleChange} placeholder={t("hero.tagline_highlight")} rightSlot={
                                <CmsHideToggle name="tagline_highlight" value={values.tagline_highlight_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            < CmsInput name="tagline_after" label="Slogan (aprés le point culminant en dégradé)" value={values.tagline_after} onChange={handleChange} placeholder={t("hero.tagline_after")} rightSlot={
                                <CmsHideToggle name="tagline_after" value={values.tagline_after_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />                            
                        </CmsFieldsBlock>

                    </CmsBlock>

                    {/* Gestion de la Déscription */}
                    <CmsBlock>

                        <CmsTitleBlock title="Gestion de la déscription"/>                       

                        <CmsFieldsBlock>

                            {/* Gestion de la déscription ligne 1 */}

                            < CmsInput name="desc1" label="Description (ligne 1)" value={values.desc1} onChange={handleChange} placeholder={t("hero.desc1")} rightSlot={
                                <CmsHideToggle name="desc1" value={values.desc1_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />                 

                            {/* Gestion de la déscription ligne 2 */}

                            <CmsInput name="desc2" label="Description (ligne 2)" value={values.desc2} onChange={handleChange} placeholder={t("hero.desc2")} rightSlot={
                                <CmsHideToggle name="desc2" value={values.desc2_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                        </CmsFieldsBlock>

                    </CmsBlock>

                    {/* Gestion des boutons */}
                    <CmsBlock>

                        <CmsTitleBlock title="Gestion des boutons"/>

                        <CmsBlock>

                            {/* Gestion du premier bouton */}
                            <CmsBlock>

                                <CmsSubtitleBlock title="Gestion du premier bouton" toggleName="ctaParticipate" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                                <CmsFieldsBlock>
                                    <CmsInput name="ctaParticipate" label="Nom" value={values.ctaParticipate} onChange={handleChange} placeholder={t("hero.ctaParticipate")}/>

                                    <CmsInputImage name="ctaParticipate_signe" label="Signe du Premiér bouton" valueUrl={values.ctaParticipate_signe} onChange={handleChange} rightSlot={
                                        <CmsHideToggle name="ctaParticipate_signe" value={values.ctaParticipate_signe_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                                    />

                                    <CmsInput name="ctaParticipate_link" label="Lien du bouton" value={values.ctaParticipate_link} onChange={handleChange} placeholder={t("hero.ctaParticipate_link")} />
                                </CmsFieldsBlock>

                            </CmsBlock>

                            {/* Gestion du deuxiéme bouton */}
                            <CmsBlock>

                                <CmsSubtitleBlock title="Gestion du deuxiéme bouton" toggleName="ctaLearnMore" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                                
                                <CmsFieldsBlock>
                                    <CmsInput name="ctaLearnMore" label="Nom" value={values.ctaLearnMore} onChange={handleChange} placeholder={t("hero.ctaLearnMore")} />

                                    <CmsInputImage name="ctaLearnMore_signe" label="Signe du deuxiéme bouton" valueUrl={values.ctaLearnMore_signe} onChange={handleChange} rightSlot={
                                        <CmsHideToggle name="ctaLearnMore_signe" value={values.ctaLearnMore_signe_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                                    />

                                    <CmsInput name="ctaLearnMore_link" label="Lien du bouton" value={values.ctaLearnMore_link} onChange={handleChange} placeholder={t("hero.ctaLearnMore_link")} />                                    
                                </CmsFieldsBlock>

                            </CmsBlock>
                        </CmsBlock>
                    </CmsBlock>

                </div>

                <div className="w-full flex justify-center">
                    <BtnSubmitForm loading={submitLoading} className="flex h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                        Mettre à jour
                    </BtnSubmitForm>
                </div>

            </form>
        </section>
    )
}

export default SectionHeroForm