import { StackScreenProps } from '@react-navigation/stack';

export enum FavoritesRoutes {
  FavoriteDoctors = 'FavoriteDoctors',
  FavoriteMedicalCenters = 'FavoriteMedicalCenters',
}

export type FavoritesParamList = {
  [FavoritesRoutes.FavoriteDoctors]: undefined;
  [FavoritesRoutes.FavoriteMedicalCenters]: undefined;
};

export type FavoritesScreenProps<RouteName extends FavoritesRoutes> =
  StackScreenProps<FavoritesParamList, RouteName>;
