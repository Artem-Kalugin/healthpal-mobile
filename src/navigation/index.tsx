import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Onboarding, ProfileEditing } from '#screens';

import { AuthStack } from './Auth';
import { DEFAULT_STACK_OPTIONS } from './config';
import { MainStack } from './Main';
import StackModals from './Modals';
import { PasswordRecoveryStack } from './PasswordRecovery';
import { AppParamList, AppRoutes } from './types';

const App = createStackNavigator<AppParamList>();

const AppStack = () => {
  return (
    <App.Navigator
      initialRouteName={AppRoutes.StackMain}
      screenOptions={{
        ...DEFAULT_STACK_OPTIONS,
        //https://github.com/react-navigation/react-navigation/issues/12531 delete after fixed
        detachPreviousScreen: false,
      }}
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
        component={MainStack}
        name={AppRoutes.StackMain}
      />

      <App.Screen
        component={StackModals}
        name={AppRoutes.StackModals}
        options={{
          headerShown: false,
          //https://github.com/react-navigation/react-navigation/issues/12531 uncomment after fixed
          //detachPreviousScreen: false,
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
