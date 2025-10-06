import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '#config';

import { Icon } from './Icon';
import { TextXS } from './Text';

interface IRating extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export const Rating = ({ style }: IRating) => {
  return (
    <View style={styles.container}>
      <TextXS
        color={colors.grayscale['500']}
        weight="600"
      >
        5.0
      </TextXS>
      <View style={styles.icons}>
        <Icon
          name="star"
          size={10}
        />
        <Icon
          name="star"
          size={10}
        />
        <Icon
          name="star"
          size={10}
        />
        <Icon
          name="star"
          size={10}
        />
        <Icon
          name="star"
          size={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icons: {
    flexDirection: 'row',
    gap: 2,
  },
});
