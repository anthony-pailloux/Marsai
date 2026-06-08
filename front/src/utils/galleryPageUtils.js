export const GALLERY_PAGE_SIZE = 20;

export function filterGalleryVideos(items, query) {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  return items.filter((v) => {
    const title = String(v.title || v.title_en || "").toLowerCase();
    const director =
      `${v.director_name || ""} ${v.director_lastname || ""}`.toLowerCase();
    const country = String(v.country || v.director_country || "").toLowerCase();

    return title.includes(q) || director.includes(q) || country.includes(q);
  });
}

export function paginateItems(items, page, pageSize = GALLERY_PAGE_SIZE) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    total,
    totalPages,
    page: safePage,
    pageItems: items.slice(start, start + pageSize),
  };
}
