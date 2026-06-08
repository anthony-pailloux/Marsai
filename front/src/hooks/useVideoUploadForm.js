import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  canProceedToStep3,
  canSubmitUpload,
  readOwnershipFromStorage,
  validateFilmUpload,
} from "../components/Form/Participation/ui/videoUploadValidation.js";
import { toBackendBirthday } from "../../../shared/validation/filmValidationHelpers.js";
import { getApiUrl } from "../utils/apiBase.js";

const DRAFT_KEY = "videoUploadDraft";

const INITIAL_FILES = {
  video: null,
  cover: null,
  stills: [null, null, null],
  subtitles: [],
};

const INITIAL_FORM = {
  youtube_video_id: "",
  title: "",
  title_en: "",
  synopsis: "",
  synopsis_en: "",
  language: "",
  country: "",
  duration: "",
  tech_resume: "",
  ai_tech: "",
  creative_resume: "",
  email: "",
  director_name: "",
  director_lastname: "",
  director_gender: "Mr",
  birthday: "",
  mobile_number: "",
  home_number: "",
  address: "",
  director_country: "",
  discovery_source: "",
};

export default function useVideoUploadForm({ formRef, onCanProceedChange }) {
  const { t, i18n } = useTranslation("participation");
  const navigate = useNavigate();
  const internalFormRef = useRef(null);
  const submitRequestedRef = useRef(false);
  const restoredRef = useRef(false);

  const [files, setFiles] = useState(INITIAL_FILES);
  const [form, setForm] = useState(INITIAL_FORM);
  const [tags, setTags] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("video_tags") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesErr, setCountriesErr] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successInfo, setSuccessInfo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let alive = true;

    async function loadCountries() {
      try {
        setCountriesLoading(true);
        setCountriesErr("");

        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name",
        );
        const data = await res.json();

        const list = Array.isArray(data)
          ? data
              .map((c) => c?.name?.common)
              .filter(Boolean)
              .sort((a, b) => a.localeCompare(b, i18n.language))
          : [];

        if (alive) setCountries(list);
      } catch {
        if (alive) setCountriesErr(t("upload.fields.country.errorMsg"));
      } finally {
        if (alive) setCountriesLoading(false);
      }
    }

    loadCountries();
    return () => {
      alive = false;
    };
  }, [i18n.language, t]);

  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const d = JSON.parse(savedDraft);
        if (d?.form) setForm((f) => ({ ...f, ...d.form }));
        if (Array.isArray(d?.tags)) setTags(d.tags);
      } catch { /* ignore */ }
    }
    restoredRef.current = true;
  }, []);

  useEffect(() => {
    if (!restoredRef.current) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ form, tags }));
  }, [form, tags]);

  useEffect(() => {
    const saved = localStorage.getItem("directorProfile");
    if (!saved) return;

    try {
      const p = JSON.parse(saved);
      setForm((f) => ({
        ...f,
        email: p.email || f.email,
        director_name: p.firstName || f.director_name,
        director_lastname: p.lastName || f.director_lastname,
        director_gender: p.gender || f.director_gender,
        birthday: p.birthday || f.birthday,
        address: p.address || f.address,
        director_country: p.director_country || f.director_country,
        discovery_source: p.discovery_source || f.discovery_source,
        mobile_number: p.mobile_number || f.mobile_number,
        home_number: p.home_number || f.home_number,
      }));
    } catch { /* ignore */ }
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
      const safeTags = Array.isArray(tags) ? tags : [];

      let contributors = [];
      try {
        const saved = JSON.parse(localStorage.getItem("contributors") || "[]");
        contributors = Array.isArray(saved) ? saved : [];
      } catch { /* ignore */ }

      const zodCheck = validateFilmUpload({
        form,
        files,
        tags: safeTags,
        contributors,
      });

      if (!zodCheck.ok) throw new Error(zodCheck.message);

      const fd = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        if (v === "" || v === null || v === undefined) return;
        fd.append(k, k === "birthday" ? toBackendBirthday(v) : v);
      });

      localStorage.setItem("video_tags", JSON.stringify(safeTags));
      fd.append("tags", JSON.stringify(safeTags));
      fd.append("contributors", JSON.stringify(contributors));
      fd.append(
        "ownership_certified",
        ownershipFresh?.ownershipCertified ? "1" : "0",
      );
      fd.append("promo_consent", ownershipFresh?.promoConsent ? "1" : "0");
      fd.append("terms_accepted", ownershipFresh?.termsAccepted ? "1" : "0");
      fd.append("age_confirmed", ownershipFresh?.ageConfirmed ? "1" : "0");

      const recaptchaToken = ownershipFresh?.recaptchaToken || "";
      if (!recaptchaToken) throw new Error("Captcha missing");
      fd.append("recaptcha_token", recaptchaToken);

      fd.append("video", files.video);
      fd.append("cover", files.cover);
      files.stills.forEach((f) => {
        if (f) fd.append("stills", f);
      });
      files.subtitles.forEach((f) => fd.append("subtitles", f));

      const res = await fetch(`${getApiUrl()}/videos`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          data?.details ||
            data?.error ||
            `${t("upload.uploadError")} (${res.status})`,
        );
      }

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
