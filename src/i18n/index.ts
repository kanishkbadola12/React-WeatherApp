import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLang from './locales/en.json';
import frLang from './locales/fr.json';
import deLang from './locales/de.json';

const resources = {
    en: { translation: enLang },
    fr: { translation: frLang },
    de: { translation: deLang }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
    });

export default i18n;