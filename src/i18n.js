import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // abilita fetch via HTTP
  .use(initReactI18next)
  .init({
    lng: "en", // o 'it'
    fallbackLng: "en",
    backend: {
      loadPath: "/locales/{{lng}}.json", // fetch da /public/locales/it.json, ecc
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
