import { NavigatorHeaderTabRouteConfig } from '#components/infrastructure';

import { FavoritesRoutes } from './types';

export const TabsConfig: {
  [key in FavoritesRoutes]: NavigatorHeaderTabRouteConfig;
} = {
  [FavoritesRoutes.FavoriteDoctors]: {
    label: 'favorites.FavoriteDoctors.tab',
  },
  [FavoritesRoutes.FavoriteMedicalCenters]: {
    label: 'favorites.FavoriteMedicalCenters.tab',
  },
};
