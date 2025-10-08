import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { DateTime } from 'luxon';

import { Icon, IconNames, TextBase, TextSmall } from '#ui-kit';

import { BORDER_RADIUS_ROUNDED, colors } from '#config';
import { NotificationTypes } from '#config/types';

type Item = {
  type: NotificationTypes;
  timestamp: string;
  title: string;
  text: string;
};
type IDoctorCard = {
  item: Item;
  style?: StyleProp<ViewStyle>;
};

const MapNotificationTypeToIconBackground: {
  [x in NotificationTypes]: string;
} = {
  [NotificationTypes.BOOKING_ACCEPTED]: '#DEF7E5',
  [NotificationTypes.BOOKING_CANCELED]: '#FDE8E8',
  [NotificationTypes.BOOKING_RESCHEDULED]: colors.grayscale['100'],
  [NotificationTypes.NEW_LOG_IN]: colors.grayscale['100'],
  [NotificationTypes.PASSWORD_CHANGED]: colors.grayscale['100'],
};

const MapNotificationTypeToIconNames: {
  [x in NotificationTypes]: IconNames;
} = {
  [NotificationTypes.BOOKING_ACCEPTED]: 'calendarTick',
  [NotificationTypes.BOOKING_CANCELED]: 'calendarRemove',
  [NotificationTypes.BOOKING_RESCHEDULED]: 'calendarEdit',
  [NotificationTypes.NEW_LOG_IN]: 'logOut',
  [NotificationTypes.PASSWORD_CHANGED]: 'lockSlash',
};

export const NotifcationItem: React.FC<IDoctorCard> = ({ item, style }) => {
  return (
    <View style={[styles.container, StyleSheet.flatten(style)]}>
      <View
        style={[
          styles.icon,
          {
            backgroundColor: MapNotificationTypeToIconBackground[item.type],
          },
        ]}
      >
        <Icon
          color={colors.main.midnightBlue}
          name={MapNotificationTypeToIconNames[item.type]}
          size={24}
        />
      </View>
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <TextBase
            color={colors.main.midnightBlue}
            weight="700"
          >
            {item.title}
          </TextBase>
          <TextSmall
            color={colors.grayscale['500']}
            weight="400"
          >
            {DateTime.fromISO(item.timestamp).setLocale('ru').toFormat('HH:mm')}
          </TextSmall>
        </View>
        <TextSmall
          color={colors.grayscale['500']}
          weight="400"
        >
          {item.text}
        </TextSmall>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
    gap: 16,
  },
  sidebar: {
    flex: 1,
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS_ROUNDED,
    backgroundColor: colors.grayscale['200'],
  },
});
