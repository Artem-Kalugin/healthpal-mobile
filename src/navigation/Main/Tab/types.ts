import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { NavigatorBottomTabRouteConfig } from '#components/NavigatorBottomTabs';

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

export const TabsConfig: { [key in TabRoutes]: NavigatorBottomTabRouteConfig } =
  {
    [TabRoutes.Home]: {
      iconName: 'home',
      activeIconName: 'homeActive',
    },
    [TabRoutes.Map]: {
      iconName: 'map',
      activeIconName: 'mapActive',
    },
    [TabRoutes.Appointments]: {
      iconName: 'appointments',
      activeIconName: 'appointmentsActive',
    },
    [TabRoutes.Profile]: {
      iconName: 'profile',
      activeIconName: 'profileActive',
    },
  };

export type TabScreenProps<RouteName extends TabRoutes> = StackScreenProps<
  TabParamList,
  RouteName
>;
