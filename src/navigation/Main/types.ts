import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { TabParamList } from './Tab/types';

export enum MainRoutes {
  Tab = 'Tab',
  Search = 'Search',
}

export type MainParamList = {
  [MainRoutes.Search]: undefined;
  [MainRoutes.Tab]: NavigatorScreenParams<TabParamList>;
};

export type MainScreenProps<RouteName extends MainRoutes> = StackScreenProps<
  MainParamList,
  RouteName
>;
