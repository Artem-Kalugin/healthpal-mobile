import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Animated, { FadeOut } from 'react-native-reanimated';

import { colors } from '#config';

import { TextXS } from '../Text';
import { DayProps, DayTextColors } from './config';

export const _CalendarDay = ({
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
