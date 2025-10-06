import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Image } from 'expo-image';

import { Divider, Icon, Rating, TextSmall, TextXS } from '#ui-kit';

import { colors, Images, shadow } from '#config';

type IMedicalCenterCard = {
  style: StyleProp<ViewStyle>;
};

export const MedicalCenterCard: React.FC<Partial<IMedicalCenterCard>> = ({
  style,
}) => {
  return (
    <View style={[styles.container, StyleSheet.flatten(style), shadow]}>
      <Image
        source={Images.clinic}
        style={styles.image}
      />
      <View style={styles.content}>
        <TextSmall
          color={colors.grayscale['600']}
          numberOfLines={1}
          style={styles.title}
          weight="700"
        >
          Медицинский центр ЛОДЭ
        </TextSmall>
        <View style={styles.locationContainer}>
          <Icon
            name="map"
            size={14}
          />
          <TextXS color={colors.grayscale['500']}>
            123 Oak Street, CA 98765
          </TextXS>
        </View>
        <View style={styles.ratingContainer}>
          <Rating />
          <TextXS color={colors.grayscale['500']}>(58 reviews)</TextXS>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.footer}>
          <View style={styles.pathTime}>
            <Icon name="pathTime" />
            <TextXS color={colors.grayscale['500']}>2.5 km/40min</TextXS>
          </View>
          <View style={styles.type}>
            <Icon name="hospital" />
            <TextXS color={colors.grayscale['500']}>Hospital</TextXS>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 252,
    borderRadius: 8,
    backgroundColor: colors.main.white,
  },
  image: {
    width: '100%',
    aspectRatio: 232 / 121,
  },
  title: {
    marginBottom: 8,
  },
  content: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  divider: {
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pathTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  type: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
});
