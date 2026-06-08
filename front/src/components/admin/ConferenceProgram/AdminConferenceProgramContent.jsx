import { useTranslation } from "react-i18next";
import { typeAdminSection, typeAdminMeta } from "../../../utils/typography.js";
import useAdminConferenceProgram from "../../../hooks/useAdminConferenceProgram.js";
import ConferenceProgramList from "./ConferenceProgramList.jsx";
import ConferenceProgramModal from "./ConferenceProgramModal.jsx";

export default function AdminConferenceProgramContent() {
  const { t } = useTranslation("adminConferenceProgram");
  const {
    items,
    loading,
    modalOpen,
    editing,
    form,
    colors,
    openCreate,
    openEdit,
    closeModal,
    updateField,
    handleSave,
    handleDelete,
  } = useAdminConferenceProgram(t);

  return (
    <>
      <section className="mt-5 rounded-3xl border border-black/10 bg-black/5 p-6 dark:border-[#FF8C42]/60 dark:bg-white/5">
        <h2 className={typeAdminSection}>{t("title")}</h2>
        <p className={`mt-1 ${typeAdminMeta}`}>{t("subtitle")}</p>
        <button
          type="button"
          onClick={openCreate}
          className="mt-4 rounded-2xl bg-[#FF8C42] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#E07830]"
        >
          {t("addSlot")}
        </button>

        <ConferenceProgramList
          items={items}
          loading={loading}
          t={t}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </section>

      <ConferenceProgramModal
        open={modalOpen}
        editing={editing}
        form={form}
        colors={colors}
        t={t}
        onClose={closeModal}
        onSubmit={handleSave}
        onFieldChange={updateField}
      />
    </>
  );
}
