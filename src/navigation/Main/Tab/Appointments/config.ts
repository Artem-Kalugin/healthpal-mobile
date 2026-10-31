import { NavigatorHeaderTabRouteConfig } from '#components/infrastructure';

import { AppointmentsRoutes } from './types';

export const TabsConfig: {
  [key in AppointmentsRoutes]: NavigatorHeaderTabRouteConfig;
} = {
  [AppointmentsRoutes.FutureAppointments]: {
    label: 'appointments.FutureAppointments.tab',
  },
  [AppointmentsRoutes.CompletedAppointments]: {
    label: 'appointments.CompletedAppointments.tab',
  },
  [AppointmentsRoutes.CanceledAppointments]: {
    label: 'appointments.CanceledAppointments.tab',
  },
};
