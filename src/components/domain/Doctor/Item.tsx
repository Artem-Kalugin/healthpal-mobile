import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Icon, Image, TextBase, TextSmall, TextXS } from '#ui-kit';

import { colors } from '#config';
import { MapDoctorCategoryToLabel } from '#config/locale';

import { BEDoctorResponseDto } from '#generated/__entities';

type IDoctorItem = {
  item: BEDoctorResponseDto;
  onPress?: () => void;
  style: StyleProp<ViewStyle>;
};

export const DoctorItem: React.FC<Partial<IDoctorItem>> = ({
  item,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[styles.container, StyleSheet.flatten(style)]}
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
        <TextSmall
          color={colors.grayscale['600']}
          weight="600"
        >
          {item?.category?.type &&
            MapDoctorCategoryToLabel[item?.category?.type]}
        </TextSmall>
        <View style={styles.locationContainer}>
          <Icon
            name="hospital"
            size={14}
          />
          <TextXS
            color={colors.grayscale['600']}
            numberOfLines={1}
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
    gap: 12,
  },
  image: {
    width: 110,
    aspectRatio: 1,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
    gap: 8,
  },
  locationText: {
    flex: 1,
  },
});
