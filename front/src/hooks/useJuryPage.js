import { useEffect, useMemo, useState } from "react";
import { getApiUrl } from "../utils/apiBase.js";
import { getJuryMembers, getJuryPresident } from "../utils/juryPageUtils.js";

export default function useJuryPage(t) {
  const [jury, setJury] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    async function loadJury() {
      try {
        setLoading(true);
        setErr("");

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
        if (alive) setErr(e?.message || t("errorLoading"));
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadJury();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- charge le jury une fois au montage
  }, []);

  const president = useMemo(() => getJuryPresident(jury), [jury]);
  const members = useMemo(() => getJuryMembers(jury), [jury]);

  return { jury, loading, err, president, members };
}
