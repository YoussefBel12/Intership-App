import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations directly from the public folder
import enTranslations from "../public/locales/en.json";
import frTranslations from "../public/locales/fr.json";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: enTranslations },
        fr: { translation: frTranslations },
    },
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
        escapeValue: false, // React already escapes values
    },
});

export default i18n;

