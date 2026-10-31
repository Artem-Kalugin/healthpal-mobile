import i18next, {
  use as addPlugin,
  changeLanguage as setLanguage,
} from 'i18next';
import { initReactI18next } from 'react-i18next';

import { initOptions } from './config/resources';
import type { Language, TranslationKey } from './types';
import { toLanguage } from './utils';

export { useTranslation } from 'react-i18next';
export { useFormatters } from './hooks/useFormatters';
export { t } from 'i18next';
export {
  decodeLabel,
  encodeLabel,
  resolveLanguage,
  resolveRegion,
} from './utils';

/**
 * Applies the language; the first call initializes i18next. Resources are bundled,
 * so the initialization is synchronous: `t` is ready right after the call.
 */
export const changeLanguage = async (language: Language) => {
  if (!i18next.isInitialized) {
    await addPlugin(initReactI18next).init({ ...initOptions, lng: language });

    return;
  }

  await setLanguage(language);
};

export const getLanguage = () => toLanguage(i18next.resolvedLanguage);

// TODO(2026-11-10): superseded by `KeysFor` in types; delete if still unused (agents/architecture-debt.md).
/** Identity guard: keeps a stored key typed as `TranslationKey` instead of `string`. */
const locale = <K extends TranslationKey>(key: K): K => key;
