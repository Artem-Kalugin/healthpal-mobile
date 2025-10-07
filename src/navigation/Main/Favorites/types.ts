import { StackScreenProps } from '@react-navigation/stack';

import { NavigatorHeaderTabRouteConfig } from '#components/NavigatorHeaderTabs';

export enum FavoritesRoutes {
  FavoriteDosctors = 'FavoriteDoctors',
  FavoriteMedicalCenters = 'FavoriteMedicalCenters',
}

export type FavoritesParamList = {
  [FavoritesRoutes.FavoriteDosctors]: undefined;
  [FavoritesRoutes.FavoriteMedicalCenters]: undefined;
};

export const TabsConfig: {
  [key in FavoritesRoutes]: NavigatorHeaderTabRouteConfig;
} = {
  [FavoritesRoutes.FavoriteDosctors]: {
    label: 'Врачи',
  },
  [FavoritesRoutes.FavoriteMedicalCenters]: {
    label: 'Мед. центры',
  },
};

export type FavoritesScreenProps<RouteName extends FavoritesRoutes> =
  StackScreenProps<FavoritesParamList, RouteName>;
