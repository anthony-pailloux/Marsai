import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Field, TextInput, Select } from "./Field";
import ReCAPTCHA from "react-google-recaptcha";
import ContributorRow from "./ContributorRow.jsx";
import TermsConditionsModal from "./TermsConditionsModal.jsx";
import useContributorsList from "./useContributorsList.js";
import { typeAdminSection } from "../../../../utils/typography.js";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function TeamCompositionForm({ onPrev }) {
  const { t } = useTranslation("participation");
  const help = "mt-2 text-xs italic text-neutral-500 dark:text-neutral-300";

  const {
    current,
    contributors,
    updateCurrent,
    addContributor,
    removeContributor,
  } = useContributorsList();

  // Validations
  const [ownership, setOwnership] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ownership") || "{}");
    } catch {
      return {};
    }
  });

  // Modal conditions
  const [termsOpen, setTermsOpen] = useState(false);

  function toggleOwnership(key) {
    setOwnership((prev) => {
      const next = { ...prev, [key]: !prev?.[key] };
      localStorage.setItem("ownership", JSON.stringify(next));
      return next;
    });
  }

  function setCaptchaOk(token) {
    setOwnership((prev) => {
      const next = {
        ...prev,
        recaptchaToken: token || "",
        notRobot: !!token,
      };
      localStorage.setItem("ownership", JSON.stringify(next));
      return next;
    });
  }

  const canFinish = useMemo(() => {
    return (
      !!ownership?.ownershipCertified &&
      !!ownership?.promoConsent &&
      !!ownership?.termsAccepted &&
      !!ownership?.ageConfirmed &&
      !!ownership?.recaptchaToken
    );
  }, [ownership]);

  return (
    <div className="w-full">
      <TermsConditionsModal
        open={termsOpen}
        title={t("team.final.modalTitle")}
        onClose={() => setTermsOpen(false)}
      />

      {/* card */}
      <div className="rounded-2xl bg-white p-8 text-neutral-900 dark:bg-black dark:text-white">
        <h2 className={`text-center text-orange-500 ${typeAdminSection}`}>
          {t("team.title")}
        </h2>

        <div className="mt-8 rounded-2xl bg-neutral-100 p-6 dark:bg-neutral-900">
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={addContributor}
              className="rounded-full bg-neutral-700 px-6 py-2 text-sm font-semibold text-white"
            >
              {t("team.addCollaborator")}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <Field label={t("team.fields.civility.label")} required>
              <Select
                name="gender"
                value={current.gender}
                onChange={updateCurrent}
                className="bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white"
              >
                <option value="Mr">{t("team.fields.civility.mr")}</option>
                <option value="Mrs">{t("team.fields.civility.mrs")}</option>
              </Select>
              <div className={help}>{t("team.fields.civility.help")}</div>
            </Field>

            <Field label={t("team.fields.fullName.label")} required>
              <TextInput
                name="full_name"
                value={current.full_name}
                onChange={updateCurrent}
                placeholder={t("team.fields.fullName.placeholder")}
                className="bg-white text-neutral-900 placeholder:text-neutral-400 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
              />
              <div className={help}>{t("team.fields.fullName.help")}</div>
            </Field>

            <Field label={t("team.fields.profession.label")} required>
              <TextInput
                name="profession"
                value={current.profession}
                onChange={updateCurrent}
                placeholder={t("team.fields.profession.placeholder")}
                className="bg-white text-neutral-900 placeholder:text-neutral-400 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
              />
              <div className={help}>{t("team.fields.profession.help")}</div>
            </Field>

            <Field label={t("team.fields.email.label")} required>
              <TextInput
                name="email"
                value={current.email}
                onChange={updateCurrent}
                placeholder={t("team.fields.email.placeholder")}
                className="bg-white text-neutral-900 placeholder:text-neutral-400 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
              />
              <div className={help}>{t("team.fields.email.help")}</div>
            </Field>
          </div>

          {contributors.length ? (
            <div className="mt-6 space-y-3">
              {contributors.map((c, i) => (
                <ContributorRow
                  key={i}
                  contributor={c}
                  onRemove={() => removeContributor(i)}
                  removeLabel={t("team.remove")}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 text-sm text-neutral-500 dark:text-neutral-300">
              {t("team.empty")}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-2xl bg-neutral-300 p-6 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
          <div className="mb-3 font-semibold">
            {t("team.certificate.title")}
          </div>
          <p className="text-xs leading-relaxed">
            {t("team.certificate.text")}
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={!!ownership?.ownershipCertified}
                onChange={() => toggleOwnership("ownershipCertified")}
              />
              {t("team.certificate.checks.ownershipCertified")}
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={!!ownership?.promoConsent}
                onChange={() => toggleOwnership("promoConsent")}
              />
              {t("team.certificate.checks.promoConsent")}
            </label>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-black">
          <div className="mb-4 text-sm font-extrabold uppercase tracking-[0.12em] text-neutral-900 dark:text-white">
            {t("team.final.title")}
          </div>

          <div className="space-y-3 text-sm text-neutral-800 dark:text-neutral-200">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={!!ownership?.termsAccepted}
                onChange={() => toggleOwnership("termsAccepted")}
              />
              <span>
                {t("team.final.terms")}{" "}
                <button
                  type="button"
                  onClick={() => setTermsOpen(true)}
                  className="font-semibold text-orange-600 underline"
                >
                  {t("team.final.termsLink")}
                </button>{" "}
                du festival.
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={!!ownership?.ageConfirmed}
                onChange={() => toggleOwnership("ageConfirmed")}
              />
              <span>{t("team.final.age")}</span>
            </label>
          </div>

          <div className="mt-6">
            <ReCAPTCHA
              sitekey={SITE_KEY}
              onChange={(token) => setCaptchaOk(token || "")}
              onExpired={() => setCaptchaOk("")}
            />
            <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-300">
              {t("team.final.captchaHelp")}
            </div>
          </div>

          {!canFinish ? (
            <div className="mt-5 text-sm text-red-600 dark:text-red-300">
              {t("team.final.missing")}
            </div>
          ) : (
            <div className="mt-5 text-sm font-semibold text-green-600">
              {t("team.final.ok")}
            </div>
          )}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-xl border border-orange-400 px-10 py-3 font-semibold text-orange-500"
          >
            {t("page.prev")}
          </button>
        </div>
      </div>
    </div>
  );
}
