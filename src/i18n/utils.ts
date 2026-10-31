import {
  DEFAULT_LANGUAGE,
  DeviceLanguageRegions,
  IntlLocales,
} from './config/languages';
import type {
  DateInput,
  FormLabel,
  IFormatters,
  Language,
  Region,
  TranslationKey,
} from './types';

const METERS_IN_KILOMETER = 1000;

const isLanguage = (code: string | null | undefined): code is Language =>
  !!code && code in IntlLocales;

export const toLanguage = (code: string | null | undefined): Language =>
  isLanguage(code) ? code : DEFAULT_LANGUAGE;

/** `savedLanguage || deviceLanguage || default`; `undefined` saved language follows the device. */
export const resolveLanguage = (
  savedLanguage: Language | undefined,
  deviceLanguageCodes: (string | null | undefined)[],
): Language =>
  savedLanguage ?? deviceLanguageCodes.find(isLanguage) ?? DEFAULT_LANGUAGE;

/**
 * `savedRegion || region of the device language`; `undefined` saved region follows the device.
 * Deliberately independent of the chosen app language: a `ru` device with `en` selected stays `RU`.
 */
export const resolveRegion = (
  savedRegion: Region | undefined,
  deviceLanguageCodes: (string | null | undefined)[],
): Region =>
  savedRegion ??
  DeviceLanguageRegions[resolveLanguage(undefined, deviceLanguageCodes)];

/** Turns a catalog key (+ server issue params) into the string react-hook-form carries; see `decodeLabel`. */
export const encodeLabel = (
  key: TranslationKey,
  params?: FormLabel['params'],
): string => JSON.stringify({ key, params } satisfies FormLabel);

const UNKNOWN_LABEL_KEY = 'serverValidation.UNKNOWN' satisfies TranslationKey;

/**
 * Reads what `encodeLabel` wrote; malformed input falls back to `serverValidation.UNKNOWN`.
 * `options` are the `t` interpolation values, `count` (for plural variants) comes from `limit` / `length`.
 */
export const decodeLabel = (
  label: string,
): { key: TranslationKey; options: Record<string, number | undefined> } => {
  try {
    const { key, params } = JSON.parse(label) as Partial<FormLabel>;

    if (typeof key !== 'string') throw new Error('no key');

    return {
      key,
      options: { ...params, count: params?.limit ?? params?.length },
    };
  } catch {
    return { key: UNKNOWN_LABEL_KEY, options: {} };
  }
};

export const createFormatters = (language: Language): IFormatters => {
  const locale = IntlLocales[language];

  return {
    formatDate: (value: DateInput, options) =>
      new Intl.DateTimeFormat(
        locale,
        options ?? { day: 'numeric', month: 'long', year: 'numeric' },
      ).format(new Date(value)),
    formatTime: value =>
      new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(value)),
    formatDistance: meters =>
      meters < METERS_IN_KILOMETER
        ? new Intl.NumberFormat(locale, {
            style: 'unit',
            unit: 'meter',
            maximumFractionDigits: 0,
          }).format(meters)
        : new Intl.NumberFormat(locale, {
            style: 'unit',
            unit: 'kilometer',
            maximumFractionDigits: 1,
          }).format(meters / METERS_IN_KILOMETER),
  };
};
