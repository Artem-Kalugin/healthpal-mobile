import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Onboarding, ProfileEditing } from '#screens';

import { AuthStack } from './Auth';
import { DEFAULT_STACK_OPTIONS } from './config';
import StackModals from './Modals';
import { PasswordRecoveryStack } from './PasswordRecovery';
import { AppParamList, AppRoutes } from './types';

const App = createStackNavigator<AppParamList>();

const AppStack = () => {
  return (
    <App.Navigator
      initialRouteName={AppRoutes.Onboarding}
      screenOptions={DEFAULT_STACK_OPTIONS}
    >
      <App.Screen
        component={Onboarding}
        name={AppRoutes.Onboarding}
      />
      <App.Screen
        component={ProfileEditing}
        name={AppRoutes.ProfileEditing}
      />
      <App.Screen
        component={AuthStack}
        name={AppRoutes.StackAuth}
      />
      <App.Screen
        component={PasswordRecoveryStack}
        name={AppRoutes.StackPasswordRecovery}
      />

      <App.Screen
        component={StackModals}
        name={AppRoutes.StackModals}
        options={{
          headerShown: false,
          detachPreviousScreen: false,
          presentation: 'transparentModal',
          cardStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: () => ({}),
        }}
      />
    </App.Navigator>
  );
};

export default AppStack;
