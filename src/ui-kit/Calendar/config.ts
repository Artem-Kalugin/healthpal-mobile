import { DayProps as _DayProps } from 'react-native-calendars/src/calendar/day';
import { DateData, DayState } from 'react-native-calendars/src/types';

import { colors } from '#config';

export type DayProps = Omit<_DayProps, 'date'> & {
  date: DateData;
};

export const CalendarHeaderTestIds = {
  arrowLeft: 'CalendarHeader_arrowLeft',
  arrowRight: 'CalendarHeader_arrowRight',
  loader: 'CalendarHeader_loader',
};
export const normalizeDefaultStyles = {
  'stylesheet.calendar.main': {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: colors.grayscale['50'],
    },
    dayContainer: {},
    emptyDayContainer: {
      flex: 1,
    },
    monthView: {
      backgroundColor: colors.grayscale['50'],
    },
    week: {
      marginVertical: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
};

export const DayTextColors: Partial<{ [x in DayState | 'outlined']: string }> =
  {
    selected: colors.white,
    disabled: colors.grayscale['300'],
    outlined: colors.grayscale['900'],
  };

export const CalendarMonthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
