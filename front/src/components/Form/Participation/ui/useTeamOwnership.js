import { useMemo, useState } from "react";

function readOwnershipFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("ownership") || "{}");
  } catch {
    return {};
  }
}

function saveOwnership(next) {
  localStorage.setItem("ownership", JSON.stringify(next));
}

export default function useTeamOwnership() {
  const [ownership, setOwnership] = useState(readOwnershipFromStorage);

  function updateOwnership(updater) {
    setOwnership((prev) => {
      const next = updater(prev);
      saveOwnership(next);
      return next;
    });
  }

  function toggleOwnership(key) {
    updateOwnership((prev) => ({ ...prev, [key]: !prev?.[key] }));
  }

  function setCaptchaOk(token) {
    updateOwnership((prev) => ({
      ...prev,
      recaptchaToken: token || "",
      notRobot: !!token,
    }));
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

  return { ownership, toggleOwnership, setCaptchaOk, canFinish };
}
