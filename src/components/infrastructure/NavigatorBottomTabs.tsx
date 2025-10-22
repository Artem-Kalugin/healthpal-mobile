import React, { useEffect } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';

import { Icon, IconNames } from '#ui-kit';

import { colors, tabbarShadow, withCustomAnimation } from '#config';

export type NavigatorBottomTabRouteConfig = {
  iconName: IconNames;
  activeIconName: IconNames;
};
type NavigatorTabsConfig = Record<string, NavigatorBottomTabRouteConfig>;

export interface IBottomTabs {
  state: TabNavigationState<ParamListBase>;
  config: NavigatorTabsConfig;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  style?: StyleProp<ViewStyle>;
}

export interface IBottomTab {
  item: NavigatorBottomTabRouteConfig;
  isActive: boolean;
  onPress?: (item: NavigatorBottomTabRouteConfig) => void;
  onLongPress?: (item: NavigatorBottomTabRouteConfig) => void;
}

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

const BottomTab: React.FC<IBottomTab> = ({
  item,
  isActive,
  onPress,
  onLongPress,
}) => {
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withCustomAnimation(+!!isActive);
  }, [isActive]);

  const rContainer = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: animationProgress.value,
        },
      ],
    }),
    [],
  );

  const rActiveIconContainer = useAnimatedStyle(
    () => ({
      opacity: animationProgress.value,
    }),
    [],
  );

  const rIconContainer = useAnimatedStyle(
    () => ({
      opacity: 1 - animationProgress.value,
    }),
    [],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.tabWrapper}
      onLongPress={() => onLongPress && onLongPress(item)}
      onPress={() => onPress && onPress(item)}
    >
      <View style={styles.tabContainer}>
        <Animated.View style={[styles.tabAbsoluteLayer, rIconContainer]}>
          <Icon name={item.iconName} />
        </Animated.View>

        <Animated.View style={[styles.tabAbsoluteLayer, rActiveIconContainer]}>
          <Icon name={item.activeIconName} />
        </Animated.View>

        <Animated.View style={[styles.tabIconWrapper, rContainer]} />
      </View>
    </TouchableOpacity>
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
  tabWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabAbsoluteLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    width: 48,
    aspectRatio: 1,
  },
  tabIconWrapper: {
    width: 48,
    aspectRatio: 1,
    zIndex: -1,
    borderRadius: 48,
    backgroundColor: colors.grayscale['200'],
  },
});
