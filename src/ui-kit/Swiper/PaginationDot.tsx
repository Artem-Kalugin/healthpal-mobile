import React from 'react';
import { StyleSheet } from 'react-native';

import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { colors } from '#config';

import { reduceAnimationValue } from './utils';

interface IPaginationDot {
  index?: number;
  translation: SharedValue<number>;
  slideSize: SharedValue<number>;
  slideSequenceSize: SharedValue<number>;
  colorInterpolation?: [string, string];
  widthInterpolation?: [number, number];
}

const PaginationDot: React.FC<IPaginationDot> = ({
  index = 0,
  translation,
  slideSize,
  slideSequenceSize,
  colorInterpolation = [colors.grayscale['400'], colors.main.midnightBlue],
  widthInterpolation = [8, 16],
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const containerOffset = translation.value + slideSize.value * index;
    const reducedValue = reduceAnimationValue(
      containerOffset,
      slideSequenceSize.value,
    );

    const shouldAnimateBackwards = reducedValue > slideSequenceSize.value / 2;

    const translateX = shouldAnimateBackwards
      ? slideSequenceSize.value - reducedValue
      : reducedValue;

    return {
      backgroundColor: interpolateColor(
        translateX,
        [slideSize.value, 0],
        colorInterpolation,
      ),
      width: interpolate(
        translateX,
        [slideSize.value, 0],
        widthInterpolation,
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <Animated.View
      style={[animatedStyle, styles.paginationDot]}
      testID={`pagination-dot-${index}`}
    />
  );
};

const styles = StyleSheet.create({
  paginationDot: {
    height: 6,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 6,
  },
});

export default PaginationDot;
