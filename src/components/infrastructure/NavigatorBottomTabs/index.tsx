import React from 'react';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { tabbarShadow } from '#config';
import { colors } from '#config/colors';

import { BottomTab } from './components/BottomTab';
import { IBottomTabs, NavigatorBottomTabRouteConfig } from './types';

export const NavigatorBottomTabs = ({
  state,
  config,
  navigation,
  style,
}: IBottomTabs) => {
  const onPress = (
    customRouteConfig: NavigatorBottomTabRouteConfig,
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
    customRouteConfig: NavigatorBottomTabRouteConfig,
    tabIndex: number,
  ) => {
    const route = state.routes[tabIndex];

    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, tabbarShadow, StyleSheet.flatten(style)]}
    >
      {state.routes.map((route, index) => {
        return (
          <BottomTab
            key={route.name}
            isActive={state.index === index}
            item={config[route.name]}
            onLongPress={item => onLongPress(item, index)}
            onPress={item => onPress(item, index)}
          />
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: colors.white,
  },
});
