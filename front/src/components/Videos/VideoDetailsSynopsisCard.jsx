import { IconImg } from "./VideoDetailsParts.jsx";
import { typeBadge, typeBody, typeEyebrow } from "../../utils/typography.js";

export default function VideoDetailsSynopsisCard({
  icons,
  synopsisLabel,
  techStackLabel,
  synopsis,
  aiTags,
}) {
  return (
    <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-3 text-[#EF4444]">
        <IconImg
          src={icons.book}
          alt={synopsisLabel}
          className="!h-9 !w-9"
          scale={2.2}
        />
        <h2 className={typeEyebrow}>{synopsisLabel}</h2>
      </div>

      <p
        className={`mt-4 max-w-3xl text-neutral-700 dark:text-white/70 ${typeBody}`}
      >
        {synopsis || "—"}
      </p>

      <div className="mt-8 flex items-center gap-3 text-[#3B82F6]">
        <IconImg
          src={icons.chip}
          alt={techStackLabel}
          className="!h-9 !w-9"
          scale={2.2}
        />
        <h3 className={typeEyebrow}>{techStackLabel}</h3>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {aiTags.length ? (
          aiTags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full bg-neutral-900 px-4 py-1.5 text-white dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-white/10 ${typeBadge}`}
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="text-sm text-neutral-500 dark:text-white/60">—</span>
        )}
      </div>
    </div>
  );
}
