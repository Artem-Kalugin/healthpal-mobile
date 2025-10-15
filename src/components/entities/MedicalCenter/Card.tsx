import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Divider, Icon, Image, Rating, TextSmall, TextXS } from '#ui-kit';

import { colors, shadow } from '#config';
import { MapMedicalCenterTypeToLabel } from '#config/locale';

import { BEMedicalCenterResponseDto } from '#generated/__entities';

type IMedicalCenterCard = {
  item: BEMedicalCenterResponseDto;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const MedicalCenterCard: React.FC<IMedicalCenterCard> = ({
  style,
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[styles.container, StyleSheet.flatten(style), shadow]}
      onPress={onPress}
    >
      <Image
        source={item?.image}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.main}>
          <TextSmall
            color={colors.grayscale['600']}
            numberOfLines={2}
            style={styles.title}
            weight="700"
          >
            {item?.name}
          </TextSmall>
          <View style={styles.locationContainer}>
            <Icon
              name="map"
              size={14}
            />
            <TextXS color={colors.grayscale['500']}>{item?.address}</TextXS>
          </View>
          <View style={styles.ratingContainer}>
            <Rating />
            <TextXS color={colors.grayscale['500']}>(58 reviews)</TextXS>
          </View>
        </View>
        {item.distance && (
          <>
            <Divider style={styles.divider} />
            <View style={styles.footer}>
              <View style={styles.pathTime}>
                <Icon name="pathTime" />
                <TextXS color={colors.grayscale['500']}>
                  {item.distance} км / {item.walkingTimeMinutes} мин.
                </TextXS>
              </View>

              <View style={styles.type}>
                <Icon name="hospital" />
                <TextXS color={colors.grayscale['500']}>
                  {MapMedicalCenterTypeToLabel[item.type]}
                </TextXS>
              </View>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 252,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: colors.main.white,
  },
  image: {
    width: '100%',
    aspectRatio: 232 / 121,
  },
  title: {
    flex: 1,
    marginBottom: 8,
  },
  content: {
    flex: 1,
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
  main: {
    flex: 1,
    flexGrow: 1,
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
    marginLeft: 'auto',
    gap: 4,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
});
