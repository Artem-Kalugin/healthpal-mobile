import React, { PropsWithChildren, useCallback, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Calendar as _Calendar, DateData } from 'react-native-calendars';
import Animated, { Easing, LinearTransition } from 'react-native-reanimated';

import { DateTime } from 'luxon';

import { colors, shadow } from '#config';

import { normalizeDefaultStyles } from './config';
import { CalendarDay } from './day';
import { CalendarHeader } from './header';
import {
  changeAnchorDate,
  getMonthAndYearFromCalendarDateString,
} from './utils';

interface ICalendar extends PropsWithChildren {
  maxDate: string;
  minDate: string;
  selectedDate: DateData;
  setSelectedDate: (date: DateData) => void;
  activeDays: number[];
  style?: StyleProp<ViewStyle>;
}

export const Calendar = ({
  activeDays,
  selectedDate,
  minDate,
  maxDate,
  setSelectedDate,
  style,
}: ICalendar) => {
  const [anchorDate, setAnchorDate] = useState(selectedDate);

  const addMonth = useCallback(() => {
    setAnchorDate(old => changeAnchorDate(old, +1));
  }, []);

  const subtractMonth = useCallback(() => {
    setAnchorDate(old => changeAnchorDate(old, -1));
  }, []);

  const disableHeaderArrowLeft =
    getMonthAndYearFromCalendarDateString(anchorDate.dateString) <=
    getMonthAndYearFromCalendarDateString(minDate);
  const disableHeaderArrowRight =
    getMonthAndYearFromCalendarDateString(anchorDate.dateString) >=
    getMonthAndYearFromCalendarDateString(maxDate);

  return (
    <Animated.View
      layout={LinearTransition.easing(Easing.ease)}
      style={[styles.container, StyleSheet.flatten(style), shadow]}
    >
      <_Calendar
        customHeader={CalendarHeader}
        dayComponent={dayProps => {
          return (
            <CalendarDay
              {...dayProps}
              state={
                !activeDays.includes(
                  DateTime.fromMillis(dayProps.date!.timestamp).weekday,
                )
                  ? 'disabled'
                  : dayProps.date?.timestamp === selectedDate?.timestamp
                    ? 'selected'
                    : dayProps.state
              }
            />
          );
        }}
        disableArrowLeft={disableHeaderArrowLeft}
        disableArrowRight={disableHeaderArrowRight}
        firstDay={1}
        initialDate={anchorDate.dateString}
        minDate={minDate}
        //@ts-expect-error broken internal lib typings, type requires structure but code requires slug
        theme={normalizeDefaultStyles}
        onDayLongPress={setSelectedDate}
        onDayPress={setSelectedDate}
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
