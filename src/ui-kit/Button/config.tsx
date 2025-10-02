import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { colors } from '#config';

import { ButtonAppearance, ButtonSize, ButtonType } from '.';
import { IText, TextBase, TextSmall, TextXS } from '../Text';

export type IButtonTypeStyles = {
  default: any;
  disabled: any;
};

export const ButtonTextComponents: {
  [key in ButtonSize]: React.FC<IText>;
} = {
  regular: (props: Partial<IText>) => (
    <TextBase
      weight="500"
      {...props}
    />
  ),
  small: TextSmall,
  'extra-small': TextXS,
};

export const ButtonSizeStyles: { [key in ButtonSize]: ViewStyle } = {
  regular: {
    minHeight: 48,
    paddingHorizontal: 16,
  },
  small: {
    minHeight: 38,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  'extra-small': {
    minHeight: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
};

const getButtonStyle = (
  color: string,
  backgroundColor = 'transparent',
  weight = '600',
  borderColor = backgroundColor,
) => {
  return StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    style: {
      color,
      weight,
      borderColor,
      borderWidth: borderColor !== backgroundColor ? 1 : 0,
      backgroundColor,
    } as TextStyle,
  }).style;
};

type ButtonStyleScheme = {
  default: any;
};

type ButtonAppearanceScheme = {
  [key in ButtonType]: ButtonStyleScheme;
};

const FilledButtonStyles: ButtonAppearanceScheme = {
  primary: {
    default: getButtonStyle(colors.main.white, colors.main.midnightBlue),
  },
};

const TextOnlyButtonStyles: ButtonAppearanceScheme = {
  primary: {
    default: getButtonStyle(colors.primary.light),
  },
};

export const MapButtonStyles: {
  [key in ButtonAppearance]: ButtonAppearanceScheme;
} = {
  filled: FilledButtonStyles,
  'text-only': TextOnlyButtonStyles,
};
