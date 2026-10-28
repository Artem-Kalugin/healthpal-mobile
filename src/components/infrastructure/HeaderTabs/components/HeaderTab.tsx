import React from 'react';
import { LayoutChangeEvent } from 'react-native';

import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { TextBase } from '#ui-kit';

import { colors } from '#config/colors';

const AnimatedText = Animated.createAnimatedComponent(TextBase);

export const HeaderTab = ({
  children,
  index,
  activeItemIndex,
  onLayout,
}: {
  children: string;
  index: number;
  activeItemIndex: SharedValue<number>;
  onLayout: (event: LayoutChangeEvent) => void;
}) => {
  const rTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      Math.abs(activeItemIndex.value - index),
      [0, 1],
      [colors.main.midnightBlue, colors.grayscale['400']],
    ),
  }));

  return (
    <AnimatedText
      style={rTextStyle}
      weight="600"
      onLayout={onLayout}
    >
      {children}
    </AnimatedText>
  );
};
