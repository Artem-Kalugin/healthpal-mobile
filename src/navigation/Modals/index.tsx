import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { DateTimePicker, Dialog, ImagePicker, Select } from '#modals';

import { ModalsParamList, ModalsRoutes } from './types';

const Modals = createStackNavigator<ModalsParamList>();

export const StackModals = () => {
  return (
    <Modals.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
        presentation: 'transparentModal',
      }}
    >
      <Modals.Screen
        component={Select}
        name={ModalsRoutes.Select}
      />
      <Modals.Screen
        component={DateTimePicker}
        name={ModalsRoutes.DateTimePicker}
      />
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
