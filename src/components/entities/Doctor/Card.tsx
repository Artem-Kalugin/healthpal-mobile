import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Divider, Icon, Image, TextBase, TextSmall, TextXS } from '#ui-kit';

import { colors, shadow } from '#config';
import { MapDoctorCategoryToLabel } from '#config/locale';

import { BEDoctorResponseDto } from '#generated/__entities';

type IDoctorCard = {
  item: BEDoctorResponseDto;
  onPress?: () => void;
};

export const DoctorCard: React.FC<IDoctorCard> = ({
  item,
  onPress = undefined,
}) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[styles.container, shadow]}
      onPress={onPress}
    >
      <Image
        source={item?.image}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <TextBase
            color={colors.grayscale['800']}
            numberOfLines={1}
            weight="700"
          >
            {item?.name} {item?.surname}
          </TextBase>
          <Icon name="favorite" />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.details}>
          <TextSmall weight="600">
            {MapDoctorCategoryToLabel[item.category?.type]}
          </TextSmall>
          <View style={styles.locationContainer}>
            <Icon
              name="map"
              size={14}
            />
            <TextXS color={colors.grayscale['600']}>
              {item?.medicalCenter.address}
            </TextXS>
          </View>
          <View style={styles.footer}>
            <View style={styles.ratingContainer}>
              <Icon
                name="star"
                size={10}
              />
              <TextXS
                color={colors.grayscale['500']}
                weight="400"
              >
                {item?.rating}
              </TextXS>
            </View>
            <View style={styles.verticalDividerContainer}>
              <View style={styles.verticalDivider} />
            </View>
            <TextXS color={colors.grayscale['500']}>
              {item?.reviewsCount} отзывов
            </TextXS>
          </View>
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
    borderWidth: 0.5,
    borderColor: colors.grayscale['100'],
    borderRadius: 12,
    backgroundColor: colors.main.white,
  },
  image: {
    aspectRatio: 1,
    borderRadius: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  content: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  details: {
    gap: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  divider: {
    marginBottom: 12,
  },
  verticalDividerContainer: {
    width: 1,
    paddingVertical: 2.5,
  },
  verticalDivider: {
    flex: 1,
    backgroundColor: colors.grayscale['200'],
  },
});
