import React from 'react';
import { StyleSheet, View } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HeaderWithThreeSections from '#components/infrastructure/HeaderWithThreeSections';
import { NavigatorHeaderTabs } from '#components/infrastructure/NavigatorHeaderTabs';

import { Favorites } from '#screens/Favorites';

import { colors } from '#config';

import { FavoritesParamList, FavoritesRoutes, TabsConfig } from './types';

const Tabs = createMaterialTopTabNavigator<FavoritesParamList>();

export const FavoritesStack = () => {
  return (
    <Tabs.Navigator
      initialRouteName={FavoritesRoutes.FavoriteDoctors}
      tabBar={({ state, navigation }) => {
        return (
          <View>
            <HeaderWithThreeSections
              containerStyle={styles.headerContainer}
              title="Избранное"
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
        component={Favorites}
        name={FavoritesRoutes.FavoriteDoctors}
      />
      <Tabs.Screen
        component={Favorites}
        name={FavoritesRoutes.FavoriteMedicalCenters}
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
