import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Image } from 'expo-image';

import { Divider, Icon, TextBase, TextSmall, TextXS } from '#ui-kit';

import { colors, Images, shadow } from '#config';

type IDoctorDetailsCard = {
  onPress?: () => void;
  style: StyleProp<ViewStyle>;
};

export const DoctorDetailsCard: React.FC<Partial<IDoctorDetailsCard>> = ({
  onPress = undefined,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[styles.container, StyleSheet.flatten(style), shadow]}
      onPress={onPress}
    >
      <Image
        source={Images.clinic}
        style={styles.image}
      />
      <View style={styles.content}>
        <TextBase
          color={colors.grayscale['800']}
          numberOfLines={1}
          weight="700"
        >
          Врач Иванов Борис В.
        </TextBase>
        <Divider />
        <TextSmall weight="600">Кардиолог</TextSmall>
        <View style={styles.locationContainer}>
          <Icon
            name="map"
            size={14}
          />
          <TextXS color={colors.grayscale['600']}>
            Медицинский центр ЛОДЭ
          </TextXS>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    borderRadius: 12,
    backgroundColor: colors.main.white,
  },
  image: {
    aspectRatio: 1,
    borderRadius: 12,
  },

  content: {
    flex: 1,
    marginBottom: 10,
    gap: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
