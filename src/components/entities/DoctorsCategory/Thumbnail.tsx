import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, TextXS } from '#ui-kit';

import { colors } from '#config';

type IDoctorsCategoryThumbnail = object;

export const DoctorsCategoryThumbnail: React.FC<
  Partial<IDoctorsCategoryThumbnail>
> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon
          fill={colors.white}
          name="calendar"
          size={40}
        ></Icon>
      </View>
      <TextXS
        numberOfLines={1}
        style={styles.text}
        weight="700"
      >
        Dentistry
      </TextXS>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    maxWidth: 62,
  },
  container: {
    alignItems: 'center',
    gap: 4,
  },
  // eslint-disable-next-line react-native/no-color-literals
  icon: {
    height: 62,
    width: 62,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#22775544',
  },
});
