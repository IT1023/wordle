import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export type TLanguages = "en" | "ja";

i18n
  .use(initReactI18next)
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    defaultNS: "common",
    fallbackNS: "common",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    missingKeyHandler: () => "Missing Language Key",
    react: {
      useSuspense: true,
    },
  });

i18n.on("languageChanged", (lng: TLanguages) => {
  const short = lng.split("-")[0];
  if (short !== lng) {
    i18n.changeLanguage(short);
  }
});

export default i18n;
