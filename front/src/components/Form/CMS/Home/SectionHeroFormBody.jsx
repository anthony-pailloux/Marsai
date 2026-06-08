import { useMemo } from "react";
import CmsInput from "../Fields/CmsInput";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInputImage from "../Fields/CmsInputImage";
import CmsInputFile from "../Fields/CmsInputFile.jsx";
import CmsTitleBlock from "../Titles/CmsTitleBlock.jsx";
import CmsSubtitleBlock from "../Titles/CmsSubtitleBlock.jsx";
import CmsBlock from "../Titles/CmsBlock.jsx";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock.jsx";
import { HERO_CTAS, HERO_FIELDS } from "./heroFormConfig.js";

export default function SectionHeroFormBody({
  t,
  values,
  handleChange,
  page,
  section,
  locale,
}) {
  const orderIndexByKey = useMemo(
    () => Object.fromEntries(HERO_FIELDS.map((k, i) => [k, i])),
    [],
  );

  return (
    <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
      <CmsBlock>
        <CmsTitleBlock title="Gestion du protocol" />
        <CmsFieldsBlock>
          <CmsInput
            name="protocol"
            label="Protocol"
            value={values.protocol}
            onChange={handleChange}
            placeholder={t("hero.protocol")}
            rightSlot={
              <CmsHideToggle
                name="protocol"
                value={values.protocol_is_active}
                values={values}
                onChange={handleChange}
                page={page}
                section={section}
                locale={locale}
                order_index={orderIndexByKey.protocol}
              />
            }
          />
          <CmsInputImage
            name="protocol_icon"
            label="Icon du protocol"
            valueUrl={values.protocol_icon}
            onChange={handleChange}
            rightSlot={
              <CmsHideToggle
                name="protocol_icon"
                value={values.protocol_icon_is_active}
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
        <CmsTitleBlock title="Gestion de la vidéo ou de l'image du fond" />
        <CmsFieldsBlock>
          <CmsInputFile
            name="media"
            label="Média du fond (vidéo / gif / image)"
            accept="video/*,image/*"
            value={values.media}
            valueUrl={values.media}
            onChange={handleChange}
          />
        </CmsFieldsBlock>
      </CmsBlock>

      <CmsBlock>
        <CmsTitleBlock title="Gestion du titre" />
        <CmsFieldsBlock>
          <CmsInput
            name="title_main"
            label="Titre principal en Blanc"
            value={values.title_main}
            onChange={handleChange}
            placeholder={t("hero.title_main")}
            rightSlot={
              <CmsHideToggle
                name="title_main"
                value={values.title_main_is_active}
                values={values}
                onChange={handleChange}
                page={page}
                section={section}
                locale={locale}
              />
            }
          />
          <CmsInput
            name="title_accent"
            label="Titre accent en dégradé"
            value={values.title_accent}
            onChange={handleChange}
            placeholder={t("hero.title_accent")}
            rightSlot={
              <CmsHideToggle
                name="title_accent"
                value={values.title_accent_is_active}
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
        <CmsTitleBlock title="Gestion du slogan" />
        <CmsFieldsBlock>
          {["tagline_before", "tagline_highlight", "tagline_after"].map((name) => (
            <CmsInput
              key={name}
              name={name}
              label={
                name === "tagline_before"
                  ? "Slogan (avant le point culminant en dégradé)"
                  : name === "tagline_highlight"
                    ? "Slogan (point culminant en dégradé)"
                    : "Slogan (aprés le point culminant en dégradé)"
              }
              value={values[name]}
              onChange={handleChange}
              placeholder={t(`hero.${name}`)}
              rightSlot={
                <CmsHideToggle
                  name={name}
                  value={values[`${name}_is_active`]}
                  values={values}
                  onChange={handleChange}
                  page={page}
                  section={section}
                  locale={locale}
                />
              }
            />
          ))}
        </CmsFieldsBlock>
      </CmsBlock>

      <CmsBlock>
        <CmsTitleBlock title="Gestion de la déscription" />
        <CmsFieldsBlock>
          {["desc1", "desc2"].map((name) => (
            <CmsInput
              key={name}
              name={name}
              label={`Description (ligne ${name === "desc1" ? 1 : 2})`}
              value={values[name]}
              onChange={handleChange}
              placeholder={t(`hero.${name}`)}
              rightSlot={
                <CmsHideToggle
                  name={name}
                  value={values[`${name}_is_active`]}
                  values={values}
                  onChange={handleChange}
                  page={page}
                  section={section}
                  locale={locale}
                />
              }
            />
          ))}
        </CmsFieldsBlock>
      </CmsBlock>

      <CmsBlock>
        <CmsTitleBlock title="Gestion des boutons" />
        <CmsBlock>
          {HERO_CTAS.map((cta) => (
            <CmsBlock key={cta.key}>
              <CmsSubtitleBlock
                title={cta.subtitle}
                toggleName={cta.toggleName}
                values={values}
                handleChange={handleChange}
                page={page}
                section={section}
                locale={locale}
              />
              <CmsFieldsBlock>
                <CmsInput
                  name={cta.key}
                  label="Nom"
                  value={values[cta.key]}
                  onChange={handleChange}
                  placeholder={t(`hero.${cta.key}`)}
                />
                <CmsInputImage
                  name={`${cta.key}_signe`}
                  label={cta.signeLabel}
                  valueUrl={values[`${cta.key}_signe`]}
                  onChange={handleChange}
                  rightSlot={
                    <CmsHideToggle
                      name={`${cta.key}_signe`}
                      value={values[`${cta.key}_signe_is_active`]}
                      values={values}
                      onChange={handleChange}
                      page={page}
                      section={section}
                      locale={locale}
                    />
                  }
                />
                <CmsInput
                  name={`${cta.key}_link`}
                  label="Lien du bouton"
                  value={values[`${cta.key}_link`]}
                  onChange={handleChange}
                  placeholder={t(`hero.${cta.key}_link`)}
                />
              </CmsFieldsBlock>
            </CmsBlock>
          ))}
        </CmsBlock>
      </CmsBlock>
    </div>
  );
}
