import React, { ReactNode, RefObject, useState } from 'react';
import {
  TextInput as _TextInput,
  BlurEvent,
  FocusEvent,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { colors, IS_IOS } from '#config';

import { Icon } from '../Icon';
import { primaryFontNameMap } from '../Text';
import { InputErrorBlock } from './InputErrorBlock';
import { InputLabel } from './InputLabel';

export type ITextInputOutline = 'error' | 'success' | 'focused' | 'default';

export type ITextInput = Omit<
  TextInputProps,
  'onChange' | 'onBlur' | 'onFocus' | 'onChangeText'
> & {
  errors?: string[];
  size: 'default' | 'small';
  onChange: TextInputProps['onChangeText'];
  inputRef: RefObject<_TextInput | null>;
  IconRight: ReactNode;
  IconLeft: ReactNode;
  outlineType: ITextInputOutline;
  disabled: boolean;
  showEraseOnlyIfFocused: boolean;
  androidFixScrollMultiline: boolean;
  label: string;
  onErase?: () => void;
  onBlur: (e?: BlurEvent) => void;
  onFocus: (e?: FocusEvent) => void;
  style: StyleProp<ViewStyle>;
  containerStyle: StyleProp<ViewStyle>;
  inputWrapperStyle: StyleProp<ViewStyle>;
};

export const TextInput: React.FC<Partial<ITextInput>> = ({
  value = '',
  multiline = false,
  pointerEvents = undefined,
  inputRef,
  outlineType,
  autoComplete = 'off',
  size = 'default',
  label = '',
  showEraseOnlyIfFocused = true,
  androidFixScrollMultiline = false,
  enablesReturnKeyAutomatically = false,
  IconRight,
  IconLeft,
  errors,
  autoCapitalize = 'none',
  returnKeyType = 'next',
  submitBehavior = 'submit',
  disabled = false,
  autoFocus = false,
  onFocus = () => {},
  onBlur = () => {},
  onChange = () => {},
  onErase = undefined,
  style = {},
  containerStyle = {},
  inputWrapperStyle = {},
  ...props
}) => {
  const _multiline = multiline || (!IS_IOS && androidFixScrollMultiline);
  const [isFocused, setIsFocused] = useState(autoFocus);
  const styles = getStyles({
    outlineType: outlineType ? outlineType : isFocused ? 'focused' : 'default',
    label,
    disabled,
    multiline: _multiline,
  });

  const showEraseIcon =
    !IconRight &&
    !!value &&
    !disabled &&
    (showEraseOnlyIfFocused ? isFocused : true);

  const rightContent = IconRight ? (
    IconRight
  ) : showEraseIcon ? (
    <TouchableOpacity
      testID="erase-button"
      onPress={() => {
        (onErase || onChange)('');
      }}
    >
      <Icon name="cross" />
    </TouchableOpacity>
  ) : null;

  const _onFocus = (e: FocusEvent) => {
    onFocus(e);
    setIsFocused(true);
  };

  const _onBlur = (e: BlurEvent) => {
    onBlur(e);
    setIsFocused(false);
  };

  return (
    <View style={containerStyle}>
      <View style={[styles.container, inputWrapperStyle]}>
        {IconLeft && (
          <View style={[styles.iconLeft, styles.iconContainer]}>
            {IconLeft}
          </View>
        )}

        <InputLabel
          hasVisibleValue={!!(value || props.placeholder)}
          isFocused={isFocused}
          value={label}
        />

        {/* TODO:delete when fixed //https://github.com/facebook/react-native/issues/25644 (probably never)*/}
        <View
          pointerEvents={pointerEvents}
          style={styles.wrapper}
        >
          <_TextInput
            ref={inputRef}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            editable={!disabled}
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
            maxLength={50}
            multiline={_multiline}
            placeholderTextColor={colors.grayscale['400']}
            pointerEvents={pointerEvents}
            returnKeyType={returnKeyType}
            selectionColor={colors.grayscale['700']}
            style={[
              styles.inputShared,
              size === 'small' && styles.inputSmall,
              size === 'default' && styles.inputDefault,
              StyleSheet.flatten(style),
            ]}
            submitBehavior={submitBehavior}
            /*https://github.com/facebook/react-native/issues/47106 */
            textContentType="oneTimeCode"
            value={value}
            onBlur={_onBlur}
            onChangeText={onChange}
            onFocus={_onFocus}
            {...props}
          />
        </View>

        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[styles.iconRight, styles.iconContainer]}
        >
          {rightContent}
        </Animated.View>
      </View>

      <InputErrorBlock errors={errors} />
    </View>
  );
};

const borderColors = {
  default: colors.grayscale['300'],
  focused: colors.grayscale['700'],
  error: colors.error.normal,
  success: colors.primary.light,
};

const getStyles = ({
  outlineType,
  label,
  disabled,
  multiline,
}: {
  outlineType: ITextInputOutline;
  label: string;
  disabled: boolean;
  multiline: ITextInput['multiline'];
}) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      borderColor: borderColors[outlineType],
      borderWidth: 1,
      borderRadius: 12,
      backgroundColor: colors.grayscale['50'],
    },
    inputShared: {
      flex: 1,
      maxHeight: 300,
      paddingHorizontal: 8,
      color: disabled ? colors.grayscale['200'] : colors.black,
      fontSize: 15,
      fontFamily: primaryFontNameMap[400],
    },
    inputDefault: {
      height: multiline ? 'auto' : 46,
      minHeight: multiline ? 46 : 'auto',
      paddingTop: label ? 18 : 0,
      paddingBottom: 0,
    },
    inputSmall: {
      height: multiline ? 'auto' : 40,
      minHeight: multiline ? 40 : 'auto',
      paddingTop: label ? 12 : 2,
      paddingBottom: 0,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {
      flex: 1,
    },
    iconLeft: {
      paddingLeft: 8,
    },
    iconRight: {
      paddingRight: 8,
    },
  });
