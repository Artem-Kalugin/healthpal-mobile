/* eslint-disable react-native/no-unused-styles */
import React, { FC, ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Loader } from '#ui-kit/Loader';

import {
  ButtonSizeStyles,
  ButtonTextComponents,
  MapButtonStyles,
} from './config';

export type ButtonSize = 'regular' | 'small' | 'extra-small';
export type ButtonAppearance = 'filled' | 'outlined' | 'text-only';
export type ButtonType = 'primary' | 'secondary';

export interface IButton {
  type: ButtonType;
  size: ButtonSize;
  appearance: ButtonAppearance;
  fullwidth: boolean;
  isLoading: boolean;
  disabled: boolean;
  color: string;
  onPress: () => void;
  onLongPress: () => void;
  children: ReactNode;
  style: StyleProp<ViewStyle>;
}

export const Button: FC<Partial<IButton>> = ({
  children = 'Button',
  type = 'primary',
  appearance = 'filled',
  size = 'regular',
  fullwidth = true,
  isLoading = false,
  disabled = false,
  color = '',
  style = {},
  onPress = () => {},
  onLongPress = () => {},
}) => {
  const styles = getStyles({ fullwidth, disabled });
  const typeStyle = MapButtonStyles[appearance][type].default;
  const sizeStyle = ButtonSizeStyles[size];
  const _Text = ButtonTextComponents[size];

  const content =
    typeof children === 'string' ? (
      //@ts-expect-error
      <_Text
        color={color || typeStyle?.color!}
        textAlign="center"
      >
        {children}
      </_Text>
    ) : (
      children
    );

  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      style={[
        styles.container,
        sizeStyle,
        typeStyle,
        disabled && styles.disabled,
        StyleSheet.flatten(style),
      ]}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <Loader
            cover
            color={typeStyle.color}
          />
        </View>
      ) : (
        content
      )}
    </TouchableOpacity>
  );
};

const getStyles = ({ fullwidth }: Pick<IButton, 'fullwidth' | 'disabled'>) =>
  StyleSheet.create({
    flex: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: fullwidth ? '100%' : 'auto',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      gap: 8,
      borderWidth: 1,
      borderRadius: 60,
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    activityIndicator: {
      minHeight: 20,
    },
    disabled: {
      opacity: 0.5,
    },
  });
