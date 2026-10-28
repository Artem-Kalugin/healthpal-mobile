import { StyleProp, ViewStyle } from 'react-native';

import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';

import { IBottomTab } from './components/BottomTab';

export type NavigatorBottomTabRouteConfig = IBottomTab['item'];
type NavigatorTabsConfig = Record<string, NavigatorBottomTabRouteConfig>;

export interface IBottomTabs {
  state: TabNavigationState<ParamListBase>;
  config: NavigatorTabsConfig;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  style?: StyleProp<ViewStyle>;
}
