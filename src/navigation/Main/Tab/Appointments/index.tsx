import React from 'react';
import { StyleSheet, View } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import { NavigatorHeaderTabs } from '#components/NavigatorHeaderTabs';

import { Appointments } from '#screens/Appointments';

import { colors } from '#config';

import { AppointmentsParamList, AppointmentsRoutes, TabsConfig } from './types';

const Tabs = createMaterialTopTabNavigator<AppointmentsParamList>();

export const AppointmentsStack = () => {
  return (
    <Tabs.Navigator
      initialRouteName={AppointmentsRoutes.FutureAppointments}
      tabBar={({ state, navigation }) => {
        return (
          <View>
            <HeaderWithThreeSections
              containerStyle={styles.headerContainer}
              leftElement={null}
              title="Мои записи"
              titleTextAlign="center"
            />

            <NavigatorHeaderTabs
              config={TabsConfig}
              navigation={navigation}
              state={state}
              style={styles.tabsContainer}
            />
          </View>
        );
      }}
    >
      <Tabs.Screen
        component={Appointments}
        name={AppointmentsRoutes.FutureAppointments}
      />
      <Tabs.Screen
        component={Appointments}
        name={AppointmentsRoutes.CompletedAppointments}
      />
      <Tabs.Screen
        component={Appointments}
        name={AppointmentsRoutes.CanceledAppointments}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 2,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
  tabsContainer: {
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale['200'],
  },
});
