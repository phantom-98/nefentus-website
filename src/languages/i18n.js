import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./en.json";
import translationDE from "./ger.json";
import translationUK from "./uk.json";
import privacyPolicyEN from "./privacyPolicy/en.html";
import privacyPolicyDE from "./privacyPolicy/ger.html";
import privacyPolicyUK from "./privacyPolicy/uk.html";
import imprintEN from "./imprint/en.html";
import imprintDE from "./imprint/ger.html";
import imprintUK from "./imprint/uk.html";
/*
import translationAR from "./ar.json";
import translationFR from "./Fr.json";
import translationES from "./es.json";
*/

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: translationEN,
        privacy_policy: { contents: privacyPolicyEN },
        imprint: { contents: imprintEN },
      },
      de: {
        translation: translationDE,
        privacy_policy: { contents: privacyPolicyDE },
        imprint: { contents: imprintDE },
      },
      uk: {
        translation: translationUK,
        privacy_policy: { contents: privacyPolicyUK },
        imprint: { contents: imprintUK },
      },
      /*
      ar: {
        translation: translationAR,
      },
      fr: {
        translation: translationFR,
      },
      es: {
        translation: translationES,
      },
			*/
    },
  });

export default i18n;
