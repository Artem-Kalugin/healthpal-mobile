import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { ButtonTestIds } from './config';

export type ButtonSize = 'regular' | 'small' | 'extra-small';
export type ButtonAppearance = 'filled' | 'outlined' | 'text-only';
export type ButtonType = 'primary' | 'secondary';

export type ButtonStyleScheme = {
  default: TextStyle & { color: string };
};

export type ButtonAppearanceScheme = {
  [key in ButtonType]: ButtonStyleScheme;
};

export interface IButton {
  type: ButtonType;
  size: ButtonSize;
  appearance: ButtonAppearance;
  fullwidth: boolean;
  isLoading: boolean;
  disabled: boolean;
  color: string;
  onPress: () => void;
  children: ReactNode;
  testIdConfig: typeof ButtonTestIds;
  style: StyleProp<ViewStyle>;
}
