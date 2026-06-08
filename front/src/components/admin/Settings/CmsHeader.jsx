import CmsLanguageTabs from "./CmsLanguageTabs";
import CmsBreadcrumb from "./CmsBreadcrumb";
import { typeAdminMeta, typeAdminSection } from "../../../utils/typography.js";

function CmsHeader({ activePageLabel, activeSectionLabel, forcedLocale, onLocaleChange }) {
    return (
        <div className="mb-6 flex flex-col gap-3">

            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">

                <div>
                    <h1 className={`text-black dark:text-white ${typeAdminSection}`}>
                        CMS · Settings
                    </h1>
                    <p className={typeAdminMeta}>
                        Choisis une page, une section, puis édite le contenu en FR/EN.
                    </p>
                </div>

                <CmsLanguageTabs value={forcedLocale} onChange={onLocaleChange} />

            </div>

            <CmsBreadcrumb pageLabel={activePageLabel} sectionLabel={activeSectionLabel} />

        </div>
    );
}

export default CmsHeader