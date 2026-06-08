import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { buildDialCode } from "../components/Form/Participation/ui/countryUtils.js";
import {
  calcAge,
  canSubmitDirectorForm,
  splitMobile,
} from "../components/Form/Participation/ui/directorFormValidation.js";

const DRAFT_KEY = "directorFormDraft";

const INITIAL_FORM = {
  name: "",
  last_name: "",
  gender: "Mr",
  email: "",
  production_role: "Réalisateur",
  birthday: "",
  director_country: "",
  address: "",
  discovery_source: "",
  mobile_number: "",
  home_number: "",
};

export default function useDirectorForm(onNext) {
  const { t, i18n } = useTranslation("participation");

  const [form, setForm] = useState(INITIAL_FORM);
  const [countries, setCountries] = useState([]);
  const [phoneCountries, setPhoneCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesErr, setCountriesErr] = useState("");

  const [phoneOpen, setPhoneOpen] = useState(false);
  const [phoneCountry, setPhoneCountry] = useState({
    code: "FR",
    name: "France",
    dial: "+33",
  });
  const [phoneLocal, setPhoneLocal] = useState("");
  const [ageError, setAgeError] = useState("");

  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        const d = JSON.parse(draft);
        if (d?.form) setForm((f) => ({ ...f, ...d.form }));
        if (d?.phoneLocal != null) setPhoneLocal(String(d.phoneLocal || ""));
        if (d?.phoneCountry?.dial && d?.phoneCountry?.code) {
          setPhoneCountry(d.phoneCountry);
        }
      } catch { /* ignore */ }
    }

    const saved = localStorage.getItem("directorProfile");
    if (!saved) return;

    try {
      const p = JSON.parse(saved);

      setForm((prev) => ({
        ...prev,
        name: prev.name || p.firstName || "",
        last_name: prev.last_name || p.lastName || "",
        email: prev.email || p.email || "",
        gender: prev.gender || p.gender || "Mr",
        production_role:
          prev.production_role || p.production_role || "Réalisateur",
        birthday: prev.birthday || p.birthday || "",
        director_country: prev.director_country || p.director_country || "",
        address: prev.address || p.address || "",
        discovery_source: prev.discovery_source || p.discovery_source || "",
        home_number: prev.home_number || p.home_number || "",
        mobile_number: prev.mobile_number || p.mobile_number || "",
      }));

      const { dial, local } = splitMobile(p.mobile_number);
      if (local && !phoneLocal) setPhoneLocal(local);
      if (dial && (!phoneCountry?.dial || phoneCountry.dial === "+33")) {
        setPhoneCountry((pc) => ({ ...pc, dial }));
      }
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ form, phoneLocal, phoneCountry }),
    );
  }, [form, phoneLocal, phoneCountry]);

  useEffect(() => {
    let alive = true;

    async function loadCountries() {
      try {
        setCountriesLoading(true);
        setCountriesErr("");

        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd",
        );
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];

        const namesOnly = list
          .map((c) => c?.name?.common)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b, i18n.language));

        const phoneList = list
          .map((c) => {
            const code = c?.cca2;
            const name = c?.name?.common;
            const dial = buildDialCode(c?.idd);
            if (!code || !name || !dial) return null;
            return { code, name, dial };
          })
          .filter(Boolean)
          .sort((a, b) => a.name.localeCompare(b.name, i18n.language));

        if (!alive) return;

        setCountries(namesOnly);
        setPhoneCountries(phoneList);

        const fr = phoneList.find((x) => x.code === "FR");
        if (fr && !localStorage.getItem(DRAFT_KEY)) setPhoneCountry(fr);
      } catch {
        if (alive)
          setCountriesErr(t("director.fields.directorCountry.errorMsg"));
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
    const full = `${phoneCountry.dial} ${phoneLocal}`.trim();
    setForm((f) => ({ ...f, mobile_number: full }));
  }, [phoneCountry, phoneLocal]);

  useEffect(() => {
    const age = calcAge(form.birthday);
    if (age == null) {
      setAgeError("");
      return;
    }
    if (age < 18) setAgeError(t("director.ageError"));
    else setAgeError("");
  }, [form.birthday, t]);

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  const canSubmit = useMemo(
    () => canSubmitDirectorForm(form, ageError),
    [form, ageError],
  );

  function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    localStorage.setItem(
      "directorProfile",
      JSON.stringify({
        firstName: form.name,
        lastName: form.last_name,
        email: form.email,
        gender: form.gender,
        production_role: form.production_role,
        birthday: form.birthday,
        director_country: form.director_country,
        address: form.address,
        discovery_source: form.discovery_source,
        mobile_number: form.mobile_number,
        home_number: form.home_number,
      }),
    );

    onNext?.();
  }

  return {
    t,
    form,
    update,
    countries,
    phoneCountries,
    countriesLoading,
    countriesErr,
    phoneOpen,
    setPhoneOpen,
    phoneCountry,
    setPhoneCountry,
    phoneLocal,
    setPhoneLocal,
    ageError,
    canSubmit,
    submit,
  };
}
