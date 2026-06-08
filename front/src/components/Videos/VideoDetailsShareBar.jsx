import { CopyIcon, SocialItem } from "./VideoDetailsParts.jsx";
import { typeBadge, typeEyebrow } from "../../utils/typography.js";

const SOCIAL_LINKS = [
  { key: "x", href: "https://x.com" },
  { key: "linkedin", href: "https://www.linkedin.com" },
  { key: "instagram", href: "https://www.instagram.com" },
  { key: "youtube", href: "https://www.youtube.com" },
  { key: "facebook", href: "https://www.facebook.com" },
];

export default function VideoDetailsShareBar({
  social,
  directLinkLabel,
  directLink,
  copied,
  copiedLabel,
  copyLabel,
  onCopy,
}) {
  return (
    <div className="mt-10 flex flex-wrap items-end gap-8">
      <div className="flex flex-wrap gap-5">
        {SOCIAL_LINKS.map(({ key, href }) => (
          <SocialItem
            key={key}
            label={social?.[key]?.label}
            icon={social?.[key]?.icon}
            href={href}
          />
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-2 sm:ml-6">
        <div className={`text-neutral-500 dark:text-white/50 ${typeEyebrow}`}>
          {directLinkLabel}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <code
            className={`break-all rounded-xl bg-neutral-50 px-3 py-2 text-neutral-800 ring-1 ring-neutral-200 dark:bg-white/10 dark:text-white/85 dark:ring-white/10 ${typeBadge}`}
          >
            {directLink}
          </code>

          <button
            type="button"
            onClick={onCopy}
            className={`inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2 text-white shadow-sm dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-white/10 ${typeBadge}`}
          >
            <CopyIcon />
            {copied ? copiedLabel : copyLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
