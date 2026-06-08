import { typeBodySm, typeCaption, typeEyebrow } from "../../../utils/typography.js";

function CmsSectionTabs({ sections, activeSectionId, onSelectSection }) {
    return (
        <div className="mb-6">
            <div className={`mb-2 text-black/60 dark:text-white/60 ${typeEyebrow}`}>
                Sections
            </div>

            {/* scroll horizontal sur mobile */}
            <div className="flex gap-2 overflow-x-auto pb-2">

                {sections.length ? (

                    sections.map((s) => {

                        const active = s.id === activeSectionId;

                        return (
                            <button key={s.id} type="button" onClick={() => onSelectSection(s.id)}
                                className={[
                                    "shrink-0 px-4 py-2 rounded-full border transition",
                                    typeBodySm,
                                    active ? "bg-black/10 dark:bg-white/10 font-semibold border-black/10 dark:border-white/10" : "bg-transparent border-black/15 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5",
                                    "text-black dark:text-white",
                                ].join(" ")}
                            >
                                {s.label}
                            </button>
                        );

                    })

                ) : (

                    <div className={`text-black/50 dark:text-white/50 ${typeCaption}`}>
                        Pas encore de sections configurées pour cette page.
                    </div>
                    
                )}

            </div>
        </div>
    );
}

export default CmsSectionTabs;