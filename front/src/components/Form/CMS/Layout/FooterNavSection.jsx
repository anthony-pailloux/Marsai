import CmsInput from "../Fields/CmsInput";
import CmsHideToggle from "../Fields/CmsHideToggle";
import { NAV_SECTIONS } from "./footerFormConfig.js";

export default function FooterNavSection({
  values,
  handleChange,
  page,
  section,
  locale,
  t,
}) {
  return (
    <div className="flex flex-col pb-2.5 justify-start gap-7.5 self-stretch uppercase placeholder:uppercase w-full border-t-2 border-gray-600 pt-5">
      <div className="text-[16px] md:text-5 font-bold tracking-[3.2px] uppercase w-full">
        <h4 className="text-[16px] md:text-5 font-bold tracking-[3.2px] uppercase w-full">
          Gestion de la navigation
        </h4>
      </div>

      {NAV_SECTIONS.map((navSection) => (
        <div
          key={navSection.sectionField}
          className="flex flex-col pb-2.5 justify-start gap-5 self-stretch uppercase placeholder:uppercase w-full border-t-2 border-gray-300 pt-5"
        >
          <div className="flex flex-col md:flex-row pb-2.5 justify-start gap-5 self-stretch uppercase placeholder:uppercase w-full">
            <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
              {navSection.title}
            </h5>
            <CmsHideToggle
              name={navSection.sectionField}
              value={values[`${navSection.sectionField}_is_active`]}
              values={values}
              onChange={handleChange}
              page={page}
              section={section}
              locale={locale}
            />
          </div>

          <div>
            <CmsInput
              name={navSection.sectionField}
              label="Titre de section"
              value={values[navSection.sectionField]}
              onChange={handleChange}
              placeholder={t(navSection.sectionPlaceholderKey)}
            />
          </div>

          {navSection.links.map((link) => (
            <div
              key={link.prefix}
              className="flex flex-col gap-5 w-full border-t border-gray-300 pt-5"
            >
              <div className="flex items-center">
                <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">
                  Gestion du {link.rank} lien
                </h5>
                <CmsHideToggle
                  name={`links_${link.prefix}_label`}
                  value={values[`links_${link.prefix}_label_is_active`]}
                  values={values}
                  onChange={handleChange}
                  page={page}
                  section={section}
                  locale={locale}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <CmsInput
                  name={`links_${link.prefix}_label`}
                  label="Nom"
                  value={values[`links_${link.prefix}_label`]}
                  onChange={handleChange}
                  placeholder={t(link.labelKey)}
                />
                <CmsInput
                  name={`links_${link.prefix}_href`}
                  label="Lien"
                  value={values[`links_${link.prefix}_href`]}
                  onChange={handleChange}
                  placeholder={link.placeholderHref}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
