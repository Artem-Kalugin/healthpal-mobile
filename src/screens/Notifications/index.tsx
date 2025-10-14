import React from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

import { DateTime } from 'luxon';

import { NotifcationItem } from '#components/entities/Notification/Item';
import HeaderWithThreeSections from '#components/HeaderWithThreeSections';

import { TextBase } from '#ui-kit';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { colors, headerShadow } from '#config';
import { NotificationTypes } from '#config/types';

export function formatNotificationDate(timestamp: string): string {
  const date = DateTime.fromISO(timestamp);
  const now = DateTime.now();

  if (date.hasSame(now, 'day')) {
    return 'сегодня';
  }

  if (date.hasSame(now.minus({ days: 1 }), 'day')) {
    return 'вчера';
  }

  return date.toFormat('d LLLL');
}

const now = new Date();

const notifications = [
  {
    title: new Date().toISOString(),
    data: [
      {
        id: '1',
        type: NotificationTypes.BOOKING_ACCEPTED,
        title: 'Appointment Success',
        text: 'You have successfully booked your appointment with Dr. Emily Walker.',
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        type: NotificationTypes.BOOKING_CANCELED,
        title: 'Appointment Cancelled',
        text: 'You have successfully cancelled your appointment with Dr. David Patel.',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        type: NotificationTypes.BOOKING_RESCHEDULED,
        title: 'Scheduled Changed',
        text: 'You have successfully changed your appointment with Dr. Jesica Turner.',
        timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        type: NotificationTypes.PASSWORD_CHANGED,
        title: 'Password Changed',
        text: 'Your account password was changed successfully.',
        timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      },
      {
        id: '6',
        type: NotificationTypes.NEW_LOG_IN,
        title: 'New Log In',
        text: 'A new login was detected from Chrome on macOS.',
        timestamp: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    title: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
    data: [
      {
        id: '4',
        type: NotificationTypes.BOOKING_ACCEPTED,
        title: 'Appointment Success',
        text: 'You have successfully booked your appointment with Dr. David Patel.',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '7',
        type: NotificationTypes.BOOKING_CANCELED,
        title: 'Appointment Cancelled',
        text: 'You have successfully cancelled your appointment with Dr. Susan Lee.',
        timestamp: new Date(now.getTime() - 26 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '8',
        type: NotificationTypes.BOOKING_RESCHEDULED,
        title: 'Scheduled Changed',
        text: 'Your appointment with Dr. Mark Smith has been rescheduled.',
        timestamp: new Date(now.getTime() - 28 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '9',
        type: NotificationTypes.NEW_LOG_IN,
        title: 'New Log In',
        text: 'A new login was detected from Safari on iPhone.',
        timestamp: new Date(now.getTime() - 30 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '10',
        type: NotificationTypes.PASSWORD_CHANGED,
        title: 'Password Changed',
        text: 'Your account password was changed successfully.',
        timestamp: new Date(now.getTime() - 32 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    title: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
    data: [
      {
        id: '11',
        type: NotificationTypes.BOOKING_ACCEPTED,
        title: 'Appointment Success',
        text: 'You have successfully booked your appointment with Dr. David Patel.',
        timestamp: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '12',
        type: NotificationTypes.BOOKING_CANCELED,
        title: 'Appointment Cancelled',
        text: 'You have successfully cancelled your appointment with Dr. Susan Lee.',
        timestamp: new Date(now.getTime() - 50 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '13',
        type: NotificationTypes.BOOKING_RESCHEDULED,
        title: 'Scheduled Changed',
        text: 'Your appointment with Dr. Mark Smith has been rescheduled.',
        timestamp: new Date(now.getTime() - 52 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '14',
        type: NotificationTypes.NEW_LOG_IN,
        title: 'New Log In',
        text: 'A new login was detected from Safari on iPhone.',
        timestamp: new Date(now.getTime() - 54 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '15',
        type: NotificationTypes.PASSWORD_CHANGED,
        title: 'Password Changed',
        text: 'Your account password was changed successfully.',
        timestamp: new Date(now.getTime() - 56 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
];
export const Notifications: React.FC<
  MainScreenProps<MainRoutes.Notifications>
> = props => {
  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={[styles.headerContainer, headerShadow]}
        title="Уведомления"
        titleTextAlign="center"
      />

      <SectionList
        stickySectionHeadersEnabled
        renderItem={({ item }) => <NotifcationItem item={item} />}
        renderSectionFooter={() => <View style={styles.sectionFooterSpacer} />}
        renderSectionHeader={({ section }) => (
          <TextBase
            style={styles.sectionTitle}
            weight="400"
          >
            {formatNotificationDate(section.title)}
          </TextBase>
        )}
        sections={notifications}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale['200'],
  },
  sectionFooterSpacer: {
    paddingVertical: 8,
  },
  sectionTitle: {
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    textTransform: 'uppercase',
    backgroundColor: colors.main.white,
  },
});
