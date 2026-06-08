import { useEffect, useState } from "react";

export default function useVideoUploadCountries(t, language) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    async function loadCountries() {
      try {
        setLoading(true);
        setErr("");

        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name",
        );
        const data = await res.json();

        const list = Array.isArray(data)
          ? data
              .map((c) => c?.name?.common)
              .filter(Boolean)
              .sort((a, b) => a.localeCompare(b, language))
          : [];

        if (alive) setCountries(list);
      } catch {
        if (alive) setErr(t("upload.fields.country.errorMsg"));
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadCountries();
    return () => {
      alive = false;
    };
  }, [language, t]);

  return { countries, loading, err };
}
