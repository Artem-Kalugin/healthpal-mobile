import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Loader } from '#ui-kit/Loader';

import {
  ButtonSizeStyles,
  ButtonTestIds,
  ButtonTextComponents,
  MapButtonStyles,
} from './config';
import { IButton } from './types';

export type { IButton } from './types';

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
  testIdConfig = ButtonTestIds,
}) => {
  const styles = getStyles({ fullwidth, disabled });
  const typeStyle = MapButtonStyles[appearance][type].default;
  const sizeStyle = ButtonSizeStyles[size];
  const _Text = ButtonTextComponents[size];

  const content =
    typeof children === 'string' ? (
      <_Text
        color={color || typeStyle.color}
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
      testID={testIdConfig.root}
      onPress={onPress}
    >
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <Loader
            cover
            color={typeStyle.color}
            testID={testIdConfig.loader}
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
    activityIndicator: {
      minHeight: 20,
    },
    disabled: {
      opacity: 0.5,
    },
  });
