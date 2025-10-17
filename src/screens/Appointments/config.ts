import { AppointmentsRoutes } from '#navigation/Main/Tab/Appointments/types';

import { AppointmentType } from '#generated/schema';

export const RequestPayload: {
  [key in AppointmentsRoutes]: { type: AppointmentType };
} = {
  [AppointmentsRoutes.FutureAppointments]: {
    type: AppointmentType.FUTURE,
  },
  [AppointmentsRoutes.CompletedAppointments]: {
    type: AppointmentType.PAST,
  },
  [AppointmentsRoutes.CanceledAppointments]: {
    type: AppointmentType.CANCELED,
  },
};

export const AppointmentsEmptyListWarningConfiguration: {
  [key in AppointmentsRoutes]: { title: string; subtitle: string };
} = {
  [AppointmentsRoutes.FutureAppointments]: {
    title: 'Пока нет предстоящих приёмов',
    subtitle: 'Запишитесь к врачу заранее, чтобы не пропустить удобное время',
  },
  [AppointmentsRoutes.CompletedAppointments]: {
    title: 'Вы ещё не посещали врача',
    subtitle: 'После первого визита сюда попадут все завершённые приёмы',
  },
  [AppointmentsRoutes.CanceledAppointments]: {
    title: 'Нет отменённых приёмов',
    subtitle: 'Если придётся отменить визит, информация появится здесь',
  },
};

export const AppointmentListFooterComponentConfiguration: {
  [key in AppointmentsRoutes]: { message: string };
} = {
  [AppointmentsRoutes.FutureAppointments]: {
    message: 'Вы просмотрели все предстоящие приёмы.',
  },
  [AppointmentsRoutes.CompletedAppointments]: {
    message: 'Все завершённые приёмы загружены.',
  },
  [AppointmentsRoutes.CanceledAppointments]: {
    message: 'Список отменённых приёмов полностью отображён.',
  },
};
