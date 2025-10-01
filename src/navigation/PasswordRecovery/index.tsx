import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import {
  PasswordRecoveryCodeInput,
  PasswordRecoveryPhoneInput,
  PasswordRecoverySetPassword,
} from '#screens';

import { DEFAULT_STACK_OPTIONS } from '#navigation/config';

import { PasswordRecoveryParamList, PasswordRecoveryRoutes } from './types';

const Stack = createStackNavigator<PasswordRecoveryParamList>();

export const PasswordRecoveryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={PasswordRecoveryRoutes.PasswordRecoveryPhoneInput}
      screenOptions={DEFAULT_STACK_OPTIONS}
    >
      <Stack.Screen
        component={PasswordRecoveryPhoneInput}
        name={PasswordRecoveryRoutes.PasswordRecoveryPhoneInput}
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
