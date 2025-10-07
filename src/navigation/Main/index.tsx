import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { DoctorDetails } from '#screens/DoctorDetails';
import { ScheduleAppointment } from '#screens/ScheduleAppointment';
import { Search } from '#screens/Search';

import { DEFAULT_STACK_OPTIONS } from '#navigation/config';

import { FavoritesStack } from './Favorites';
import { TabStack } from './Tab';
import { MainParamList, MainRoutes } from './types';

const Stack = createStackNavigator<MainParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={MainRoutes.Tab}
      screenOptions={DEFAULT_STACK_OPTIONS}
    >
      <Stack.Screen
        component={TabStack}
        name={MainRoutes.Tab}
      />
      <Stack.Screen
        component={Search}
        name={MainRoutes.Search}
      />
      <Stack.Screen
        component={FavoritesStack}
        name={MainRoutes.Favorites}
      />
      <Stack.Screen
        component={DoctorDetails}
        name={MainRoutes.DoctorDetails}
      />
      <Stack.Screen
        component={ScheduleAppointment}
        name={MainRoutes.ScheduleAppointment}
      />
    </Stack.Navigator>
  );
};
