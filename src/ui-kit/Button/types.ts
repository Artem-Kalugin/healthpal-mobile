import { TextStyle } from 'react-native';

export type ButtonSize = 'regular' | 'small' | 'extra-small';
export type ButtonAppearance = 'filled' | 'outlined' | 'text-only';
export type ButtonType = 'primary' | 'secondary';

export type ButtonStyleScheme = {
  default: TextStyle & { color: string };
};

export type ButtonAppearanceScheme = {
  [key in ButtonType]: ButtonStyleScheme;
};
