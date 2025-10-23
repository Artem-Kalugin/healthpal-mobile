import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { Divider, TextSmall } from '#ui-kit';

import { MainRoutes } from '#navigation/Main/types';
import { AppRoutes } from '#navigation/types';

import { colors, shadow } from '#config';

import { BEAppointmentResponseDto } from '#generated/__entities';

import { DoctorItem } from '../Doctor/Item';

type IAppointmentCard = {
  item: BEAppointmentResponseDto;
  onPress?: () => void;
  Footer?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const AppointmentCard: React.FC<IAppointmentCard> = ({
  item,
  onPress = undefined,
  Footer,
  style,
}) => {
  const navigation = useNavigation();

  const onDoctorItemPress = () => {
    navigation.navigate(AppRoutes.StackMain, {
      screen: MainRoutes.DoctorDetails,
      params: {
        id: item.doctor.id,
        defaultItem: item.doctor,
      },
    });
  };

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
        {dayjs(item.date).format('DD MMMM')}, {item.startTime.slice(0, 5)} -{' '}
        {item.endTime.slice(0, 5)}
      </TextSmall>
      <Divider />
      <DoctorItem
        item={item.doctor}
        onPress={onDoctorItemPress}
      />
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
});
