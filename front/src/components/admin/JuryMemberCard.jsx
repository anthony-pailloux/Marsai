import { useTranslation } from "react-i18next";
import { typeBadge } from "../../utils/typography.js";
import { resolveJuryImgUrl } from "../../utils/juryAdminUtils.js";

export default function JuryMemberCard({ member, onEdit, onDelete }) {
  const { t } = useTranslation("jury");

  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
      <div className="flex items-center gap-4">
        <img
          src={resolveJuryImgUrl(member.img)}
          alt=""
          className="h-16 w-16 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {member.role_label}
            </div>

            {Number(member.is_president) === 1 && (
              <span
                className={`rounded-full bg-orange-500/15 px-2 py-1 text-orange-600 dark:text-orange-300 ${typeBadge}`}
              >
                {t("admin.badges.president")}
              </span>
            )}
          </div>

          <div className="truncate text-lg font-bold">
            {member.first_name} {member.name}
          </div>

          <div className="truncate text-sm text-black/60 dark:text-white/60">
            {member.profession}
          </div>
        </div>
      </div>

      {member.bio && (
        <p className="mt-4 line-clamp-3 text-sm text-black/65 dark:text-white/65">
          {member.bio}
        </p>
      )}

      {member.filmography_url && (
        <a
          href={member.filmography_url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-full bg-[#2F6BFF] px-5 py-2 text-xs font-semibold text-white"
        >
          {t("admin.actions.filmography")}
        </a>
      )}

      <div className="mt-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(member)}
          className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-bold text-neutral-800 hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
        >
          {t("admin.actions.edit")}
        </button>

        <button
          type="button"
          onClick={() => onDelete(member)}
          className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-extrabold text-red-700 hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200 dark:hover:bg-red-500/20"
        >
          {t("admin.actions.delete")}
        </button>
      </div>
    </div>
  );
}
