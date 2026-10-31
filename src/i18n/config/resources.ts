import type { InitOptions } from 'i18next';

import { en } from './en';
import { DEFAULT_LANGUAGE } from './languages';
import { ru } from './ru';

export const initOptions: InitOptions = {
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
};
