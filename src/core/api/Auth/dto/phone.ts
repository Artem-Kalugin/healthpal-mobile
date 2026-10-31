// E.164: `+`, 7-15 digits, first one is not 0. Matches the backend, no per-country checks.
const E164_REGEX = /^\+[1-9]\d{6,14}$/;

/** Masked input value (`+49 1512 3456789`) -> E.164 (`+4915123456789`). */
export const toE164 = (value: string) => '+' + value.replace(/\D/g, '');

export const isE164Phone = (value: string) => E164_REGEX.test(toE164(value));
