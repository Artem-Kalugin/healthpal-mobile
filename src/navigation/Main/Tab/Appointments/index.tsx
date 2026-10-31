import React from 'react';
import { StyleSheet, View } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
  HeaderWithThreeSections,
  NavigatorHeaderTabs,
} from '#components/infrastructure';

import { Appointments } from '#screens';

import { colors } from '#config/colors';

import { useTranslation } from '#i18n';

import { TabsConfig } from './config';
import { AppointmentsParamList, AppointmentsRoutes } from './types';

const Tabs = createMaterialTopTabNavigator<AppointmentsParamList>();

export const AppointmentsStack = () => {
  const { t } = useTranslation();

  return (
    <Tabs.Navigator
      initialRouteName={AppointmentsRoutes.FutureAppointments}
      tabBar={({ state, navigation }) => {
        return (
          <View>
            <HeaderWithThreeSections
              containerStyle={styles.headerContainer}
              leftElement={null}
              title={t('appointments.title')}
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
