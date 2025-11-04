/* eslint-disable react/jsx-sort-props */
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Calendar as _Calendar, DateData } from 'react-native-calendars';
import Animated from 'react-native-reanimated';

import { colors, layoutAnimation, shadow } from '#config';

import { DayProps, normalizeDefaultStyles } from './config';
import { CalendarDay } from './Day';
import { CalendarHeader } from './Header';
import {
  changeAnchorDate,
  dateToYYYYMM,
  getDayState,
  toDateString,
} from './utils';

interface ICalendar extends PropsWithChildren {
  initialAnchorDate: Pick<DateData, 'dateString'>;
  activeDates: string[];
  loading?: boolean;
  maxDate: string;
  minDate: string;
  outlinedDate?: Pick<DateData, 'dateString'>;
  selectedDate: Pick<DateData, 'dateString'>;
  setSelectedDate: (date: DateData) => void;
  onViewableMonthChange?: (anchorDate: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const Calendar = ({
  initialAnchorDate,
  activeDates = [],
  selectedDate,
  loading,
  outlinedDate,
  minDate,
  maxDate,
  setSelectedDate,
  onViewableMonthChange,
  style,
}: ICalendar) => {
  const [anchorDate, setAnchorDate] = useState(initialAnchorDate);

  const addMonth = useCallback(() => {
    setAnchorDate(old => changeAnchorDate(old, +1));
  }, []);

  const subtractMonth = useCallback(() => {
    setAnchorDate(old => changeAnchorDate(old, -1));
  }, []);

  const disableHeaderArrowLeft =
    dateToYYYYMM(anchorDate.dateString) <= dateToYYYYMM(minDate);
  const disableHeaderArrowRight =
    dateToYYYYMM(anchorDate.dateString) >= dateToYYYYMM(maxDate);

  useEffect(() => {
    onViewableMonthChange &&
      onViewableMonthChange(toDateString(anchorDate.dateString));
  }, [anchorDate]);

  const renderDay = useCallback(
    (dayProps: DayProps) => (
      <CalendarDay
        key={dayProps.date.dateString}
        date={dayProps.date}
        state={getDayState(
          dayProps.date?.dateString || '',
          activeDates,
          selectedDate?.dateString,
          outlinedDate?.dateString,
        )}
        onPress={dayProps.onPress}
      />
    ),
    [activeDates, selectedDate],
  );

  return (
    <Animated.View
      layout={layoutAnimation}
      style={[styles.container, StyleSheet.flatten(style), shadow]}
    >
      <_Calendar
        customHeader={CalendarHeader}
        //@ts-expect-error wrong lib typing
        dayComponent={renderDay}
        disableArrowLeft={disableHeaderArrowLeft}
        disableArrowRight={disableHeaderArrowRight}
        displayLoadingIndicator={loading}
        firstDay={1}
        initialDate={anchorDate.dateString}
        //@ts-expect-error broken internal lib typings, type requires structure but code requires slug
        theme={normalizeDefaultStyles}
        minDate={minDate}
        maxDate={maxDate}
        onDayPress={setSelectedDate}
        onMonthChange={setAnchorDate}
        onPressArrowLeft={subtractMonth}
        onPressArrowRight={addMonth}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.grayscale['50'],
  },
});
