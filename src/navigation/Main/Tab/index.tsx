import React from 'react';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomTab, { BottomTabData } from '#components/BottomTab';

import { Appointments } from '#screens/Appointments';
import { Home } from '#screens/Home';
import { Map } from '#screens/Map';

import { colors, tabbarShadow } from '#config';

import { TabParamList, TabRoutes } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabStack = () => {
  const tabs: { [key in TabRoutes]: BottomTabData } = {
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

  return (
    <Tab.Navigator
      initialRouteName={TabRoutes.Map}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ state, navigation }) => (
        <SafeAreaView
          edges={['bottom']}
          style={[styles.container, tabbarShadow]}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <BottomTab
                {...tabs[route.name as TabRoutes]}
                key={route.name}
                isFocus={isFocused}
                onLongPress={() =>
                  navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                  })
                }
                onPress={onPress}
              />
            );
          })}
        </SafeAreaView>
      )}
    >
      <Tab.Screen
        component={Home}
        name={TabRoutes.Home}
      />
      <Tab.Screen
        component={Map}
        name={TabRoutes.Map}
      />
      <Tab.Screen
        component={Appointments}
        name={TabRoutes.Appointments}
      />
      {/* <Tab.Screen
        component={Home}
        name={TabRoutes.Profile}
      />  */}
    </Tab.Navigator>
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
