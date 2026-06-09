import { useState } from "react";
import { useTranslation } from "react-i18next";

import { getApiUrl } from "../../utils/apiBase.js";
import { typeBody, typeCta, typeNewsletterTitle } from "../../utils/typography.js";
import ActionToastZone from "../ui/ActionToastZone.jsx";
import { toast } from "../../utils/toast.js";

const TOAST_SCOPE = "newsletter";

function Newsletter() {
  const { t } = useTranslation("newsletters");

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    const cleanEmail = String(email || "").trim();
    if (!cleanEmail) return;

    if (!consent) {
      toast.error("Vous devez accepter de recevoir la newsletter.", {
        scope: TOAST_SCOPE,
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${getApiUrl()}/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: cleanEmail, consent }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Erreur inscription");
      }

      toast.success(data?.message || "Inscription réussie", { scope: TOAST_SCOPE });
      setEmail("");
      setConsent(false);
    } catch (err) {
      toast.error(err?.message || "Erreur", { scope: TOAST_SCOPE });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="flex w-full flex-col items-stretch justify-center gap-2 overflow-hidden rounded-2xl bg-black/5 p-3 dark:bg-white/20 md:gap-2.5 md:p-4"
    >
      <h2 className={`flex w-full flex-row gap-1 text-left md:flex-col ${typeNewsletterTitle}`}>
        <span>{t("title_main")}</span>
        <span className="block">{t("title_accent")}</span>
      </h2>

      <ActionToastZone scope={TOAST_SCOPE} placement="above" />

      <div className="flex flex-col md:flex-row lg:flex-row items-start md:items-center gap-2 self-stretch">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email_placeholder")}
          className="h-10 flex-1 rounded-xl border border-black/10 bg-black/5 px-3 text-sm placeholder:text-black/50 dark:border-white/10 dark:bg-white/20 dark:placeholder:text-white/50"
        />

        <button
          type="submit"
          disabled={loading}
          className={`h-10 shrink-0 rounded-xl bg-[#FF8C42] px-4 text-white transition-colors hover:bg-[#E07830] disabled:opacity-60 ${typeCta}`}
        >
          {loading ? "..." : "OK"}
        </button>
      </div>

      <label className="w-full flex items-start gap-2 text-xs opacity-80">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span>{t("consent")}</span>
      </label>
    </form>
  );
}

export default Newsletter;
