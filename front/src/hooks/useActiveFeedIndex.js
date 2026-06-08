import { useEffect, useState } from "react";

/** Index de la slide visible dans un conteneur scroll-snap. */
export default function useActiveFeedIndex(containerRef, itemCount) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll("[data-snap-item]"));
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (!visible) return;
        const idx = Number(visible.target.getAttribute("data-index") || 0);
        setActive(idx);
      },
      { root, threshold: [0.55, 0.7, 0.85] },
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [containerRef, itemCount]);

  return [active, setActive];
}
