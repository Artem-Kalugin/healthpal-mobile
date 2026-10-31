import type { Language, Region } from '../types';

export const DEFAULT_LANGUAGE: Language = 'en';

export const LanguageNames: Record<Language, string> = {
  en: 'English',
  ru: 'Русский',
};

export const IntlLocales: Record<Language, string> = {
  en: 'en-150',
  ru: 'ru-RU',
};

// the backend catalog region that follows the device language
export const DeviceLanguageRegions: Record<Language, Region> = {
  en: 'EU',
  ru: 'RU',
};
