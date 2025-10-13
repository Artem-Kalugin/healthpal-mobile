import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Onboarding, ProfileEditing } from '#screens';

import { useSelector } from '#store';

import { AuthStack } from './Auth';
import { AuthRoutes } from './Auth/types';
import { DEFAULT_STACK_OPTIONS } from './config';
import { MainStack } from './Main';
import StackModals from './Modals';
import { PasswordRecoveryStack } from './PasswordRecovery';
import { AppParamList, AppRoutes } from './types';

const App = createStackNavigator<AppParamList>();

const AppStack = () => {
  const appState = useSelector(store => store.app);
  const runtimeState = useSelector(store => store.runtime);

  return (
    <App.Navigator
      initialRouteName={
        runtimeState.token
          ? runtimeState.token.registrationComplete
            ? AppRoutes.StackMain
            : AppRoutes.ProfileEditing
          : AppRoutes.StackAuth
      }
      screenOptions={{
        ...DEFAULT_STACK_OPTIONS,
        //https://github.com/react-navigation/react-navigation/issues/12531 TODO: delete after fixed
        detachPreviousScreen: false,
      }}
    >
      {appState.shouldShowOnboarding && (
        <App.Screen
          component={Onboarding}
          name={AppRoutes.Onboarding}
        />
      )}

      <App.Screen
        key={AppRoutes.StackAuth}
        component={AuthStack}
        initialParams={{
          screen: appState.shouldShowOnboarding
            ? AuthRoutes.SignUp
            : AuthRoutes.SignIn,
        }}
        name={AppRoutes.StackAuth}
      />

      {runtimeState.token?.registrationComplete && (
        <App.Screen
          component={MainStack}
          name={AppRoutes.StackMain}
        />
      )}

      <App.Screen
        component={ProfileEditing}
        name={AppRoutes.ProfileEditing}
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
          //https://github.com/react-navigation/react-navigation/issues/12531 TODO: uncomment after fixed
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
