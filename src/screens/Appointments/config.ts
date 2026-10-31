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
