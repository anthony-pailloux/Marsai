import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function TeamFinalChecksSection({
  t,
  ownership,
  canFinish,
  onToggle,
  onOpenTerms,
  onCaptchaChange,
}) {
  return (
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
            onChange={() => onToggle("termsAccepted")}
          />
          <span>
            {t("team.final.terms")}{" "}
            <button
              type="button"
              onClick={onOpenTerms}
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
            onChange={() => onToggle("ageConfirmed")}
          />
          <span>{t("team.final.age")}</span>
        </label>
      </div>

      <div className="mt-6">
        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={(token) => onCaptchaChange(token || "")}
          onExpired={() => onCaptchaChange("")}
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
  );
}
