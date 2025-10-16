import { StackScreenProps } from '@react-navigation/stack';

import { NavigatorHeaderTabRouteConfig } from '#components/NavigatorHeaderTabs';

export enum FavoritesRoutes {
  FavoriteDoctors = 'FavoriteDoctors',
  FavoriteMedicalCenters = 'FavoriteMedicalCenters',
}

export type FavoritesParamList = {
  [FavoritesRoutes.FavoriteDoctors]: undefined;
  [FavoritesRoutes.FavoriteMedicalCenters]: undefined;
};

export const TabsConfig: {
  [key in FavoritesRoutes]: NavigatorHeaderTabRouteConfig;
} = {
  [FavoritesRoutes.FavoriteDoctors]: {
    label: 'Врачи',
  },
  [FavoritesRoutes.FavoriteMedicalCenters]: {
    label: 'Мед. центры',
  },
};

export type FavoritesScreenProps<RouteName extends FavoritesRoutes> =
  StackScreenProps<FavoritesParamList, RouteName>;
