import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn, SignUp } from '#screens';

import { DEFAULT_STACK_OPTIONS } from '#navigation/config';

import { AuthParamList, AuthRoutes } from './types';

const Stack = createNativeStackNavigator<AuthParamList>();

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
