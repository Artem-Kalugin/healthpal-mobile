import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { FavoritesParamList } from './Favorites/types';
import { TabParamList } from './Tab/types';

export enum MainRoutes {
  Tab = 'MainTab',
  Favorites = 'MainFavorites',
  Search = 'MainSearch',
  Notifications = 'MainNotifications',
  DoctorDetails = 'MainDoctorDetails',
  ScheduleAppointment = 'MainScheduleAppointment',
}

export type MainParamList = {
  [MainRoutes.Search]: undefined;
  [MainRoutes.DoctorDetails]: undefined;
  [MainRoutes.ScheduleAppointment]: undefined;
  [MainRoutes.Notifications]: undefined;
  [MainRoutes.Favorites]: NavigatorScreenParams<FavoritesParamList>;
  [MainRoutes.Tab]: NavigatorScreenParams<TabParamList>;
};

export type MainScreenProps<RouteName extends MainRoutes> = StackScreenProps<
  MainParamList,
  RouteName
>;
