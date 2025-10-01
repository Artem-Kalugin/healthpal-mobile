import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SignIn, SignUp } from '#screens';

import { DEFAULT_STACK_OPTIONS } from '#navigation/config';

import { AuthParamList, AuthRoutes } from './types';

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={AuthRoutes.SignUp}
      screenOptions={DEFAULT_STACK_OPTIONS}
    >
      <Stack.Screen
        component={SignIn}
        name={AuthRoutes.SignIn}
      />
      <Stack.Screen
        component={SignUp}
        name={AuthRoutes.SignUp}
      />
    </Stack.Navigator>
  );
};
