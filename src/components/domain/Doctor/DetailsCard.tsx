import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Divider, Icon, Image, TextBase, TextSmall, TextXS } from '#ui-kit';

import { colors, shadow } from '#config';
import { MapDoctorCategoryToDoctorLabel } from '#config/locale';

import { BEDoctorResponseDto } from '#generated/__entities';

type IDoctorDetailsCard = {
  item: BEDoctorResponseDto;
  onPress?: () => void;
  style: StyleProp<ViewStyle>;
};

export const DoctorDetailsCard: React.FC<Partial<IDoctorDetailsCard>> = ({
  item,
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
        source={item?.image}
        style={styles.image}
      />
      <View style={styles.content}>
        <TextBase
          color={colors.grayscale['800']}
          numberOfLines={1}
          weight="700"
        >
          {item?.name} {item?.surname}
        </TextBase>
        <Divider />
        <TextSmall weight="600">
          {item?.category?.type &&
            MapDoctorCategoryToDoctorLabel[item?.category?.type]}
        </TextSmall>
        <View style={styles.locationContainer}>
          <Icon
            name="hospital"
            size={14}
          />
          <TextXS
            color={colors.grayscale['600']}
            numberOfLines={2}
            style={styles.locationText}
          >
            {item?.medicalCenter.name}
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
    borderRadius: 8,
  },

  content: {
    flex: 1,
    marginBottom: 10,
    gap: 8,
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
    gap: 8,
  },
  locationText: {
    flex: 1,
  },
});
