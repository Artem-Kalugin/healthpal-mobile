import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Dialog } from '#modals';
import { ImagePicker } from '#modals/ImagePicker';

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
        component={Dialog}
        name={ModalsRoutes.Dialog}
      />
      <Modals.Screen
        component={ImagePicker}
        name={ModalsRoutes.ImagePicker}
      />
    </Modals.Navigator>
  );
};

export default StackModals;
