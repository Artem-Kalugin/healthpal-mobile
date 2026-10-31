import type { Language, Region } from '#i18n/types';

// `undefined` follows the device language
export const RegionOptions: (Region | undefined)[] = [undefined, 'RU', 'EU'];

export const LanguageOptions: (Language | undefined)[] = [
  undefined,
  'en',
  'ru',
];
