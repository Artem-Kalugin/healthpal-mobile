import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { DateTimePicker, Dialog, ImagePicker } from '#modals';
import Select from '#modals/Select';

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

export default StackModals;
