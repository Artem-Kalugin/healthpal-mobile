import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
} from 'react-native';

import { colors, IS_IOS } from '#config';

const ACTIVITY_INDICATOR_IOS_DEFAULT_COLOR = '#999999';

export interface ILoader extends ActivityIndicatorProps {
  cover: boolean;
  color?: string;
  inverted: boolean;
}

export const Loader: React.FC<Partial<ILoader>> = ({
  cover = true,
  inverted = false,
  color,
  style,
  ...rest
}) => {
  const styles = getStyles({ cover });

  const defaultColor = !inverted
    ? IS_IOS
      ? ACTIVITY_INDICATOR_IOS_DEFAULT_COLOR
      : colors.primary.normal
    : colors.primary.normal;

  return (
    <ActivityIndicator
      color={color || defaultColor}
      {...rest}
      style={[styles.container, StyleSheet.flatten(style)]}
    />
  );
};

const getStyles = ({ cover }: Pick<ILoader, 'cover'>) =>
  StyleSheet.create({
    container: {
      flex: cover ? 1 : 0,
      width: cover ? '100%' : 'auto',
    },
  });
