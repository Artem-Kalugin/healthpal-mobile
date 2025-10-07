import { DateData } from 'react-native-calendars';

export const timestampToCalendarDate = (timestamp: number): DateData => {
  return jsDateObjectToCalendarDate(new Date(timestamp));
};

export const jsDateObjectToCalendarDate = (date: Date): DateData => {
  const res = {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    day: date.getDate(),
    timestamp: +date,
  };

  return {
    ...res,
    dateString: `${res.year}-${res.month < 10 ? '0' + res.month : res.month}-${res.day < 10 ? '0' + res.day : res.day}`,
  };
};

export const getMonthAndYearFromCalendarDateString = (dateString: string) => {
  return dateString.slice(0, 7);
};

export const changeAnchorDate = (oldMonth: DateData, changeValue: number) => {
  const newAnchorDate = new Date(oldMonth.timestamp);

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
