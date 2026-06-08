import CmsInput from "../Fields/CmsInput";
import CmsInputImage from "../Fields/CmsInputImage";
import CmsHideToggle from "../Fields/CmsHideToggle";
import { SOCIAL_NETWORKS } from "./footerFormConfig.js";

export default function FooterSocialSection({
  values,
  handleChange,
  page,
  section,
  locale,
  t,
}) {
  return (
    <div className="flex flex-col pb-2.5 justify-start gap-7.5 self-stretch uppercase placeholder:uppercase w-full border-t-2 border-gray-300 pt-5">
      <div className="flex items-center">
        <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
          Gestion des liens sociaux
        </h5>
        <CmsHideToggle
          name="social"
          value={values.social_is_active}
          values={values}
          onChange={handleChange}
          page={page}
          section={section}
          locale={locale}
        />
      </div>

      {SOCIAL_NETWORKS.map((network) => (
        <div
          key={network.key}
          className="flex flex-col gap-5 border-t border-gray-300 pt-5"
        >
          <div className="flex">
            <h6 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
              {network.title}
            </h6>
            <CmsHideToggle
              name={`social_${network.key}_label`}
              value={values[`social_${network.key}_label_is_active`]}
              values={values}
              onChange={handleChange}
              page={page}
              section={section}
              locale={locale}
            />
          </div>
          <div className="flex flex-col gap-5">
            <CmsInputImage
              name={`social_${network.key}_icon`}
              label="Icon"
              valueUrl={values[`social_${network.key}_icon`]}
              onChange={handleChange}
              page={page}
              section={section}
              locale={locale}
            />
            <div className="flex flex-col md:flex-row gap-5">
              <CmsInput
                name={`social_${network.key}_label`}
                label="Nom"
                value={values[`social_${network.key}_label`]}
                onChange={handleChange}
                placeholder={t(network.labelKey)}
              />
              <CmsInput
                name={`social_${network.key}_href`}
                label="Lien"
                value={values[`social_${network.key}_href`]}
                onChange={handleChange}
                placeholder={network.placeholderHref}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
