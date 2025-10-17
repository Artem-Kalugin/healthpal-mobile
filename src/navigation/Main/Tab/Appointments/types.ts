import { StackScreenProps } from '@react-navigation/stack';

import { NavigatorHeaderTabRouteConfig } from '#components/NavigatorHeaderTabs';

export enum AppointmentsRoutes {
  FutureAppointments = 'FutureAppointments',
  CompletedAppointments = 'CompletedAppointments',
  CanceledAppointments = 'CanceledAppointments',
}

export type AppointmentsParamList = {
  [AppointmentsRoutes.FutureAppointments]: undefined;
  [AppointmentsRoutes.CompletedAppointments]: undefined;
  [AppointmentsRoutes.CanceledAppointments]: undefined;
};

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

export type AppointmentsScreenProps<RouteName extends AppointmentsRoutes> =
  StackScreenProps<AppointmentsParamList, RouteName>;
