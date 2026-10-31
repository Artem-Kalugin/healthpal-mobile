import { useTranslation } from 'react-i18next';

import type { IFormatters } from '../types';
import { createFormatters, toLanguage } from '../utils';

export const useFormatters = (): IFormatters => {
  const { i18n } = useTranslation();

  return createFormatters(toLanguage(i18n.resolvedLanguage));
};
