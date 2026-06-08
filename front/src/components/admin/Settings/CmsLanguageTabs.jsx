import englishFlag from "../../../assets/imgs/icones/englishFlag.png";
import frenchFlag from "../../../assets/imgs/icones/franceFlag.png";
import { typeBodySm } from "../../../utils/typography.js";

function CmsLanguageTabs({ value, onChange }) {
    return(
        <div className="flex">
            <button type="button" onClick={() => onChange("fr")}
                className={[ "px-4 py-2 rounded-full border transition flex items-center gap-[3px]", typeBodySm,
                    value === "fr" ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white" : "bg-transparent text-black border-black/15 hover:bg-black/5 dark:text-white dark:border-white/20 dark:hover:bg-white/5", 
                ].join(" ")}
            >
                <img src={frenchFlag} alt="" className="h-[10px]"/>
                <span className="block">FR</span>
            </button>

            <button type="button" onClick={() => onChange("en")}
                className={[ "px-4 py-2 rounded-full border transition flex items-center gap-[3px]", typeBodySm,
                    value === "en" ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white" : "bg-transparent text-black border-black/15 hover:bg-black/5 dark:text-white dark:border-white/20 dark:hover:bg-white/5",
                ].join(" ")}
            >
                <img src={englishFlag} alt="" className="h-[10px]"/>
                <span className="block">EN</span>
            </button>
        </div>
    )
}

export default CmsLanguageTabs