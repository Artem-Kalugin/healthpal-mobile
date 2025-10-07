import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { TabParamList } from './Tab/types';

export enum MainRoutes {
  Tab = 'MainTab',
  Search = 'MainSearch',
  DoctorDetails = 'DoctorDetails',
  ScheduleAppointment = 'ScheduleAppointment',
}

export type MainParamList = {
  [MainRoutes.Search]: undefined;
  [MainRoutes.DoctorDetails]: undefined;
  [MainRoutes.ScheduleAppointment]: undefined;
  [MainRoutes.Tab]: NavigatorScreenParams<TabParamList>;
};

export type MainScreenProps<RouteName extends MainRoutes> = StackScreenProps<
  MainParamList,
  RouteName
>;
