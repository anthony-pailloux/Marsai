import { typeSectionCaption, typeStat } from "../../utils/typography.js";
import { HOME_CARD_COMPACT } from "../Home/homeCardStyles.js";
import { ABOUT_STATS } from "./aboutPageConfig.js";

export default function AboutStatsSection({ t }) {
  return (
    <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ABOUT_STATS.map((s) => (
        <div key={s.k} className={HOME_CARD_COMPACT}>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-neutral-100 text-lg dark:bg-white/10">
              {s.icon}
            </div>
            <div className="min-w-0">
              <div className={`leading-none ${typeStat}`}>{s.v}</div>
              <div
                className={`mt-1 text-neutral-600 dark:text-white/60 ${typeSectionCaption}`}
              >
                {t(`stats.${s.k}`)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
