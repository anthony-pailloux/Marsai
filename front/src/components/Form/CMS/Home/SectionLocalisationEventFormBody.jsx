import CmsInput from "../Fields/CmsInput.jsx";
import CmsHideToggle from "../Fields/CmsHideToggle.jsx";
import CmsInputImage from "../Fields/CmsInputImage.jsx";
import CmsInputColor from "../Fields/CmsImputColor.jsx";
import CmsTitleBlock from "../Titles/CmsTitleBlock.jsx";
import CmsBlock from "../Titles/CmsBlock.jsx";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock.jsx";
import CmsFieldsRow from "../Titles/CmsFieldsRow.jsx";
import CmsSubtitleBlock from "../Titles/CmsSubtitleBlock.jsx";
import LocalisationSpaceCardEditor from "./LocalisationSpaceCardEditor.jsx";
import { LOCALISATION_SPACES } from "./localisationEventFormConfig.js";

export default function SectionLocalisationEventFormBody({
  t,
  values,
  handleChange,
  page,
  section,
  locale,
}) {
  return (
    <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
      <CmsBlock>
        <CmsTitleBlock
          title="Gestion du sur-titre"
          toggleName="eyebrow"
          values={values}
          handleChange={handleChange}
          page={page}
          section={section}
          locale={locale}
        />
        <CmsFieldsBlock>
          <CmsInput
            name="eyebrow"
            label="Nom"
            value={values.eyebrow}
            onChange={handleChange}
            placeholder={t("localisationEvent.eyebrow")}
          />
          <CmsInputImage
            name="eyebrow_icon"
            label="Icon"
            valueUrl={values.eyebrow_icon}
            onChange={handleChange}
            rightSlot={
              <CmsHideToggle
                name="eyebrow_icon"
                value={values.eyebrow_icon_is_active}
                values={values}
                onChange={handleChange}
                page={page}
                section={section}
                locale={locale}
              />
            }
          />
        </CmsFieldsBlock>
      </CmsBlock>

      <CmsBlock>
        <CmsTitleBlock title="Gestion des adresse et mode d'accés" />
        <CmsBlock>
          <CmsSubtitleBlock
            title="Gestion de la ville"
            toggleName="venue_cityTagline"
            values={values}
            handleChange={handleChange}
            page={page}
            section={section}
            locale={locale}
          />
          <CmsFieldsRow>
            <CmsInput
              name="venue_cityTagline"
              label="Nom"
              value={values.venue_cityTagline}
              onChange={handleChange}
              placeholder={t("localisationEvent.venue.cityTagline")}
            />
            <CmsInputColor
              name="venue_color"
              label=""
              value={values.venue_color}
              onChange={handleChange}
            />
          </CmsFieldsRow>
        </CmsBlock>
        <CmsBlock>
          <CmsSubtitleBlock
            title="Gestion de l' adresse"
            toggleName="address_street"
            values={values}
            handleChange={handleChange}
            page={page}
            section={section}
            locale={locale}
          />
          <CmsFieldsRow>
            <CmsInput
              name="address_street"
              label="Rue"
              value={values.address_street}
              onChange={handleChange}
              placeholder={t("localisationEvent.address.street")}
            />
            <CmsInput
              name="address_postalCode"
              label="Code postal"
              value={values.address_postalCode}
              onChange={handleChange}
              placeholder={t("localisationEvent.address.postalCode")}
            />
            <CmsInput
              name="address_city"
              label="Ville"
              value={values.address_city}
              onChange={handleChange}
              placeholder={t("localisationEvent.address.city")}
            />
          </CmsFieldsRow>
        </CmsBlock>
        <CmsBlock>
          <CmsSubtitleBlock
            title="Gestion du mode d'accés"
            toggleName="access_tram"
            values={values}
            handleChange={handleChange}
            page={page}
            section={section}
            locale={locale}
          />
          <CmsFieldsRow>
            <CmsInput
              name="access_tram"
              label="Mode"
              value={values.access_tram}
              onChange={handleChange}
              placeholder={t("localisationEvent.access.tram")}
            />
          </CmsFieldsRow>
        </CmsBlock>
      </CmsBlock>

      <CmsBlock>
        <CmsTitleBlock title="Gestion des cartes" />
        {LOCALISATION_SPACES.map((spaceIndex) => (
          <LocalisationSpaceCardEditor
            key={spaceIndex}
            spaceIndex={spaceIndex}
            values={values}
            handleChange={handleChange}
            page={page}
            section={section}
            locale={locale}
            t={t}
          />
        ))}
      </CmsBlock>

      <CmsBlock>
        <CmsTitleBlock
          title="Gestion de Google Maps"
          toggleName="maps_link"
          values={values}
          handleChange={handleChange}
          page={page}
          section={section}
          locale={locale}
        />
        <CmsBlock>
          <CmsInput
            name="maps_link"
            label="Lien"
            value={values.maps_link}
            onChange={handleChange}
            placeholder={t("localisationEvent.maps.link")}
          />
        </CmsBlock>
      </CmsBlock>
    </div>
  );
}
