import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Onboarding, SignIn, SignUp } from '#screens';

import { DEFAULT_STACK_OPTIONS } from './config';
import StackModals from './Modals';
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
        component={SignUp}
        name={AppRoutes.SignUp}
      />
      <App.Screen
        component={SignIn}
        name={AppRoutes.SignIn}
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
