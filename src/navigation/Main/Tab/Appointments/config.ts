import { NavigatorHeaderTabRouteConfig } from '#components/infrastructure';

import { AppointmentsRoutes } from './types';

export const TabsConfig: {
  [key in AppointmentsRoutes]: NavigatorHeaderTabRouteConfig;
} = {
  [AppointmentsRoutes.FutureAppointments]: {
    label: 'Будут',
  },
  [AppointmentsRoutes.CompletedAppointments]: {
    label: 'Прошли',
  },
  [AppointmentsRoutes.CanceledAppointments]: {
    label: 'Отменены',
  },
};
