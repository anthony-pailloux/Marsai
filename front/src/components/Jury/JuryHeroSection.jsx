import { isSectionVisible, isVisible } from "../../utils/isVisible.js";
import { typePageHero, typePageHeroDesc } from "../../utils/typography.js";

export default function JuryHeroSection({ content, page, hero, t }) {
  if (!isSectionVisible(content, page, hero)) return null;

  return (
    <section className="flex flex-col gap-10">
      <h1 className={typePageHero}>
        {isVisible(content, page, hero, "title_main") && (
          <span className="block text-black dark:text-white">
            {content?.[page]?.[hero]?.title_main || t("titleLine1")}
          </span>
        )}
        {isVisible(content, page, hero, "title_accent") && (
          <span className="block text-brand">
            {content?.[page]?.[hero]?.title_accent || t("titleLine2")}
          </span>
        )}
      </h1>

      {isVisible(content, page, hero, "description") && (
        <p className={typePageHeroDesc}>
          {content?.[page]?.[hero]?.description}
        </p>
      )}
    </section>
  );
}
