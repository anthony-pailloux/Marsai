import { typeSectionCaption, typeSectionHeading } from "../../utils/typography.js";
import { HOME_CARD_COMPACT } from "../Home/homeCardStyles.js";
import { ABOUT_WORKFLOW_STEPS } from "./aboutPageConfig.js";

export default function AboutWorkflowSection({ t }) {
  return (
    <section className="mt-14">
      <h2 className={typeSectionHeading}>{t("workflow.title")}</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ABOUT_WORKFLOW_STEPS.map((x) => (
          <div key={x.key} className={HOME_CARD_COMPACT}>
            <div
              className={`text-neutral-500 dark:text-white/50 ${typeSectionCaption}`}
            >
              {x.n}
            </div>
            <div className="mt-2 text-sm font-bold">{t(`workflow.${x.key}`)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
