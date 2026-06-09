import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "./useForm.js";
import useCmsContent from "./useCmsContent.js";
import buildInitialValuesFromCms from "../utils/buildInitialValuesFromCms.js";
import saveCmsSection from "../utils/saveCmsSection.js";
import { toast } from "../utils/toast.js";

/**
 * Hook commun pour les formulaires CMS (page + section + champs).
 * Centralise hydration depuis la BDD, reset locale et sauvegarde via saveCmsSection.
 */
export default function useCmsSectionForm({
  page,
  section,
  fields,
  defaultValues,
  forcedLocale,
  fileFields = [],
  buildOptions = {},
  successMessage = "Section mise à jour",
  errorMessage = "Erreur lors de la mise à jour",
  saveFn,
  hydrateValues,
}) {
  const { i18n } = useTranslation();
  const locale =
    forcedLocale ?? (i18n.language?.startsWith("fr") ? "fr" : "en");

  const { values, setValues, handleChange } = useForm(defaultValues);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const { content, loading: cmsLoading } = useCmsContent(page, locale);

  useEffect(() => {
    if (cmsLoading || hasHydrated) return;

    const cmsSection = content?.[page]?.[section];
    if (!cmsSection) return;

    let built = buildInitialValuesFromCms(fields, cmsSection, {
      fileFields,
      ...buildOptions,
    });

    if (hydrateValues) {
      built = hydrateValues(built, cmsSection);
    }

    setValues(built);
    setHasHydrated(true);
  }, [
    cmsLoading,
    content,
    page,
    section,
    hasHydrated,
    setValues,
    locale,
    fields,
    fileFields,
    buildOptions,
    hydrateValues,
  ]);

  useEffect(() => {
    setHasHydrated(false);
  }, [locale]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setSubmitLoading(true);

      try {
        const save = saveFn ?? saveCmsSection;
        await save({ page, section, locale, fields, values });
        setMessage(successMessage);
        setMessageType("success");
        toast.success(successMessage);
      } catch (error) {
        console.error("erreur:", error);
        setMessage(errorMessage);
        setMessageType("error");
        toast.error(errorMessage);
      } finally {
        setSubmitLoading(false);
      }
    },
    [page, section, locale, fields, values, successMessage, errorMessage, saveFn],
  );

  return {
    page,
    section,
    locale,
    values,
    setValues,
    handleChange,
    content,
    cmsLoading,
    message,
    messageType,
    setMessage,
    submitLoading,
    handleSubmit,
  };
}
