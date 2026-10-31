import { NotificationTypes } from '#config';

import type { TranslationKey } from '#i18n/types';

type MockNotification = {
  id: string;
  type: NotificationTypes;
  title: TranslationKey;
  text: TranslationKey;
  timestamp: string;
};

const now = new Date();

export const notifications: { title: string; data: MockNotification[] }[] = [
  {
    title: new Date().toISOString(),
    data: [
      {
        id: '1',
        type: NotificationTypes.BOOKING_ACCEPTED,
        title: 'notifications.mock.title.bookingAccepted',
        text: 'notifications.mock.text.acceptedElena',
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        type: NotificationTypes.BOOKING_CANCELED,
        title: 'notifications.mock.title.bookingCanceled',
        text: 'notifications.mock.text.canceledDmitry',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        type: NotificationTypes.BOOKING_RESCHEDULED,
        title: 'notifications.mock.title.bookingRescheduled',
        text: 'notifications.mock.text.rescheduledAnna',
        timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        type: NotificationTypes.PASSWORD_CHANGED,
        title: 'notifications.mock.title.passwordChanged',
        text: 'notifications.mock.text.passwordChanged',
        timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      },
      {
        id: '6',
        type: NotificationTypes.NEW_LOG_IN,
        title: 'notifications.mock.title.newLogIn',
        text: 'notifications.mock.text.loginChrome',
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
        title: 'notifications.mock.title.bookingAccepted',
        text: 'notifications.mock.text.acceptedDmitry',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '7',
        type: NotificationTypes.BOOKING_CANCELED,
        title: 'notifications.mock.title.bookingCanceled',
        text: 'notifications.mock.text.canceledSvetlana',
        timestamp: new Date(now.getTime() - 26 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '8',
        type: NotificationTypes.BOOKING_RESCHEDULED,
        title: 'notifications.mock.title.bookingRescheduled',
        text: 'notifications.mock.text.rescheduledMaxim',
        timestamp: new Date(now.getTime() - 28 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '9',
        type: NotificationTypes.NEW_LOG_IN,
        title: 'notifications.mock.title.newLogIn',
        text: 'notifications.mock.text.loginSafari',
        timestamp: new Date(now.getTime() - 30 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '10',
        type: NotificationTypes.PASSWORD_CHANGED,
        title: 'notifications.mock.title.passwordChanged',
        text: 'notifications.mock.text.passwordChanged',
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
        title: 'notifications.mock.title.bookingAccepted',
        text: 'notifications.mock.text.acceptedDmitry',
        timestamp: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '12',
        type: NotificationTypes.BOOKING_CANCELED,
        title: 'notifications.mock.title.bookingCanceled',
        text: 'notifications.mock.text.canceledSvetlana',
        timestamp: new Date(now.getTime() - 50 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '13',
        type: NotificationTypes.BOOKING_RESCHEDULED,
        title: 'notifications.mock.title.bookingRescheduled',
        text: 'notifications.mock.text.rescheduledMaxim',
        timestamp: new Date(now.getTime() - 52 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '14',
        type: NotificationTypes.NEW_LOG_IN,
        title: 'notifications.mock.title.newLogIn',
        text: 'notifications.mock.text.loginSafari',
        timestamp: new Date(now.getTime() - 54 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '15',
        type: NotificationTypes.PASSWORD_CHANGED,
        title: 'notifications.mock.title.passwordChanged',
        text: 'notifications.mock.text.passwordChanged',
        timestamp: new Date(now.getTime() - 56 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
];
