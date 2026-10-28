import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import dayjs from 'dayjs';

import { DoctorItem } from '#components/domain/doctor/Item';

import { Divider, TextSmall } from '#ui-kit';

import { shadow } from '#config';
import { colors } from '#config/colors';

import { BEAppointmentResponseDto } from '#generated/__entities';

type IAppointmentCard = {
  item: BEAppointmentResponseDto;
  onPress?: () => void;
  onDoctorPress?: () => void;
  Footer?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const AppointmentCard: React.FC<IAppointmentCard> = ({
  item,
  onPress = undefined,
  onDoctorPress = undefined,
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
        {dayjs(item.date).format('DD MMMM')}, {item.startTime.slice(0, 5)} -{' '}
        {item.endTime.slice(0, 5)}
      </TextSmall>
      <Divider />
      <DoctorItem
        item={item.doctor}
        onPress={onDoctorPress}
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
