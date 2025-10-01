import React from 'react';
import { View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { ModalsParamList, ModalsRoutes } from './types';

const Modals = createStackNavigator<ModalsParamList>();

const StackModals = () => {
  return (
    <Modals.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Modals.Screen
        component={View}
        name={ModalsRoutes.Dialog}
      />
    </Modals.Navigator>
  );
};

export default StackModals;
