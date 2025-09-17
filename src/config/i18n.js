import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en.json';
import ne from '../locales/ne.json';

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { ...en },
      ne: { ...ne },
    },
    fallbackLng: 'en', // Use English if the detected language is not available
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;