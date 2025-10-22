import { DateData } from 'react-native-calendars';

import dayjs from 'dayjs';

const jsDateObjectToCalendarDate = (date: Date): DateData => {
  const res = {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    day: date.getDate(),
    timestamp: +date,
  };

  return {
    ...res,
    dateString: toDateString(date.toISOString()),
  };
};

export const toDateString = (isoTime: string, resetDay = false) => {
  const dateDayJs = dayjs(isoTime);

  if (resetDay) {
    dateDayJs.date(1);
  }

  return dateDayJs.format('YYYY-MM-DD');
};

export const dateToYYYYMM = (isoTime: string) => {
  const dateDayJs = dayjs(isoTime);

  return dateDayJs.format('YYYY-MM');
};

export const changeAnchorDate = (
  oldMonth: Pick<DateData, 'dateString'>,
  changeValue: number,
) => {
  const newAnchorDate = new Date(oldMonth.dateString);

  newAnchorDate.setDate(1);
  const newMonth = newAnchorDate.getMonth() + changeValue;
  if (newMonth >= 0 && newMonth < 12) {
    newAnchorDate.setMonth(newMonth);
  }

  if (newMonth >= 12) {
    newAnchorDate.setMonth(0);
    newAnchorDate.setFullYear(newAnchorDate.getFullYear() + 1);
  }

  if (newMonth < 0) {
    newAnchorDate.setMonth(11);
    newAnchorDate.setFullYear(newAnchorDate.getFullYear() - 1);
  }

  const newAnchorDateFormatted = jsDateObjectToCalendarDate(newAnchorDate);
  return newAnchorDateFormatted;
};
