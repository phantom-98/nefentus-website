import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./en.json";
import translationDE from "./ger.json";
import translationUK from "./uk.json";
import termsofUseEN from "./termsofUse/en.html?raw";
import termsofUseDE from "./termsofUse/ger.html?raw";
import termsofUseUK from "./termsofUse/uk.html?raw";
import amlPolicyEN from "./amlPolicy/en.html?raw";
import amlPolicyDE from "./amlPolicy/ger.html?raw";
import amlPolicyUK from "./amlPolicy/uk.html?raw";
import cookiePolicyEN from "./cookiePolicy/en.html?raw";
import cookiePolicyDE from "./cookiePolicy/ger.html?raw";
import cookiePolicyUK from "./cookiePolicy/uk.html?raw";
import privacyPolicyEN from "./privacyPolicy/en.html?raw";
import privacyPolicyDE from "./privacyPolicy/ger.html?raw";
import privacyPolicyUK from "./privacyPolicy/uk.html?raw";
import imprintEN from "./imprint/en.html?raw";
import imprintDE from "./imprint/ger.html?raw";
import imprintUK from "./imprint/uk.html?raw";
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
        termsofUse: { contents: termsofUseEN },
        aml_policy: { contents: amlPolicyEN },
        cookie_policy: { contents: cookiePolicyEN },
        privacy_policy: { contents: privacyPolicyEN },
        imprint: { contents: imprintEN },
      },
      de: {
        translation: translationDE,
        termsofUse: { contents: termsofUseDE },
        aml_policy: { contents: amlPolicyDE },
        cookie_policy: { contents: cookiePolicyDE },
        privacy_policy: { contents: privacyPolicyDE },
        imprint: { contents: imprintDE },
      },
      uk: {
        translation: translationUK,
        termsofUse: { contents: termsofUseUK },
        aml_policy: { contents: amlPolicyUK },
        cookie_policy: { contents: cookiePolicyUK },
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
