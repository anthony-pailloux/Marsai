import { Link } from "react-router";
import AdminEntryButton from "./AdminEntryButton.jsx";
import { typeFooterMeta } from "../../utils/typography.js";

export default function FooterBottomBar({ t }) {
  return (
    <>
      <div className="mt-6 h-px w-full bg-black/20 md:mt-8 dark:bg-[#FFFFFF]/20" />

      <div className="mt-4 flex w-full flex-col items-center justify-between gap-3 opacity-70 md:mt-5 md:flex-row">
        <span className={`w-full text-center md:text-left ${typeFooterMeta}`}>
          {t("bottom.copyright")}
        </span>

        <div className="flex w-full flex-col items-center justify-end gap-3 md:flex-row md:gap-6">
          <span className={typeFooterMeta}>{t("designSystem")}</span>

          <Link to="/legal" className={typeFooterMeta}>
            {t("links.legal")}
          </Link>

          <AdminEntryButton />
        </div>
      </div>
    </>
  );
}
