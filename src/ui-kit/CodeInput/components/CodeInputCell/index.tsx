import React from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';

import { Cursor } from 'react-native-confirmation-code-field';
import Animated from 'react-native-reanimated';

import { TextXL } from '#ui-kit/Text';

import { useCellAnimatedStyle } from './hooks/useCellAnimatedStyle';

interface ICodeInputCell {
  symbol: string;
  isFocused: boolean;
  isError: boolean | undefined;
  testId: string;
  onLayout: (event: LayoutChangeEvent) => void;
}

export const CodeInputCell: React.FC<ICodeInputCell> = ({
  symbol,
  isFocused,
  isError,
  testId,
  onLayout,
}) => {
  const animatedStyle = useCellAnimatedStyle({
    isFocused,
    isError,
    cellHasValue: !!symbol,
  });

  return (
    <Animated.View style={[styles.cell, animatedStyle]}>
      <TextXL
        size={28}
        testId={testId}
        textAlign="center"
        weight="700"
        onLayout={onLayout}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </TextXL>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
