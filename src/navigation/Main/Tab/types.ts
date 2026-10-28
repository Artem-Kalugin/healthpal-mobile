import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AppointmentsParamList } from './Appointments/types';

export enum TabRoutes {
  Home = 'TabHome',
  Map = 'TabMap',
  Appointments = 'TabAppointments',
  Profile = 'TabProfile',
}

export type TabParamList = {
  [TabRoutes.Home]: undefined;
  [TabRoutes.Map]: undefined;
  [TabRoutes.Appointments]: NavigatorScreenParams<AppointmentsParamList>;
  [TabRoutes.Profile]: undefined;
};

export type TabScreenProps<RouteName extends TabRoutes> = StackScreenProps<
  TabParamList,
  RouteName
>;
