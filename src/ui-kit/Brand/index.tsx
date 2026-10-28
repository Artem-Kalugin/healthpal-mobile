import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Icon } from '#ui-kit/Icon';
import { TextXL } from '#ui-kit/Text';

import { colors } from '#config/colors';

interface IBrand extends PropsWithChildren {
  theme?: 'dark' | 'light';
  style?: StyleProp<ViewStyle>;
}

export const Brand = ({ style, theme = 'dark' }: IBrand) => {
  return (
    <View style={[styles.brand, StyleSheet.flatten(style)]}>
      <Icon
        fill={theme === 'dark' ? undefined : '#FFFFFF'}
        name="logo"
      />
      <TextXL fontType="secondary">
        <TextXL
          color={
            theme === 'dark' ? colors.grayscale['500'] : colors.grayscale['300']
          }
          fontType="secondary"
        >
          Health
        </TextXL>
        <TextXL
          color={theme === 'dark' ? colors.grayscale['900'] : colors.main.white}
          fontType="secondary"
        >
          Pal
        </TextXL>
      </TextXL>
    </View>
  );
};

const styles = StyleSheet.create({
  brand: {
    alignItems: 'center',
    paddingBottom: 32,
    gap: 16,
  },
});
