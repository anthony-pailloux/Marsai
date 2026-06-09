import FaqForm from "../../Form/Faq/FaqForm.jsx";
import useFaqAdmin from "../../../hooks/useFaqAdmin.js";

function FaqAdmin() {
  const {
    loading,
    newFaq,
    faqsEdit,
    formErrorsAdd,
    formErrorsEdit,
    handleAdd,
    handleDelete,
    handleUpdate,
    handleEditChange,
    handleNewFaqChange,
  } = useFaqAdmin();

  return (
    <>
      {loading && faqsEdit.length === 0 && (
        <p className="text-center text-gray-500">Loading…</p>
      )}

      <div className="flex justify-center">
        <FaqForm
          faq={newFaq}
          onChange={handleNewFaqChange}
          onSubmit={handleAdd}
          loading={loading}
          formErrors={formErrorsAdd}
        />
      </div>

      <div className="flex min-w-[320px] flex-wrap justify-center gap-4">
        {faqsEdit.map((faq) => (
          <FaqForm
            key={faq.id}
            faq={faq}
            onChange={handleEditChange}
            onSubmit={handleUpdate}
            onDelete={handleDelete}
            loading={loading}
            isEdit={true}
            formErrors={formErrorsEdit[faq.id] || []}
          />
        ))}
      </div>
    </>
  );
}

export default FaqAdmin;
