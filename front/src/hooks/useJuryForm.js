import { useEffect, useMemo, useState } from "react";

const EMPTY_FORM = {
  name: "",
  first_name: "",
  bio: "",
  profession: "",
  role_label: "",
  is_president: 0,
  filmography_url: "",
  sort_order: 1,
  imgFile: null,
};

export default function useJuryForm(initialValues, onSubmit) {
  const [form, setForm] = useState({ ...EMPTY_FORM });

  useEffect(() => {
    if (initialValues) {
      setForm((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  const fileName = useMemo(() => form.imgFile?.name || "", [form.imgFile]);

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked ? 1 : 0 }));
      return;
    }
    if (type === "file") {
      setForm((f) => ({ ...f, imgFile: files?.[0] || null }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return { form, fileName, handleChange, handleSubmit };
}
