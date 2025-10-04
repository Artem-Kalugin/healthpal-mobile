import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { colors, withCustomAnimation } from '#config';

import { TextXL } from './Text';

interface ICodeInput extends TextInputProps {
  value: string;
  isError?: boolean;
  setValue: (e: string) => void;
  style?: StyleProp<ViewStyle>;
}

interface ICodeCell {
  symbol: string;
  isFocused: boolean;
  isError: boolean | undefined;
  index: number;
  getCellOnLayoutHandler: ReturnType<typeof useClearByFocusCell>['1'];
}

const CELL_COUNT = 5;
let autoFocusTimerId: number;
export const CodeInput: React.FC<ICodeInput> = ({
  value,
  setValue,
  isError,
  style,
  autoFocus,
}) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (autoFocus) {
      autoFocusTimerId = setTimeout(() => ref.current?.focus(), 0);

      return () => clearTimeout(autoFocusTimerId);
    }
  }, [autoFocus, ref]);

  return (
    <CodeField
      ref={ref}
      {...props}
      cellCount={CELL_COUNT}
      keyboardType="number-pad"
      renderCell={({ index, symbol, isFocused }) => (
        <CodeInputCell
          key={index}
          getCellOnLayoutHandler={getCellOnLayoutHandler}
          index={index}
          isError={isError}
          isFocused={isFocused}
          symbol={symbol}
        />
      )}
      rootStyle={[styles.codeFieldRoot, StyleSheet.flatten(style)]}
      textContentType="oneTimeCode"
      value={value}
      onChangeText={code => setValue(code.match(/\d+/g)?.join('') || '')}
      onFocus={() => {
        setValue('');
      }}
    />
  );
};

const CodeInputCell: React.FC<ICodeCell> = ({
  symbol,
  isFocused,
  isError,
  index,
  getCellOnLayoutHandler,
}) => {
  const cellHasValue = !!symbol;

  const focusAnimationProgress = useSharedValue(0);
  const errorAnimationProgress = useSharedValue(0);

  useEffect(() => {
    focusAnimationProgress.value = withCustomAnimation(+!!isFocused);
  }, [isFocused]);

  useEffect(() => {
    errorAnimationProgress.value = withCustomAnimation(+!!isError);
  }, [isError]);

  const animatedStyle = useAnimatedStyle(() => {
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
  return (
    <Animated.View style={[styles.cell, animatedStyle]}>
      <TextXL
        key={index}
        size={28}
        textAlign="center"
        weight="700"
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </TextXL>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    justifyContent: 'space-between',
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingTop: 1.5,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default CodeInput;
