import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '#config';

interface IDivider extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export const Divider = ({ style }: IDivider) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <View style={styles.line} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.grayscale['200'],
  },
});
