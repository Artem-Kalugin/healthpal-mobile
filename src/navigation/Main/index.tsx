import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Search } from '#screens/Search';

import { DEFAULT_STACK_OPTIONS } from '#navigation/config';

import { TabStack } from './Tab';
import { MainParamList, MainRoutes } from './types';

const Stack = createStackNavigator<MainParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={MainRoutes.Search}
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
    </Stack.Navigator>
  );
};
