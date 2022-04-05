import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { TRANSLATIONS_DEFAULT } from './default/translation';
import { TRANSLATIONS_NYAKINAMA } from './nyakinama/translation';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      default: {
        translation: TRANSLATIONS_DEFAULT,
      },
      nyakinama: {
        translation: TRANSLATIONS_NYAKINAMA,
      },
    },
  });

i18n.changeLanguage('default');
