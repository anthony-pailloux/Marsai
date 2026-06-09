import { useEffect, useState } from "react";
import getAllFaq from "../services/Faq/getFaqApi.js";
import deleteFaq from "../services/Faq/deleteFaqApi.js";
import updateFaq from "../services/Faq/updateFaqApi.js";
import addFaq from "../services/Faq/addFaqApi.js";
import { validate } from "../utils/zod/zodValidator.js";
import { createFaqSchema } from "../utils/zod/zodSchema/zodIndex.js";
import { EMPTY_FAQ } from "../utils/faqAdminUtils.js";
import { toast } from "../utils/toast.js";

export default function useFaqAdmin() {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(null);
  const [formErrorsAdd, setFormErrorsAdd] = useState([]);
  const [formErrorsEdit, setFormErrorsEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const [faqsEdit, setFaqsEdit] = useState([]);
  const [newFaq, setNewFaq] = useState({ ...EMPTY_FAQ });

  useEffect(() => {
    async function fetchFaqs() {
      try {
        setLoading(true);
        const res = await getAllFaq();
        setFaqs(res.data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Erreur de chargement des FAQ");
      } finally {
        setLoading(false);
      }
    }

    fetchFaqs();
  }, []);

  useEffect(() => {
    setFaqsEdit(faqs.map((faq) => ({ ...faq })));
  }, [faqs]);

  async function handleAdd() {
    try {
      setLoading(true);
      setFormErrorsAdd([]);

      const validation = validate(createFaqSchema, newFaq);
      if (!validation.success) {
        setFormErrorsAdd(validation.errors);
        setLoading(false);
        return;
      }

      const addedFaq = await addFaq(validation.data);
      setFaqs((prev) => [...prev, addedFaq]);
      setFaqsEdit((prev) => [...prev, addedFaq]);
      toast.success("FAQ ajoutée");
    } catch (err) {
      if (err.details) setFormErrorsAdd(err.details);
      console.error(err);
      toast.error("Erreur lors de l'ajout de la FAQ");
    } finally {
      setNewFaq({ ...EMPTY_FAQ });
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      setLoading(true);
      await deleteFaq(id);
      setFaqs((prev) => prev.filter((faq) => faq.id !== id));
      setFaqsEdit((prev) => prev.filter((faq) => faq.id !== id));
      toast.success("FAQ supprimée");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression de la FAQ");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(faq) {
    try {
      setLoading(true);
      setFormErrorsEdit((prev) => ({ ...prev, [faq.id]: [] }));

      const validation = validate(createFaqSchema, faq);
      if (!validation.success) {
        setFormErrorsEdit((prev) => ({
          ...prev,
          [faq.id]: validation.errors,
        }));
        setLoading(false);
        return;
      }

      const dataToUpdate = { ...validation.data, id: faq.id };
      const updatedFaq = await updateFaq(dataToUpdate);
      setFaqs((prev) =>
        prev.map((item) => (item.id === faq.id ? updatedFaq : item)),
      );
      setFaqsEdit((prev) =>
        prev.map((item) => (item.id === faq.id ? updatedFaq : item)),
      );
      toast.success("FAQ mise à jour");
    } catch (err) {
      if (err.details) {
        setFormErrorsEdit((prev) => ({ ...prev, [faq.id]: err.details }));
      }
      console.error(err);
      toast.error("Erreur lors de la mise à jour de la FAQ");
    } finally {
      setLoading(false);
    }
  }

  function handleEditChange(id, field, value) {
    setFaqsEdit((current) =>
      current.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq)),
    );
  }

  function handleNewFaqChange(_id, field, value) {
    setNewFaq((prev) => ({ ...prev, [field]: value }));
  }

  return {
    error,
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
  };
}
