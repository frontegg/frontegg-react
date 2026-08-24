import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';

const resources: Resource = { en };

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export { i18n };
