export default function TeamCertificateSection({ t, ownership, onToggle }) {
  return (
    <div className="mt-8 rounded-2xl bg-neutral-300 p-6 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
      <div className="mb-3 font-semibold">{t("team.certificate.title")}</div>
      <p className="text-xs leading-relaxed">{t("team.certificate.text")}</p>

      <div className="mt-4 space-y-2 text-sm">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={!!ownership?.ownershipCertified}
            onChange={() => onToggle("ownershipCertified")}
          />
          {t("team.certificate.checks.ownershipCertified")}
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={!!ownership?.promoConsent}
            onChange={() => onToggle("promoConsent")}
          />
          {t("team.certificate.checks.promoConsent")}
        </label>
      </div>
    </div>
  );
}
