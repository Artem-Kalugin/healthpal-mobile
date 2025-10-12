import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { colors, withCustomAnimation } from '#config';

import { primaryFontNameMap } from '../Text';

const LABEL_TRANSLATE_Y = -12;

export interface ITextInputLabel {
  value: string;
  hasVisibleValue: boolean;
  isFocused: boolean;
}

export const TextInputLabel: React.FC<Partial<ITextInputLabel>> = ({
  value = '',
  hasVisibleValue = '',
  isFocused = false,
}) => {
  const labelProgress = useSharedValue(hasVisibleValue ? 1 : 0);

  const animateLabel = (shouldShow = false) => {
    const newProgressValue = hasVisibleValue || shouldShow ? 1 : 0;

    labelProgress.value = withCustomAnimation(newProgressValue);
  };

  const rLabelStyles = useAnimatedStyle(() => ({
    marginTop: interpolate(labelProgress.value, [0, 1], [0, LABEL_TRANSLATE_Y]),
  }));

  const rLabelWrapperStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(labelProgress.value, [0, 1], [1, 0.9]),
      },
    ],
  }));

  useEffect(() => {
    animateLabel(isFocused);
  }, [hasVisibleValue, isFocused]);

  return (
    <Animated.View
      pointerEvents="none"
      style={rLabelWrapperStyles}
    >
      <Animated.Text style={[styles.label, rLabelStyles]}>
        {value}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    top: 12,
    left: 8,
    color: colors.grayscale['400'],
    fontSize: 16,
    fontFamily: primaryFontNameMap[400],
  },
});
