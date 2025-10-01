import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '#config';

import { Icon } from './Icon';
import { TextXL } from './Text';

interface IBrand extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export const Brand = (props: IBrand) => {
  return (
    <View style={[styles.brand, StyleSheet.flatten(props.style)]}>
      <Icon name="logo" />
      <TextXL>
        <TextXL color={colors.grayscale['500']}>Health</TextXL>
        <TextXL color={colors.grayscale['900']}>Pal</TextXL>
      </TextXL>
    </View>
  );
};

const styles = StyleSheet.create({
  brand: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 16,
  },
});
