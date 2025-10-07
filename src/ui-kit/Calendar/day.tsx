import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { colors } from '#config';

import { TextXS } from '../Text';
import { DayProps, DayTextColors } from './config';

export const CalendarDay = ({
  onPress,
  onLongPress,
  date,
  state,
  ...rest
}: DayProps) => {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.wrapper}
    >
      <TouchableOpacity
        style={[
          styles.textContainer,
          state === 'selected' && styles.textContainerActive,
        ]}
        onLongPress={() => onLongPress && onLongPress(date)}
        onPress={() => onPress && onPress(date)}
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
  },
  textContainerActive: {
    borderRadius: 8,
    backgroundColor: colors.main.midnightBlue,
  },
});
