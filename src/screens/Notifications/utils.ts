import dayjs from 'dayjs';

import { t } from '#i18n';
import type { IFormatters } from '#i18n/types';

export const formatNotificationDate = (
  timestamp: string,
  formatDate: IFormatters['formatDate'],
): string => {
  const date = dayjs(timestamp);
  const now = dayjs();

  if (date.isSame(now, 'day')) {
    return t('notifications.today');
  }

  if (date.isSame(now.subtract(1, 'day'), 'day')) {
    return t('notifications.yesterday');
  }

  return formatDate(timestamp, { day: 'numeric', month: 'long' });
};
