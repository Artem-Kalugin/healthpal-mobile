import React, { useEffect, useRef } from 'react';

import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';

import { HeaderTabs, IHeaderTabs, RefHeaderTab } from './TabsHeader';

export type NavigatorHeaderTabRouteConfig = { label: string };
type NavigatorTabsConfig = Record<string, NavigatorHeaderTabRouteConfig>;

interface ITabs {
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

export const NavigatorHeaderTabs = ({
  state,
  config,
  navigation,
  style,
}: ITabs) => {
  const customConfigArrayed = Object.values(config);
  const tabsRef = useRef<RefHeaderTab<unknown>>(null);

  const onPress = (
    customRouteConfig: NavigatorHeaderTabRouteConfig,
    tabIndex: number,
  ) => {
    const route = state.routes[tabIndex];

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (state.index !== tabIndex && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const onLongPress = (
    customRouteConfig: NavigatorHeaderTabRouteConfig,
    tabIndex: number,
  ) => {
    const route = state.routes[tabIndex];

    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  const tabs = state.routeNames.map(routeName => config[routeName]);

  useEffect(() => {
    tabsRef.current?.setTab(customConfigArrayed[state.index]);
  }, [state.index]);

  return (
    <HeaderTabs
      data={tabs}
      style={style}
      tabRef={tabsRef}
      onLongPress={onLongPress}
      onPress={onPress}
      valueExtractor={item => item.label}
    />
  );
};
