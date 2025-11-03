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

import { Loader } from '../Loader';
import { TextSmall } from '../Text';
import { TagTestIds } from './config';

interface ITag {
  value?: text;
  isLoading?: boolean;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  testIdsConfig?: typeof TagTestIds;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(TextSmall);

export const Tag = ({
  value = 'tag',
  active = false,
  isLoading,
  onPress,
  style,
  testIdsConfig = TagTestIds,
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
      testID={testIdsConfig.root}
      onPress={onPress}
    >
      <AnimatedText
        color={colors.white}
        style={[styles.text, rText]}
        testId={testIdsConfig.text}
        weight="600"
      >
        {value}
      </AnimatedText>
      {isLoading && (
        <Loader
          color={colors.white}
          cover={false}
          testID={testIdsConfig.loader}
        />
      )}
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 8,
    borderColor: colors.main.midnightBlue,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS_ROUNDED,
    backgroundColor: colors.main.midnightBlue,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
