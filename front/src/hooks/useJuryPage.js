import { useEffect, useMemo, useState } from "react";
import { getApiUrl } from "../utils/apiBase.js";
import { getJuryMembers, getJuryPresident } from "../utils/juryPageUtils.js";
import { toast } from "../utils/toast.js";

export default function useJuryPage(t) {
  const [jury, setJury] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function loadJury() {
      try {
        setLoading(true);

        const res = await fetch(`${getApiUrl()}/jury`, {
          headers: { Accept: "application/json" },
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.error || t("errorLoading"));
        }

        const list = Array.isArray(data?.jury) ? data.jury : [];
        if (alive) setJury(list);
      } catch (e) {
        if (alive) toast.error(e?.message || t("errorLoading"));
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadJury();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- charge le jury une fois au montage
  }, []);

  const president = useMemo(() => getJuryPresident(jury), [jury]);
  const members = useMemo(() => getJuryMembers(jury), [jury]);

  return { jury, loading, president, members };
}
