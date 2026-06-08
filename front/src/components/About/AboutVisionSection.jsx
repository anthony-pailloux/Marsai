import { typeSectionHeading } from "../../utils/typography.js";
import { HOME_CARD_BODY } from "../Home/homeCardStyles.js";

export default function AboutVisionSection({ t }) {
  return (
    <section className={`mt-14 ${HOME_CARD_BODY}`}>
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/10 text-brand">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3l9 4.5-9 4.5-9-4.5L12 3z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M3 7.5V17l9 4.5 9-4.5V7.5"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <h2 className={typeSectionHeading}>{t("vision.title")}</h2>
      </div>

      <div className="mt-6 space-y-3 text-sm leading-relaxed text-neutral-700 dark:text-white/70">
        <p>{t("vision.p1")}</p>
        <p>{t("vision.p2")}</p>
        <p>{t("vision.p3")}</p>
      </div>
    </section>
  );
}
