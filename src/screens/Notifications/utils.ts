import dayjs from 'dayjs';

export const formatNotificationDate = (timestamp: string): string => {
  const date = dayjs(timestamp);
  const now = dayjs();

  if (date.isSame(now, 'day')) {
    return 'сегодня';
  }

  if (date.isSame(now.subtract(1, 'day'), 'day')) {
    return 'вчера';
  }

  return date.format('D MMMM');
};
