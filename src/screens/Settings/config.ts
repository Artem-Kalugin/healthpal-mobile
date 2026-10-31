import type { PermissionStatus } from 'react-native-permissions';

import type { Language, Region, TranslationKey } from '#i18n/types';

// `auto` follows the device language
export const RegionOptions: (Region | 'auto')[] = ['auto', 'RU', 'EU'];

export const LanguageOptions: (Language | 'auto')[] = ['auto', 'en', 'ru'];

export const LocationStatusLabels: Record<PermissionStatus, TranslationKey> = {
  granted: 'settings.location.granted',
  limited: 'settings.location.granted',
  denied: 'settings.location.denied',
  blocked: 'settings.location.blocked',
  unavailable: 'settings.location.unavailable',
};
