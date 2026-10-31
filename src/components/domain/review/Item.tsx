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

import { BORDER_RADIUS_ROUNDED, Images } from '#config';
import { colors } from '#config/colors';

import { useTranslation } from '#i18n';

type IReviewItem = {
  onPress?: () => void;
  style: StyleProp<ViewStyle>;
};

export const ReviewItem: React.FC<Partial<IReviewItem>> = ({
  onPress = undefined,
  style,
}) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[styles.container, StyleSheet.flatten(style)]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Image
          source={Images.profileCircle}
          style={styles.image}
        />
        <View style={styles.headerInfo}>
          <TextBase
            color={colors.grayscale['700']}
            numberOfLines={1}
            weight="700"
          >
            {t('review.mockAuthor')}
          </TextBase>
          <Rating value={5} />
        </View>
      </View>

      <TextSmall color={colors.grayscale['500']}>
        {t('review.mockText')}
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
