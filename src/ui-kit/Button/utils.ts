import { ButtonStyleScheme } from './types';

export const getButtonStyle = (
  color: string,
  backgroundColor = 'transparent',
  weight = '600',
  borderColor = backgroundColor,
) => {
  return {
    color,
    weight,
    borderColor,
    borderWidth: borderColor !== backgroundColor ? 1 : 0,
    backgroundColor,
  } as ButtonStyleScheme['default'];
};
