import { NavigatorHeaderTabRouteConfig } from '#components/infrastructure/NavigatorHeaderTabs';

import { FavoritesRoutes } from './types';

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
