import React, { ReactNode, RefObject, useState } from 'react';
import {
  BlurEvent,
  FocusEvent,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {
  MaskedTextInput,
  MaskedTextInputRef,
} from 'react-native-advanced-input-mask';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { colors, IS_IOS, PHONE_MASK } from '#config';

import { Icon } from '../Icon';
import { primaryFontNameMap } from '../Text';
import { TextInputErrorBlock } from './ErrorBlock';
import { TextInputLabel } from './Label';

export type ITextInputOutline = 'error' | 'success' | 'focused' | 'default';

type IMaskedInput = Omit<TextInputProps, 'onChange'> & {
  errors?: string[];
  mask: string;
  onChange: (masked: string, unmasked: string) => void;
  size: 'default' | 'small';
  inputRef: RefObject<MaskedTextInputRef | null>;
  IconRight: ReactNode;
  IconLeft: ReactNode;
  outlineType: ITextInputOutline;
  disabled: boolean;
  showEraseOnlyIfFocused: boolean;
  androidFixScrollMultiline: boolean;
  label: string;
  onErase?: () => void;
  style: StyleProp<ViewStyle>;
  containerStyle: StyleProp<ViewStyle>;
  inputWrapperStyle: StyleProp<ViewStyle>;
};

export const MaskedInput: React.FC<Partial<IMaskedInput>> = ({
  mask = PHONE_MASK,
  value = '',
  multiline = false,
  pointerEvents = undefined,
  inputRef,
  outlineType,
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
      onPress={() => {
        (onErase || onChange)('', '');
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

        <TextInputLabel
          hasVisibleValue={!!(props.placeholder === '' ? value : value || mask)}
          isFocused={isFocused}
          value={label}
        />

        {/* TODO:delete when fixed //https://github.com/facebook/react-native/issues/25644 (probably never)*/}
        <View
          pointerEvents={pointerEvents}
          style={styles.wrapper}
        >
          <MaskedTextInput
            ref={inputRef}
            autoCapitalize={autoCapitalize}
            autocomplete={false}
            autoFocus={autoFocus}
            editable={!disabled}
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
            mask={mask}
            multiline={_multiline}
            placeholderTextColor={colors.grayscale['400']}
            pointerEvents={pointerEvents}
            returnKeyType={returnKeyType}
            selectionColor={colors.grayscale['700']}
            style={[
              styles.inputShared,
              styles.flex,
              size === 'small' && styles.inputSmall,
              size === 'default' && styles.inputDefault,
              StyleSheet.flatten(style),
            ]}
            submitBehavior={submitBehavior}
            textContentType="oneTimeCode"
            value={value}
            onBlur={_onBlur}
            onChangeText={onChange}
            onFocus={_onFocus}
            {...props}
            placeholder={!isFocused ? props.placeholder : ''}
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

      <TextInputErrorBlock errors={errors} />
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
  multiline: IMaskedInput['multiline'];
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
    flex: {
      flex: 1,
    },
    inputShared: {
      maxHeight: 300,

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
      flexDirection: 'row',
      paddingHorizontal: 8,
    },
    iconLeft: {
      paddingLeft: 8,
    },
    iconRight: {
      paddingRight: 8,
    },
  });
