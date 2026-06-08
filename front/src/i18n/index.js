import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import fr from "./locales/fr/index.js";
import en from "./locales/en/index.js";

const namespaces = [
  "header",
  "footer",
  "about",
  "home",
  "gallery",
  "detailvideo",
  "jury",
  "newsletters",
  "faq",
  "event",
  "adminConferenceProgram",
  "adminEvents",
  "adminEventParticipants",
  "adminHero",
  "zodErrors",
  "contact",
  "partners",
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["fr", "en"],
    load: "languageOnly",
    interpolation: { escapeValue: false },
    resources: { fr, en },
    ns: namespaces,
    defaultNS: "home",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
  });

export default i18n;
