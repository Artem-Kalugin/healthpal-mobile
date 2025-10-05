import React, { useEffect } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { BORDER_RADIUS_ROUNDED, colors, withCustomAnimation } from '#config';

import { TextSmall } from './Text';

interface ITag {
  value: text;
  active: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(TextSmall);

export const Tag = ({
  value = 'tag',
  active = false,
  onPress,
  style,
}: ITag) => {
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withCustomAnimation(+!!active);
  }, [active]);

  const rContainer = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animationProgress.value,
      [0, 1],
      [colors.white, colors.main.midnightBlue],
    ),
  }));

  const rText = useAnimatedStyle(() => ({
    color: interpolateColor(
      animationProgress.value,
      [1, 0],
      [colors.white, colors.main.midnightBlue],
    ),
  }));

  return (
    <AnimatedTouchableOpacity
      disabled={!onPress}
      style={[styles.container, rContainer, StyleSheet.flatten(style)]}
      onPress={onPress}
    >
      <AnimatedText
        color={colors.white}
        style={rText}
        weight="600"
      >
        {value}
      </AnimatedText>
    </AnimatedTouchableOpacity>
  );
};
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8,
    paddingHorizontal: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.main.midnightBlue,
    borderRadius: BORDER_RADIUS_ROUNDED,
    backgroundColor: colors.main.midnightBlue,
  },
});
