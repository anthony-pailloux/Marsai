import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { typeBodySm, typeEyebrow, typePageHero } from "../utils/typography.js";

export default function NotFound() {
  const { i18n } = useTranslation();
  const isFr = i18n.language?.startsWith("fr");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className={`text-black/50 dark:text-white/50 ${typeEyebrow}`}>
        404
      </p>
      <h1 className={typePageHero}>
        {isFr ? "Page introuvable" : "Page not found"}
      </h1>
      <p className={`max-w-md text-black/60 dark:text-white/60 ${typeBodySm}`}>
        {isFr
          ? "La page que vous cherchez n'existe pas ou a été déplacée."
          : "The page you are looking for does not exist or has been moved."}
      </p>
      <Link
        to="/"
        className="rounded-full bg-[#FF8C42] hover:bg-[#E07830] transition-colors px-6 py-3 text-sm font-extrabold text-white"
      >
        {isFr ? "Retour à l'accueil" : "Back to home"}
      </Link>
    </div>
  );
}
