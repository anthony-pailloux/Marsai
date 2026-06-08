import { typeBody, typeSectionSubtitle } from "../../utils/typography.js";

export default function LearnMoreInfoCard({ title, children, icon }) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white/70 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start gap-8 p-8">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-black/5 bg-black/[0.03] dark:border-white/10 dark:bg-white/5">
          <img src={icon} alt="" className="h-20 w-20 object-contain" />
        </div>

        <div className="min-w-0">
          <h3 className={`text-black dark:text-white ${typeSectionSubtitle}`}>
            {title}
          </h3>

          <div className={`mt-4 text-black/70 dark:text-white/70 ${typeBody}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
