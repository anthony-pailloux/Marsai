import { useTranslation } from "react-i18next";
import SectionHero from "../components/Gallery/SectionHero.jsx";
import CountdownHero from "../components/Gallery/CountdownHero.jsx";
import GallerySearchBar from "../components/Gallery/GallerySearchBar.jsx";
import GalleryGridSection from "../components/Gallery/GalleryGridSection.jsx";
import { isSectionVisible, isVisible } from "../utils/isVisible.js";
import useCmsContent from "../hooks/useCmsContent.js";
import useGalleryPage from "../hooks/useGalleryPage.js";

export default function Gallery() {
  const { t, i18n } = useTranslation("gallery");
  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

  const pageG = "gallery";
  const countdown = "countdown";
  const hero = "hero";
  const grid = "grid";

  const { content } = useCmsContent(pageG, locale);
  const {
    query,
    setQuery,
    page,
    setPage,
    loading,
    err,
    pageItems,
    total,
    totalPages,
  } = useGalleryPage();

  return (
    <div className="text-neutral-900p-25 w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-10">
        {isSectionVisible(content, pageG, hero) && <SectionHero />}

        {isSectionVisible(content, pageG, countdown) && <CountdownHero />}

        {isSectionVisible(content, pageG, grid) && (
          <>
            {isVisible(content, pageG, grid, "search_visibility") && (
              <GallerySearchBar
                value={query}
                onChange={setQuery}
                placeholder={t("search.placeholder")}
              />
            )}

            {isVisible(content, pageG, grid, "films_grid_visibility") && (
              <section>
                <GalleryGridSection
                  loading={loading}
                  err={err}
                  pageItems={pageItems}
                  page={page}
                  totalPages={totalPages}
                  total={total}
                  t={t}
                  onPageChange={setPage}
                />
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
