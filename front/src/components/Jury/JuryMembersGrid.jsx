import { HOME_CARD } from "../Home/homeCardStyles.js";
import {
  juryMemberName,
  resolveJuryImg,
} from "../../utils/juryPageUtils.js";
import {
  typeBodySm,
  typeCardTitle,
  typeEyebrow,
  typeSectionSubtitle,
} from "../../utils/typography.js";

export default function JuryMembersGrid({ members, t }) {
  return (
    <div className="mt-20 bg-linear-to-b from-[#FFF3E0] to-white py-16 dark:from-white/5 dark:to-black">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          <h2 className={typeSectionSubtitle}>{t("members.title")}</h2>

          <p
            className={`max-w-130 text-black/70 dark:text-white/70 ${typeBodySm}`}
          >
            {t("members.description")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <a
              key={m.id}
              href={m.filmography_url || "#"}
              target={m.filmography_url ? "_blank" : undefined}
              rel={m.filmography_url ? "noreferrer" : undefined}
              className={`group relative overflow-hidden ${HOME_CARD} bg-black shadow-xl`}
            >
              <img
                src={resolveJuryImg(m.img)}
                alt={juryMemberName(m)}
                className="h-105 w-full object-cover"
                draggable={false}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-0 w-full p-7">
                <div className={`text-brand ${typeEyebrow}`}>
                  {m.role_label || ""}
                </div>

                <div className={`mt-3 text-white ${typeCardTitle}`}>
                  {(m.first_name || "").toUpperCase()}{" "}
                  {(m.name || "").toUpperCase()}
                </div>

                <div className={`mt-2 text-white/70 ${typeBodySm}`}>
                  {m.profession || ""}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
