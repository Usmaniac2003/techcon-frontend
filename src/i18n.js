import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"

const fallbackLng = ["en"];

i18n
    .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    fallbackLng, // default language
    detection: {
      checkWhitelist: true,
    },
    debug: false,
  });

export default i18n;
