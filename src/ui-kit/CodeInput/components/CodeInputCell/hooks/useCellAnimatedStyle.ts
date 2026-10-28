import { useEffect } from 'react';

import {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { withCustomAnimation } from '#config';
import { colors } from '#config/colors';

interface IUseCellAnimatedStyle {
  isFocused: boolean;
  isError: boolean | undefined;
  cellHasValue: boolean;
}

export const useCellAnimatedStyle = ({
  isFocused,
  isError,
  cellHasValue,
}: IUseCellAnimatedStyle) => {
  const focusAnimationProgress = useSharedValue(0);
  const errorAnimationProgress = useSharedValue(0);
  const shakeAnimationProgress = useSharedValue(0.5);

  useEffect(() => {
    focusAnimationProgress.value = withCustomAnimation(+!!isFocused);
  }, [isFocused]);

  useEffect(() => {
    if (isError) {
      shakeAnimationProgress.value = withSequence(
        withRepeat(
          withSequence(
            withTiming(1, {
              duration: 50,
            }),
            withTiming(0, {
              duration: 50,
            }),
          ),
          2,
          true,
        ),
        withCustomAnimation(0.5),
      );
    }

    errorAnimationProgress.value = withCustomAnimation(+!!isError);
  }, [isError]);

  return useAnimatedStyle(() => {
    const borderColorDependingOnFocus = interpolateColor(
      focusAnimationProgress.value,
      [0, 1],
      [colors.grayscale['300'], colors.grayscale['700']],
    );
    const backgroundColorDependingOnFocusAndValue = interpolateColor(
      +cellHasValue || focusAnimationProgress.value,
      [0, 1],
      [colors.grayscale['50'], colors.grayscale['200']],
    );

    return {
      transform: [
        {
          translateX: interpolate(
            shakeAnimationProgress.value,
            [0, 1],
            [-5, 5],
          ),
        },
      ],
      backgroundColor:
        errorAnimationProgress.value !== 0
          ? interpolateColor(
              errorAnimationProgress.value,
              [0, 1],
              [backgroundColorDependingOnFocusAndValue, colors.grayscale['50']],
            )
          : backgroundColorDependingOnFocusAndValue,
      borderColor:
        errorAnimationProgress.value !== 0
          ? interpolateColor(
              errorAnimationProgress.value,
              [0, 1],
              [borderColorDependingOnFocus, colors.error.normal],
            )
          : borderColorDependingOnFocus,
    };
  });
};
