import { StackScreenProps } from '@react-navigation/stack';

export enum TabRoutes {
  Home = 'TabHome',
  Map = 'TabMap',
  Appointments = 'TabAppointments',
  Profile = 'TabProfile',
}

export type TabParamList = {
  [TabRoutes.Home]: undefined;
  [TabRoutes.Map]: undefined;
  [TabRoutes.Appointments]: undefined;
  [TabRoutes.Profile]: undefined;
};

export type TabScreenProps<RouteName extends TabRoutes> = StackScreenProps<
  TabParamList,
  RouteName
>;
