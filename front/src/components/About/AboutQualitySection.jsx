import { typeSectionHeading } from "../../utils/typography.js";
import { HOME_CARD_BODY } from "../Home/homeCardStyles.js";
import { ABOUT_QUALITY_ITEMS } from "./aboutPageConfig.js";

export default function AboutQualitySection({ t }) {
  return (
    <section className={`mt-14 ${HOME_CARD_BODY}`}>
      <h2 className={typeSectionHeading}>{t("quality.title")}</h2>

      <div className="mt-6 grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-white/70 md:grid-cols-3">
        {ABOUT_QUALITY_ITEMS.map((item) => (
          <div key={item.key} className="flex gap-3">
            <span className="mt-[2px]">{item.icon}</span>
            <p>{t(`quality.${item.key}`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
