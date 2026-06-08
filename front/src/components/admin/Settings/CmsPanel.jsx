import { typeAdminMeta, typeAdminSection } from "../../../utils/typography.js";

function CmsPanel({ pageLabel, sectionLabel, forcedLocale, children }) {
    return(
        <div className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5 md:p-6">
            
            <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                    <h2 className={`text-black dark:text-white ${typeAdminSection}`}>
                        {pageLabel ?? "—"} · {sectionLabel ?? "—"}
                    </h2>
                    <p className={typeAdminMeta}>
                        Langue d’édition : <span className="font-semibold">{forcedLocale.toUpperCase()}</span>
                    </p>
                </div>
            </div>

            {children}

        </div>
    )
}

export default CmsPanel