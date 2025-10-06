import React, { ReactNode } from 'react';
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

type IAppointmentCard = {
  onPress?: () => void;
  Footer: ReactNode;
  style: StyleProp<ViewStyle>;
};

export const AppointmentCard: React.FC<Partial<IAppointmentCard>> = ({
  onPress = undefined,
  Footer,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[styles.container, StyleSheet.flatten(style), shadow]}
      onPress={onPress}
    >
      <TextSmall
        color={colors.grayscale['800']}
        weight="700"
      >
        May 22, 2023 - 10.00 AM
      </TextSmall>
      <Divider />
      <View style={styles.main}>
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
      </View>
      {!!Footer && <Divider />}
      {Footer}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
    gap: 12,
    borderRadius: 12,
    backgroundColor: colors.main.white,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 110,
    aspectRatio: 1,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
