import { typeCaption } from "../../../utils/typography.js";

function CmsBreadcrumb({ pageLabel, sectionLabel }) {
    return (
        <div className={`text-black/50 dark:text-white/50 ${typeCaption}`}>
            CMS / {pageLabel ?? "—"} / {sectionLabel ?? "—"}
        </div>
    );
}

export default CmsBreadcrumb
