import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Image } from 'expo-image';

import { Rating, TextBase, TextSmall } from '#ui-kit';

import { BORDER_RADIUS_ROUNDED, colors, Images } from '#config';

type IDoctorCard = {
  onPress?: () => void;
  style: StyleProp<ViewStyle>;
};

export const ReviewItem: React.FC<Partial<IDoctorCard>> = ({
  onPress = undefined,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[styles.container, StyleSheet.flatten(style)]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Image
          source={Images.clinic}
          style={styles.image}
        />
        <View style={styles.headerInfo}>
          <TextBase
            color={colors.grayscale['700']}
            numberOfLines={1}
            weight="700"
          >
            Иваныч
          </TextBase>
          <Rating value={5} />
        </View>
      </View>

      <TextSmall color={colors.grayscale['500']}>
        Я единственный пользователь этого приложения, сейчас напишу это под
        всеми врачами.
      </TextSmall>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
  image: {
    width: 56,
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS_ROUNDED,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
  },
  headerInfo: {
    gap: 8,
  },
});
