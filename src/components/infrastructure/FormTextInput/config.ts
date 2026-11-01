import { PHONE_MASKS_BY_DIAL_CODE } from '#generated/phoneMasks';

export const PHONE_ALLOWED_KEYS = '0123456789+';

// The mask is picked by the typed calling code (PREFIX affinity: common prefix of the formatted and the typed text; a tie goes to the primary mask).
// Typing always starts with '+' (see the prefill in FormTextInput), otherwise every format ties with the primary mask.
// Never use a permissive mask without separators as primary or affine: it reproduces any input and always wins.
export const PHONE_PRIMARY_MASK = PHONE_MASKS_BY_DIAL_CODE['1'].mask;

export const PHONE_AFFINITY_FORMAT = Object.values(
  PHONE_MASKS_BY_DIAL_CODE,
).map(({ mask }) => mask);

// same shape as the primary mask with zeros, exactly what the native tail placeholder shows (no flicker between them)
export const PHONE_PLACEHOLDER = PHONE_PRIMARY_MASK.replace(/\[[09]\]/g, '0');
