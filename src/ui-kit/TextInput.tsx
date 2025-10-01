import React, { ReactNode, RefObject, useEffect, useState } from 'react';
import {
  TextInput as _TextInput,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { colors, IS_IOS, withCustomAnimation } from '#config';

import { primaryFontNameMap } from './Text';

const LABEL_TRANSLATE_Y = -12;

export type ITextInputOutline = 'error' | 'success' | 'focused' | 'default';

export interface ITextInput
  extends Pick<
    TextInputProps,
    | 'value'
    | 'maxLength'
    | 'secureTextEntry'
    | 'submitBehavior'
    | 'placeholder'
    | 'autoCapitalize'
    | 'multiline'
    | 'keyboardType'
    | 'returnKeyType'
    | 'blurOnSubmit'
    | 'autoFocus'
    | 'showSoftInputOnFocus'
    | 'onFocus'
    | 'onBlur'
    | 'onSubmitEditing'
    | 'onContentSizeChange'
    | 'onEndEditing'
    | 'enablesReturnKeyAutomatically'
  > {
  size: 'default' | 'small';
  inputRef: RefObject<_TextInput | null>;
  IconRight: ReactNode;
  IconLeft: ReactNode;
  pointerEvents: TextInputProps['pointerEvents'];
  outlineType: ITextInputOutline;
  disabled: boolean;
  androidFixScrollMultiline: boolean;
  label: string;
  onChange: TextInputProps['onChangeText'];
  style: StyleProp<ViewStyle>;
  containerStyle: StyleProp<ViewStyle>;
}

export const TextInput: React.FC<Partial<ITextInput>> = ({
  value = '',
  maxLength,
  multiline = false,
  pointerEvents = undefined,
  size = 'small',
  inputRef,
  outlineType,
  label = '',
  androidFixScrollMultiline = false,
  secureTextEntry = false,
  enablesReturnKeyAutomatically = false,
  IconRight,
  IconLeft,
  placeholder = '',
  autoCapitalize = 'none',
  keyboardType = 'default',
  returnKeyType = 'default',
  submitBehavior = 'newline',
  disabled = false,
  autoFocus = false,
  showSoftInputOnFocus = true,
  onFocus = () => {},
  onBlur = () => {},
  onChange = () => {},
  onSubmitEditing = () => {},
  onContentSizeChange = () => {},
  onEndEditing = () => {},
  style = {},
  containerStyle = {},
}) => {
  const _multiline = multiline || (!IS_IOS && androidFixScrollMultiline);
  const [isFocused, setIsFocused] = useState(autoFocus);
  const styles = getStyles({
    outlineType: outlineType ? outlineType : isFocused ? 'focused' : 'default',
    label,
    disabled,
    size,
    multiline: _multiline,
  });

  const hasDisplayableValue = value || placeholder;

  const labelProgress = useSharedValue(hasDisplayableValue ? 1 : 0);

  const animateLabel = (shouldShow = false) => {
    const newProgressValue = hasDisplayableValue || shouldShow ? 1 : 0;

    labelProgress.value = withCustomAnimation(newProgressValue);
  };

  const rLabelStyles = useAnimatedStyle(() => ({
    //TODO, rewrite to transform -> translateY when fixed in reanimated (currently unstable on first render IOS, simulator too)
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
  }, [value]);

  return (
    <View style={[styles.container, containerStyle]}>
      {IconLeft && (
        <View style={[styles.iconLeft, styles.iconContainer]}>{IconLeft}</View>
      )}

      <Animated.View
        pointerEvents="none"
        style={rLabelWrapperStyles}
      >
        <Animated.Text style={[styles.label, rLabelStyles]}>
          {label}
        </Animated.Text>
      </Animated.View>

      <_TextInput
        ref={inputRef}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        editable={!disabled}
        enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline || (!IS_IOS && androidFixScrollMultiline)}
        placeholder={placeholder}
        placeholderTextColor={colors.grayscale['300']}
        pointerEvents={pointerEvents}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        selectionColor={colors.grayscale['700']}
        showSoftInputOnFocus={showSoftInputOnFocus}
        style={[styles.input, StyleSheet.flatten(style)]}
        submitBehavior={submitBehavior}
        value={value}
        onBlur={e => {
          onBlur(e);
          setIsFocused(false);
          animateLabel(false);
        }}
        onChangeText={onChange}
        onContentSizeChange={onContentSizeChange}
        onEndEditing={onEndEditing}
        onFocus={e => {
          onFocus(e);
          setIsFocused(true);
          animateLabel(true);
        }}
        onSubmitEditing={onSubmitEditing}
      />

      {IconRight ? (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[styles.iconRight, styles.iconContainer]}
        >
          {IconRight}
        </Animated.View>
      ) : (
        !!value &&
        !disabled &&
        isFocused && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={[styles.iconRight, styles.iconContainer]}
          >
            <TouchableOpacity
              onPress={() => {
                onChange('');
              }}
            >
              {/* <Icon name="close" /> */}
            </TouchableOpacity>
          </Animated.View>
        )
      )}
    </View>
  );
};

const borderColors = {
  default: colors.grayscale['300'],
  focused: colors.grayscale['700'],
  error: colors.primary.normal,
  success: colors.primary.light,
};

const getStyles = ({
  outlineType,
  label,
  disabled,
  size,
  multiline,
}: {
  outlineType: ITextInputOutline;
  label: string;
  disabled: boolean;
  size: ITextInput['size'];
  multiline: ITextInput['multiline'];
}) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
      borderColor: borderColors[outlineType],
      borderWidth: 1,
      borderRadius: 12,
      backgroundColor: colors.grayscale['50'],
    },

    label: {
      position: 'absolute',
      top: size === 'small' ? 12 : 18,
      left: size === 'small' ? 9 : 13,
      color: colors.grayscale['400'],
      fontSize: 16,
      fontFamily: primaryFontNameMap[400],
    },
    input: {
      flex: 1,
      height: multiline ? 'auto' : size === 'small' ? 44 : 56,
      maxHeight: 300,
      minHeight: multiline ? (size === 'small' ? 44 : 56) : 'auto',
      paddingTop: size === 'small' ? (label ? 20 : 8) : label ? 28 : 20,
      paddingBottom: size === 'small' ? (label ? 4 : 14) : label ? 8 : 18,
      paddingHorizontal: size === 'small' ? 8 : 12,
      color: disabled ? colors.grayscale['200'] : colors.black,
      fontSize: 16,
      lineHeight: 18,
      fontFamily: primaryFontNameMap[400],
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconLeft: {
      paddingLeft: size === 'small' ? 8 : 12,
    },
    iconRight: {
      paddingRight: size === 'small' ? 8 : 12,
    },
  });
