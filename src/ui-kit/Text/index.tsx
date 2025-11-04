import React, { ReactNode } from 'react';
import {
  Text as RNText,
  StyleProp,
  StyleSheet,
  TextProps,
  TextStyle,
} from 'react-native';

import { colors } from '#config';

export interface IText {
  weight: keyof ReturnType<typeof generateFontNameMap>;
  fontType: 'primary' | 'secondary';
  size: number;
  lineHeight: TextStyle['lineHeight'];
  numberOfLines: number;
  color: string;
  selectable: boolean;
  textDecorationLine: TextStyle['textDecorationLine'];
  textAlign: TextStyle['textAlign'];
  onPress: () => void;
  onLayout: TextProps['onLayout'];
  children: text | ReactNode;
  style: StyleProp<TextStyle>;
  testId: string;
}

const _Text: React.FC<Partial<IText>> = ({
  size = 14,
  fontType = 'primary',
  weight = '400',
  color = colors.grayscale['700'],
  lineHeight = size * 1.5,
  numberOfLines = undefined,
  textAlign = 'auto',
  children,
  selectable = false,
  textDecorationLine = 'none',
  onPress = undefined,
  onLayout = undefined,
  testId = 'Text',
  style = {},
}) => {
  const styles = getStyles({
    size,
    weight,
    color,
    fontType,
    lineHeight,
    textDecorationLine,
    textAlign,
  });

  return (
    <RNText
      numberOfLines={numberOfLines}
      selectable={selectable}
      style={[styles.text, StyleSheet.flatten(style)]}
      testID={testId}
      onLayout={onLayout}
      onPress={onPress}
    >
      {children}
    </RNText>
  );
};

export const generateFontNameMap = (baseFontName = 'Inter18pt') => {
  return {
    '900': `${baseFontName}-Black`,
    '800': `${baseFontName}-ExtraBold`,
    '700': `${baseFontName}-Bold`,
    '600': `${baseFontName}-SemiBold`,
    '500': `${baseFontName}-Medium`,
    '400': `${baseFontName}-Regular`,
    '300': `${baseFontName}-Light`,
    '200': `${baseFontName}-ExtraLight`,
    '100': `${baseFontName}-Thin`,
  };
};

export const primaryFontNameMap = generateFontNameMap();
const secondaryFontNameMap = generateFontNameMap('Poppins');

const fontTypeMaps: {
  [key in IText['fontType']]: ReturnType<typeof generateFontNameMap>;
} = {
  primary: primaryFontNameMap,
  secondary: secondaryFontNameMap,
};

const getStyles = ({
  size,
  weight,
  color,
  lineHeight,
  textAlign,
  fontType,
  textDecorationLine,
}: Pick<
  IText,
  | 'fontType'
  | 'size'
  | 'weight'
  | 'color'
  | 'lineHeight'
  | 'textAlign'
  | 'textDecorationLine'
>) =>
  StyleSheet.create({
    text: {
      color,
      fontSize: size,
      textAlign,
      fontFamily:
        fontType && weight ? fontTypeMaps[fontType][weight] : undefined,
      fontWeight: weight,
      lineHeight,
      textDecorationLine,
    },
  });

export const TextXS = (props: Partial<IText>) => (
  <_Text
    size={12}
    {...props}
  />
);

export const TextSmall = (props: Partial<IText>) => (
  <_Text
    size={14}
    {...props}
  />
);

export const TextBase = (props: Partial<IText>) => (
  <_Text
    size={16}
    {...props}
  />
);

export const TextLarge = (props: Partial<IText>) => (
  <_Text
    size={18}
    {...props}
  />
);

export const TextXL = (props: Partial<IText>) => (
  <_Text
    size={20}
    {...props}
  />
);

export const Text = React.memo(_Text);
