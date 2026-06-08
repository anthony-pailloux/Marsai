import { useState } from "react";
import { useTranslation } from "react-i18next";
import TermsConditionsModal from "./TermsConditionsModal.jsx";
import useContributorsList from "./useContributorsList.js";
import useTeamOwnership from "./useTeamOwnership.js";
import TeamContributorsEditor from "./TeamContributorsEditor.jsx";
import TeamCertificateSection from "./TeamCertificateSection.jsx";
import TeamFinalChecksSection from "./TeamFinalChecksSection.jsx";
import { typeAdminSection } from "../../../../utils/typography.js";

export default function TeamCompositionForm({ onPrev }) {
  const { t } = useTranslation("participation");
  const help = "mt-2 text-xs italic text-neutral-500 dark:text-neutral-300";
  const [termsOpen, setTermsOpen] = useState(false);

  const {
    current,
    contributors,
    updateCurrent,
    addContributor,
    removeContributor,
  } = useContributorsList();

  const { ownership, toggleOwnership, setCaptchaOk, canFinish } =
    useTeamOwnership();

  return (
    <div className="w-full">
      <TermsConditionsModal
        open={termsOpen}
        title={t("team.final.modalTitle")}
        onClose={() => setTermsOpen(false)}
      />

      <div className="rounded-2xl bg-white p-8 text-neutral-900 dark:bg-black dark:text-white">
        <h2 className={`text-center text-orange-500 ${typeAdminSection}`}>
          {t("team.title")}
        </h2>

        <TeamContributorsEditor
          t={t}
          help={help}
          current={current}
          contributors={contributors}
          updateCurrent={updateCurrent}
          addContributor={addContributor}
          removeContributor={removeContributor}
        />

        <TeamCertificateSection
          t={t}
          ownership={ownership}
          onToggle={toggleOwnership}
        />

        <TeamFinalChecksSection
          t={t}
          ownership={ownership}
          canFinish={canFinish}
          onToggle={toggleOwnership}
          onOpenTerms={() => setTermsOpen(true)}
          onCaptchaChange={setCaptchaOk}
        />

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
