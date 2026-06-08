import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  canProceedToStep3,
  canSubmitUpload,
  readOwnershipFromStorage,
} from "../components/Form/Participation/ui/videoUploadValidation.js";
import {
  INITIAL_UPLOAD_FILES,
  INITIAL_UPLOAD_FORM,
  readTagsFromStorage,
} from "../components/Form/Participation/ui/videoUploadFormConfig.js";
import {
  mergeDirectorProfileIntoForm,
  restoreVideoUploadDraft,
  saveVideoUploadDraft,
} from "../components/Form/Participation/ui/videoUploadDraft.js";
import { submitVideoUpload } from "../components/Form/Participation/ui/videoUploadSubmit.js";
import useVideoUploadCountries from "./useVideoUploadCountries.js";

export default function useVideoUploadForm({ formRef, onCanProceedChange }) {
  const { t, i18n } = useTranslation("participation");
  const navigate = useNavigate();
  const internalFormRef = useRef(null);
  const submitRequestedRef = useRef(false);
  const restoredRef = useRef(false);

  const [files, setFiles] = useState(INITIAL_UPLOAD_FILES);
  const [form, setForm] = useState(INITIAL_UPLOAD_FORM);
  const [tags, setTags] = useState(readTagsFromStorage);

  const {
    countries,
    loading: countriesLoading,
    err: countriesErr,
  } = useVideoUploadCountries(t, i18n.language);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successInfo, setSuccessInfo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const draft = restoreVideoUploadDraft();
    if (draft.form) setForm((f) => ({ ...f, ...draft.form }));
    if (draft.tags) setTags(draft.tags);
    restoredRef.current = true;
  }, []);

  useEffect(() => {
    if (!restoredRef.current) return;
    saveVideoUploadDraft(form, tags);
  }, [form, tags]);

  useEffect(() => {
    setForm((f) => mergeDirectorProfileIntoForm(f));
  }, []);

  useEffect(() => {
    onCanProceedChange?.(canProceedToStep3(form, files));
  }, [form, files, onCanProceedChange]);

  useEffect(() => {
    if (!formRef) return;

    formRef.current = {
      openConfirm: () => {
        if (uploading || submitRequestedRef.current) return;

        if (!canSubmitUpload(form, files, readOwnershipFromStorage())) {
          setErrorMsg(t("upload.missingValidations"));
          return;
        }

        submitRequestedRef.current = true;
        setConfirmOpen(true);
      },
      requestSubmit: () => internalFormRef.current?.requestSubmit?.(),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formRef, uploading, form, files, t]);

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function updateFile(e) {
    const { name, files: inputFiles } = e.target;
    if (!inputFiles) return;

    if (name === "subtitles") {
      setFiles((f) => ({ ...f, subtitles: Array.from(inputFiles) }));
    } else {
      setFiles((f) => ({ ...f, [name]: inputFiles[0] }));
    }
  }

  function updateStill(index, file) {
    setFiles((f) => {
      const next = [...f.stills];
      next[index] = file || null;
      return { ...f, stills: next };
    });
  }

  function closeConfirm() {
    if (uploading) return;
    setConfirmOpen(false);
    submitRequestedRef.current = false;
  }

  async function confirmAndUpload() {
    setConfirmOpen(false);
    await doUpload();
  }

  async function doUpload() {
    if (uploading) return;

    const ownershipFresh = readOwnershipFromStorage();
    if (!canSubmitUpload(form, files, ownershipFresh)) {
      setErrorMsg(t("upload.missingValidations"));
      submitRequestedRef.current = false;
      return;
    }

    setErrorMsg("");
    setUploading(true);

    try {
      const data = await submitVideoUpload({
        form,
        files,
        tags,
        ownership: ownershipFresh,
        t,
      });

      setSuccessInfo(t("upload.uploadOk", { id: data?.videoId || "—" }));
      setSuccessOpen(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.message || t("upload.uploadError"));
      submitRequestedRef.current = false;
    } finally {
      setUploading(false);
    }
  }

  function submit(e) {
    e.preventDefault();
    if (uploading || submitRequestedRef.current) return;

    if (!canSubmitUpload(form, files, readOwnershipFromStorage())) {
      setErrorMsg(t("upload.missingValidations"));
      return;
    }

    submitRequestedRef.current = true;
    setConfirmOpen(true);
  }

  function closeSuccess() {
    setSuccessOpen(false);
    navigate("/", { replace: true });
  }

  return {
    t,
    internalFormRef,
    form,
    files,
    tags,
    setTags,
    countries,
    countriesLoading,
    countriesErr,
    confirmOpen,
    successOpen,
    uploading,
    successInfo,
    errorMsg,
    update,
    updateFile,
    updateStill,
    submit,
    closeConfirm,
    closeSuccess,
    confirmAndUpload,
  };
}
