import type { Region } from '#i18n/types';

import {
  PHONE_FALLBACK_MASK,
  PHONE_MASKS_BY_DIAL_CODE,
} from '#generated/phoneMasks';

export const PHONE_ALLOWED_KEYS = '0123456789+';

// the mask is picked by the typed calling code; the fallback covers unknown/incomplete codes
export const PHONE_AFFINITY_FORMAT = [
  ...Object.values(PHONE_MASKS_BY_DIAL_CODE).map(({ mask }) => mask),
  PHONE_FALLBACK_MASK,
];

export const PHONE_PLACEHOLDER_BY_REGION: Record<Region, string> = {
  RU: '+7 912 345 67 89',
  EU: '+49 1512 3456789',
};
