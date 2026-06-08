import AdminSelect from "./AdminSelect.jsx";
import {
  ROLE_FILTER_ALL,
  ROLE_LABELS,
  ROLE_OPTIONS,
} from "../../utils/dashboardUserConstants.js";
import {
  DASHBOARD_USER_CARD_CLASS,
  getRoleBadgeClass,
} from "../../utils/dashboardUserUtils.js";

export default function DashboardUserTable({
  loading,
  filtered,
  roleFilter,
  onRoleFilterChange,
  currentUser,
  busyId,
  onRequestRoleChange,
  onRequestDelete,
}) {
  const isSuperadmin = currentUser?.role === "superadmin";

  return (
    <div className={DASHBOARD_USER_CARD_CLASS}>
      <div className="px-6 py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF3E0] ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
              👥
            </span>
            <div className="text-sm font-semibold">Gestion des utilisateurs</div>
          </div>

          <AdminSelect
            value={roleFilter}
            onChange={onRoleFilterChange}
            options={ROLE_OPTIONS.filter((role) => role !== "superadmin").map(
              (role) => ({
                value: role,
                label: ROLE_LABELS[role] || role,
              }),
            )}
            className="w-full md:w-auto"
          />
        </div>
      </div>

      <div className="border-t border-black/10 px-6 dark:border-white/10">
        {loading && (
          <div className="py-8 text-sm text-black/55 dark:text-white/55">
            Chargement...
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="py-8 text-sm text-black/55 dark:text-white/55">
            Aucun utilisateur trouvé.
          </div>
        )}
        {!loading && filtered.length > 0 && (
          <>
            <div
              className="grid grid-cols-[1fr_1fr_1.5fr_0.8fr_0.8fr_0.6fr] gap-4 border-t border-black/10 py-3 text-xs font-semibold tracking-wider text-black/55
                       dark:border-white/10 dark:text-white/55"
            >
              <div>PRÉNOM</div>
              <div>NOM</div>
              <div>E-MAIL</div>
              <div>RÔLE</div>
              {isSuperadmin && <div>CHANGER LE RÔLE</div>}
              {isSuperadmin && <div className="text-right">ACTIONS</div>}
            </div>

            <div className="divide-y divide-black/10 dark:divide-white/10">
              {filtered.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-[1fr_1fr_1.5fr_0.8fr_0.8fr_0.6fr] items-center gap-4 py-4 text-sm"
                >
                  <div className="truncate font-semibold text-black/90 dark:text-white/90">
                    {user.name}
                  </div>
                  <div className="truncate text-black/70 dark:text-white/70">
                    {user.last_name}
                  </div>
                  <div className="truncate text-black/55 dark:text-white/55">
                    {user.email}
                  </div>
                  <div>
                    <span className={getRoleBadgeClass(user.role)}>
                      {ROLE_LABELS[user.role] || user.role}
                    </span>
                  </div>

                  {isSuperadmin && (
                    <div>
                      {user.role !== "superadmin" ? (
                        <AdminSelect
                          value=""
                          onChange={(val) => {
                            if (val) onRequestRoleChange(user.id, val);
                          }}
                          placeholder="Modifier rôle"
                          placeholderAsOption={false}
                          disabled={busyId === user.id}
                          options={ROLE_OPTIONS.filter(
                            (role) =>
                              role !== ROLE_FILTER_ALL && role !== "superadmin",
                          ).map((role) => ({
                            value: role,
                            label: ROLE_LABELS[role] || role,
                          }))}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  )}

                  {isSuperadmin && (
                    <div className="text-right">
                      {user.role !== "superadmin" && (
                        <button
                          type="button"
                          disabled={busyId === user.id}
                          onClick={() => onRequestDelete(user.id)}
                          className="rounded-full border border-[#DC2626]/25 bg-[#DC2626]/15 px-4 py-2 text-xs font-semibold text-[#DC2626] hover:bg-[#DC2626]/25
                                  disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
