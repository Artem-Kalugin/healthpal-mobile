import React, { ReactNode, useEffect } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Animated, {
  AnimatedProps,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { withCustomAnimation } from '#config';

type IBlinkAnimator = {
  startAnimation: boolean;
  delayAnimationBy?: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

export const BlinkAnimator: React.FC<
  Partial<IBlinkAnimator & AnimatedProps<View>>
> = ({ delayAnimationBy = 0, startAnimation, style, children, ...rest }) => {
  const blinkAnimationProgress = useSharedValue(1);

  useEffect(() => {
    if (startAnimation) {
      blinkAnimationProgress.value = withDelay(
        delayAnimationBy,
        withSequence(
          withRepeat(
            withSequence(
              withTiming(1, {
                duration: 150,
                easing: Easing.inOut(Easing.ease),
              }),
              withTiming(0.3, {
                duration: 400,
                easing: Easing.inOut(Easing.ease),
              }),
            ),
            2,
            true,
          ),
          withCustomAnimation(1),
        ),
      );
    }
  }, [startAnimation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: blinkAnimationProgress.value,
    };
  });

  return (
    //@ts-expect-error
    <Animated.View
      style={[animatedStyle, StyleSheet.flatten(style)]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
};
