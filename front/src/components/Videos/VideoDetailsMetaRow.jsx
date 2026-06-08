import { PillIcon, IconImg } from "./VideoDetailsParts.jsx";
import { typeBadge, typeBodySm, typeEyebrow } from "../../utils/typography.js";

export default function VideoDetailsMetaRow({
  icons,
  directorLabel,
  director,
  originLabel,
  country,
  isSelector,
  onOpenReview,
}) {
  return (
    <div className="mt-6 flex flex-wrap items-start gap-10">
      <div className="flex items-start gap-4">
        <PillIcon>
          <IconImg
            src={icons.user}
            alt={directorLabel}
            className="!h-9 !w-9"
            scale={2.35}
          />
        </PillIcon>

        <div className="flex flex-col gap-1 leading-none">
          <div className={`text-neutral-500 dark:text-white/50 ${typeEyebrow}`}>
            {directorLabel}
          </div>
          <div
            className={`font-semibold text-neutral-900 dark:text-white ${typeBodySm}`}
          >
            {director || "—"}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <PillIcon>
          <IconImg
            src={icons.globe}
            alt={originLabel}
            className="!h-9 !w-9"
            scale={2.35}
          />
        </PillIcon>

        <div className="flex flex-col gap-1 leading-none">
          <div className={`text-neutral-500 dark:text-white/50 ${typeEyebrow}`}>
            {originLabel}
          </div>

          <div className="flex items-center gap-2">
            <IconImg
              src={icons.globe}
              alt=""
              className="block !h-6 !w-6"
              scale={1}
            />
            <div
              className={`font-semibold text-neutral-900 dark:text-white ${typeBodySm}`}
            >
              {country}
            </div>
          </div>

          {isSelector ? (
            <button
              type="button"
              onClick={onOpenReview}
              className={`mt-3 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2 text-white shadow-sm transition hover:opacity-90 dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-white/10 ${typeBadge}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 17l-5.878 3.09 1.122-6.545L2.49 8.91l6.566-.955L12 2l2.944 5.955 6.566.955-4.755 4.635 1.122 6.545L12 17z"
                  fill="currentColor"
                />
              </svg>
              Noter
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
