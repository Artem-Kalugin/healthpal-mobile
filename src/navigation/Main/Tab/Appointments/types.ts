import { StackScreenProps } from '@react-navigation/stack';

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

export type AppointmentsScreenProps<RouteName extends AppointmentsRoutes> =
  StackScreenProps<AppointmentsParamList, RouteName>;
