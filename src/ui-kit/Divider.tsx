import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '#config';

import { TextBase } from './Text';

interface IDivider extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export const Divider = (props: IDivider) => {
  const { children, style } = props;

  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <View style={styles.line} />
      <TextBase
        style={styles.text}
        weight="400"
      >
        {children}
      </TextBase>
      <View style={styles.line} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.grayscale['200'],
  },
});
