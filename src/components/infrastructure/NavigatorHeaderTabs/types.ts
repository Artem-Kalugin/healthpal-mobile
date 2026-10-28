import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';

import { IHeaderTabs } from '#components/infrastructure/HeaderTabs';

export type NavigatorHeaderTabRouteConfig = { label: string };
type NavigatorTabsConfig = Record<string, NavigatorHeaderTabRouteConfig>;

export interface ITabs {
  state: TabNavigationState<ParamListBase>;
  config: NavigatorTabsConfig;
  navigation: NavigationHelpers<
    ParamListBase,
    MaterialTopTabNavigationEventMap
  >;
  style: IHeaderTabs<unknown>['style'];
}

export type RefTab<T> = {
  setTab: (value: T) => void;
};
