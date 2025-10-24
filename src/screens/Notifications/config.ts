import { NotificationTypes } from '#config';

const now = new Date();

export const notifications = [
  {
    title: new Date().toISOString(),
    data: [
      {
        id: '1',
        type: NotificationTypes.BOOKING_ACCEPTED,
        title: 'Запись подтверждена',
        text: 'Вы успешно записались на приём к врачу Елене Ивановой.',
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        type: NotificationTypes.BOOKING_CANCELED,
        title: 'Запись отменена',
        text: 'Вы успешно отменили запись к врачу Дмитрию Петрову.',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        type: NotificationTypes.BOOKING_RESCHEDULED,
        title: 'Запись перенесена',
        text: 'Вы перенесли запись к врачу Анне Соколовой.',
        timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        type: NotificationTypes.PASSWORD_CHANGED,
        title: 'Пароль изменён',
        text: 'Пароль вашего аккаунта успешно обновлён.',
        timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      },
      {
        id: '6',
        type: NotificationTypes.NEW_LOG_IN,
        title: 'Новый вход',
        text: 'Обнаружен новый вход с браузера Chrome на macOS.',
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
        title: 'Запись подтверждена',
        text: 'Вы успешно записались на приём к врачу Дмитрию Петрову.',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '7',
        type: NotificationTypes.BOOKING_CANCELED,
        title: 'Запись отменена',
        text: 'Вы отменили запись к врачу Светлане Лебедевой.',
        timestamp: new Date(now.getTime() - 26 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '8',
        type: NotificationTypes.BOOKING_RESCHEDULED,
        title: 'Запись перенесена',
        text: 'Ваша запись к врачу Максиму Смирнову была перенесена.',
        timestamp: new Date(now.getTime() - 28 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '9',
        type: NotificationTypes.NEW_LOG_IN,
        title: 'Новый вход',
        text: 'Обнаружен новый вход с Safari на iPhone.',
        timestamp: new Date(now.getTime() - 30 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '10',
        type: NotificationTypes.PASSWORD_CHANGED,
        title: 'Пароль изменён',
        text: 'Пароль вашего аккаунта успешно обновлён.',
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
        title: 'Запись подтверждена',
        text: 'Вы успешно записались на приём к врачу Дмитрию Петрову.',
        timestamp: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '12',
        type: NotificationTypes.BOOKING_CANCELED,
        title: 'Запись отменена',
        text: 'Вы отменили запись к врачу Светлане Лебедевой.',
        timestamp: new Date(now.getTime() - 50 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '13',
        type: NotificationTypes.BOOKING_RESCHEDULED,
        title: 'Запись перенесена',
        text: 'Ваша запись к врачу Максиму Смирнову была перенесена.',
        timestamp: new Date(now.getTime() - 52 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '14',
        type: NotificationTypes.NEW_LOG_IN,
        title: 'Новый вход',
        text: 'Обнаружен новый вход с Safari на iPhone.',
        timestamp: new Date(now.getTime() - 54 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '15',
        type: NotificationTypes.PASSWORD_CHANGED,
        title: 'Пароль изменён',
        text: 'Пароль вашего аккаунта успешно обновлён.',
        timestamp: new Date(now.getTime() - 56 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
];
