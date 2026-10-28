import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Animated, { FadeOut } from 'react-native-reanimated';

import { DayProps as _DayProps } from 'react-native-calendars/src/calendar/day';
import { DateData, DayState } from 'react-native-calendars/src/types';

import { TextXS } from '#ui-kit/Text';

import { colors } from '#config/colors';

export type DayProps = Omit<_DayProps, 'date'> & {
  date: DateData;
};

export const DayTextColors: Partial<{ [x in DayState | 'outlined']: string }> =
  {
    selected: colors.white,
    disabled: colors.grayscale['300'],
    outlined: colors.grayscale['900'],
  };

const _CalendarDay = ({
  onPress,
  date,
  state,
}: Omit<DayProps, 'state'> & { state: DayProps['state'] | 'outlined' }) => {
  return (
    <Animated.View
      exiting={FadeOut}
      style={styles.wrapper}
    >
      <TouchableOpacity
        style={[
          styles.textContainer,
          state === 'outlined' && styles.textContainerOutlined,
          state === 'selected' && styles.textContainerActive,
        ]}
        onPress={() => state !== 'disabled' && onPress && onPress(date)}
      >
        <TextXS
          color={
            state && state in DayTextColors
              ? DayTextColors[state]
              : colors.grayscale['500']
          }
          weight="700"
        >
          {date?.day}
        </TextXS>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 34,
    width: 36,
    paddingVertical: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  textContainerOutlined: {
    backgroundColor: colors.grayscale['300'],
  },
  textContainerActive: {
    backgroundColor: colors.main.midnightBlue,
  },
});

export const CalendarDay = React.memo(_CalendarDay);
