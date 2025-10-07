import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigatorBottomTabs } from '#components/NavigatorBottomTabs';

import { Home } from '#screens/Home';
import { Map } from '#screens/Map';

import { FavoritesStack } from '../Favorites';
import { AppointmentsStack } from './Appointments';
import { TabParamList, TabRoutes, TabsConfig } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={TabRoutes.Map}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ state, navigation }) => (
        <NavigatorBottomTabs
          config={TabsConfig}
          navigation={navigation}
          state={state}
        />
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
        component={AppointmentsStack}
        name={TabRoutes.Appointments}
      />
      <Tab.Screen
        component={FavoritesStack}
        name={TabRoutes.Profile}
      />
    </Tab.Navigator>
  );
};
