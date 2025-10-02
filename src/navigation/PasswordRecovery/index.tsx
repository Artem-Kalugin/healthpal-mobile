import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import {
  PasswordRecoveryCodeInput,
  PasswordRecoveryEmailInput,
  PasswordRecoverySetPassword,
} from '#screens';

import { DEFAULT_STACK_OPTIONS } from '#navigation/config';

import { PasswordRecoveryParamList, PasswordRecoveryRoutes } from './types';

const Stack = createStackNavigator<PasswordRecoveryParamList>();

export const PasswordRecoveryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={PasswordRecoveryRoutes.PasswordRecoveryCodeInput}
      screenOptions={DEFAULT_STACK_OPTIONS}
    >
      <Stack.Screen
        component={PasswordRecoveryEmailInput}
        name={PasswordRecoveryRoutes.PasswordRecoveryEmailInput}
      />
      <Stack.Screen
        component={PasswordRecoveryCodeInput}
        name={PasswordRecoveryRoutes.PasswordRecoveryCodeInput}
      />
      <Stack.Screen
        component={PasswordRecoverySetPassword}
        name={PasswordRecoveryRoutes.PasswordRecoverySetPassword}
      />
    </Stack.Navigator>
  );
};
