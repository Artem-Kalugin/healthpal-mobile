import React from 'react';
import { StyleProp, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { CodeInputCell } from './components/CodeInputCell';
import { CodeInputTestIds, OTP_CELL_COUNT } from './config';

export { OTP_CELL_COUNT };

interface ICodeInput extends TextInputProps {
  value: string;
  isError?: boolean;
  setValue: (e: string) => void;
  style?: StyleProp<ViewStyle>;
  testIdsConfig?: typeof CodeInputTestIds;
}

export const CodeInput: React.FC<ICodeInput> = ({
  value,
  setValue,
  isError,
  style,
  autoFocus,
  testIdsConfig = CodeInputTestIds,
}) => {
  const ref = useBlurOnFulfill({ value, cellCount: OTP_CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      autoFocus={autoFocus}
      cellCount={OTP_CELL_COUNT}
      keyboardType="number-pad"
      renderCell={({ index, symbol, isFocused }) => (
        <CodeInputCell
          key={index}
          isError={isError}
          isFocused={isFocused}
          symbol={symbol}
          testId={testIdsConfig.cellText}
          onLayout={getCellOnLayoutHandler(index)}
        />
      )}
      rootStyle={[styles.codeFieldRoot, StyleSheet.flatten(style)]}
      testID={testIdsConfig.root}
      textContentType="oneTimeCode"
      value={value}
      onChangeText={code => setValue(code.match(/\d+/g)?.join('') || '')}
      onFocus={() => {
        setValue('');
      }}
    />
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    justifyContent: 'space-between',
  },
});
