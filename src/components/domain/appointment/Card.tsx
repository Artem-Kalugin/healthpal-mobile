import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { DoctorItem } from '#components/domain/doctor/Item';

import { Divider, TextSmall } from '#ui-kit';

import { shadow } from '#config';
import { colors } from '#config/colors';

import { useFormatters } from '#i18n';

import { BEAppointmentResponseDto } from '#generated/__entities';

// `date` is a calendar day without a time zone, so it must not be shifted by the device offset
const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
};

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
  const { formatDate } = useFormatters();

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
        {formatDate(item.date, DATE_FORMAT)}, {item.startTime.slice(0, 5)} -{' '}
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
