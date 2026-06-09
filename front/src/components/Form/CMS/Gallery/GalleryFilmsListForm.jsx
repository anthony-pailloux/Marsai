import CmsFormHeader from "../Titles/CmsFormHeader";
import CmsBlock from "../Titles/CmsBlock";
import CmsTitleBlock from "../Titles/CmsTitleBlock";
import useCmsSectionForm from "../../../../hooks/useCmsSectionForm.js";
import CmsSubmitFooter from "../Fields/CmsSubmitFooter.jsx";


function GalleryFilmsListForm({ forcedLocale }) {
  const PAGE = "gallery";
  const SECTION = "grid";
  const FIELDS = [
  "section_visibility",
  "search_visibility",
  "films_grid_visibility",
  ];

  const DEFAULT_VALUES = {section_visibility: "",
        section_visibility_is_active: 1,

        search_visibility: "",
        search_visibility_is_active: 1,

        films_grid_visibility: "",
        films_grid_visibility_is_active: 1};

  const {
    page,
    section,
    locale,
    values,
    handleChange,
    submitLoading,
    toastScope,
    handleSubmit,
  } = useCmsSectionForm({
    page: PAGE,
    section: SECTION,
    fields: FIELDS,
    defaultValues: DEFAULT_VALUES,
    forcedLocale,
    successMessage: "Section mise Ã  jour",
  });


    return(
        <section>
            <form onSubmit={ handleSubmit } className="p-12.5 flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit]">
                {/***** Titre du formulaire : Gestion de la Section Palmares *****/}
                <CmsFormHeader title="Gestion de la Section liste des films" toggleName="section_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>

                <CmsBlock>
                    <CmsTitleBlock title="Gestion de la barre de recherche" toggleName="search_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>
                </CmsBlock>

                <CmsBlock>
                    <CmsTitleBlock title="Gestion de la grille de films" toggleName="films_grid_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>
                </CmsBlock>

                <CmsSubmitFooter
                  toastScope={toastScope}
                  submitLoading={submitLoading}
                />
            </form>
        </section>
    )
}

export default GalleryFilmsListForm