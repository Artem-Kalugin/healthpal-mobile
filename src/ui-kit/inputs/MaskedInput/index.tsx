import React, { ReactNode, RefObject, useState } from 'react';
import {
  BlurEvent,
  FocusEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {
  AFFINITY_CALCULATION_STRATEGY,
  MaskedTextInput,
  MaskedTextInputRef,
} from 'react-native-advanced-input-mask';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Icon } from '#ui-kit/Icon';
import { InputErrorBlock } from '#ui-kit/inputs/shared/InputErrorBlock';
import { InputLabel } from '#ui-kit/inputs/shared/InputLabel';

import { IS_IOS, PHONE_MASK } from '#config';
import { colors } from '#config/colors';
import { primaryFontNameMap } from '#config/fonts';

export type ITextInputOutline = 'error' | 'success' | 'focused' | 'default';

export type IMaskedInput = Omit<TextInputProps, 'onChange'> & {
  errors?: string[];
  mask: string;
  affinityFormat: string[];
  affinityCalculationStrategy: AFFINITY_CALCULATION_STRATEGY;
  allowedKeys: string;
  onChange: (masked: string, unmasked: string) => void;
  size: 'default' | 'small';
  inputRef: RefObject<MaskedTextInputRef | null>;
  IconRight: ReactNode;
  IconLeft: ReactNode;
  outlineType: ITextInputOutline;
  disabled: boolean;
  showEraseOnlyIfFocused: boolean;
  keepPlaceholderOnFocus: boolean;
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
  keepPlaceholderOnFocus = false,
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
  const [tailState, setTailState] = useState({ formatted: '', tail: '' });
  const styles = getStyles({
    outlineType: outlineType ? outlineType : isFocused ? 'focused' : 'default',
    label,
    size,
    disabled,
    multiline: _multiline,
  });

  const showTailPlaceholder = !_multiline && !!value && !!tailState.tail;

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
            onChangeText={(...args) => {
              setTailState({ formatted: args[0], tail: args[2] });
              // forward exactly what the native module sends
              (onChange as (...a: typeof args) => void)(...args);
            }}
            onFocus={_onFocus}
            {...props}
            placeholder={
              !isFocused || keepPlaceholderOnFocus ? props.placeholder : ''
            }
          />

          {/* must stay after MaskedTextInput: the native decorator looks up the TextInput as its previous sibling */}
          {showTailPlaceholder && (
            <View
              pointerEvents="none"
              style={styles.tailContainer}
            >
              <Text
                numberOfLines={1}
                style={styles.tailText}
              >
                <Text style={styles.tailEntered}>{tailState.formatted}</Text>
                {tailState.tail}
              </Text>
            </View>
          )}
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
  size,
  disabled,
  multiline,
}: {
  outlineType: ITextInputOutline;
  label: string;
  size: IMaskedInput['size'];
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
    // mirrors the input metrics so the tail continues the typed text
    tailContainer: {
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      right: 8,
      bottom: 0,
      left: 8,
      paddingTop: size === 'small' ? (label ? 12 : 2) : label ? 18 : 0,
    },
    tailText: {
      color: colors.grayscale['400'],
      fontSize: 15,
      fontFamily: primaryFontNameMap[400],
    },
    tailEntered: {
      color: colors.transparent,
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
