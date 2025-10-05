import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { DEFAULT_STACK_OPTIONS } from '#navigation/config';

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
        component={TabStack}
        name={MainRoutes.Search}
      />
    </Stack.Navigator>
  );
};
