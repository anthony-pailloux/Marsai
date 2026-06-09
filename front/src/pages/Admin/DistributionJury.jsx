import { useTranslation } from "react-i18next";
import JuryForm from "../../components/Form/Jury/JuryForm.jsx";
import JuryMemberCard from "../../components/admin/JuryMemberCard.jsx";
import SelectorAssignmentPanel from "../../components/admin/SelectorAssignmentPanel.jsx";
import useJuryAdmin from "../../hooks/useJuryAdmin.js";
import { typeAdminTitle } from "../../utils/typography.js";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";

export default function DistributionJury() {
  const { t } = useTranslation("jury");

  const {
    loading,
    sortedJury,
    open,
    mode,
    initialValues,
    saving,
    openCreate,
    openEdit,
    closeForm,
    submitForm,
    deleteTarget,
    requestDelete,
    cancelDelete,
    confirmDelete,
  } = useJuryAdmin();

  return (
    <div className="w-full">
      <div className="mx-auto w-full px-6 pb-14 pt-10">
        <main className="min-w-0 w-full">
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className={typeAdminTitle}>{t("admin.title")}</h3>
              <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                {t("admin.subtitle")}
              </p>
            </div>

            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF8C42] px-6 py-3 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#E07830] hover:opacity-95 active:opacity-90"
            >
              {t("admin.addButton")}
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading && <div>{t("admin.states.loading")}</div>}

            {!loading &&
              sortedJury.map((member) => (
                <JuryMemberCard
                  key={member.id}
                  member={member}
                  onEdit={openEdit}
                  onDelete={requestDelete}
                />
              ))}
          </div>

          <SelectorAssignmentPanel />

          <JuryForm
            open={open}
            mode={mode}
            initialValues={initialValues}
            saving={saving}
            onClose={closeForm}
            onSubmit={submitForm}
          />

          <ConfirmDialog
            isOpen={!!deleteTarget}
            onClose={cancelDelete}
            onConfirm={confirmDelete}
            title={t("admin.confirmDeleteTitle", {
              defaultValue: "Supprimer le membre",
            })}
            message={
              deleteTarget
                ? t("admin.confirmDelete", {
                    first_name: deleteTarget.first_name,
                    name: deleteTarget.name,
                  })
                : ""
            }
            confirmLabel={t("admin.confirmDeleteAction", {
              defaultValue: "Supprimer",
            })}
            confirmVariant="danger"
          />
        </main>
      </div>
    </div>
  );
}
