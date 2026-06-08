import { Link } from "react-router-dom";
import { PlayOverlay } from "./VideoDetailsParts.jsx";
import { typeBadge } from "../../utils/typography.js";

export default function VideoDetailsHeader({
  backLabel,
  coverUrl,
  streamUrl,
}) {
  return (
    <>
      <div className="mb-6">
        <Link
          to="/gallery"
          className={`inline-flex items-center gap-2 rounded-full bg-[#FF8C42] px-5 py-2 text-white shadow-sm transition-colors hover:bg-[#E07830] ${typeBadge}`}
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {backLabel}
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl bg-black shadow-sm ring-1 ring-black/5 dark:ring-white/10">
        <div className="relative">
          <video
            controls
            preload="metadata"
            poster={coverUrl}
            src={streamUrl}
            className="aspect-[16/9] w-full"
          />
          <PlayOverlay />
        </div>
      </div>
    </>
  );
}
