import { Link } from "react-router";
import { isVisible } from "../../utils/isVisible.js";
import { typeFooterQuote } from "../../utils/typography.js";

export default function FooterBrandSection({
  content,
  page,
  section,
  logoSrc,
  social,
}) {
  return (
    <div className="min-w-0 lg:col-span-1">
      {logoSrc ? (
        <Link to="/">
          <div className="w-32 shrink-0 md:w-36">
            <img
              src={logoSrc}
              alt="Logo"
              className="h-auto w-full"
              draggable={false}
            />
          </div>
        </Link>
      ) : null}

      {isVisible(content, page, section, "brand_quote") && (
        <p className={`mt-3 text-black/80 dark:text-white/80 ${typeFooterQuote}`}>
          {content?.[page]?.[section]?.brand_quote}
        </p>
      )}

      {isVisible(content, page, section, "social") && (
        <div className="mt-4 flex items-center gap-3">
          {social.map((i) => (
            <div key={i.alt}>
              {isVisible(content, page, section, `social_${i.label}_label`) && (
                <a
                  href={i.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-[#ECECEC] transition hover:scale-105 dark:border-[#FFFFFF]/60 dark:bg-[#FFFFFF]/5"
                >
                  <img
                    src={i.src}
                    alt={i.alt}
                    title={i.title}
                    className="h-5 w-5 object-contain invert dark:invert-0"
                  />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
