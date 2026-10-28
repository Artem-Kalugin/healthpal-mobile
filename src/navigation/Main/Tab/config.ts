import { NavigatorBottomTabRouteConfig } from '#components/infrastructure';

import { TabRoutes } from './types';

export const TabsConfig: { [key in TabRoutes]: NavigatorBottomTabRouteConfig } =
  {
    [TabRoutes.Home]: {
      iconName: 'home',
      activeIconName: 'homeActive',
    },
    [TabRoutes.Map]: {
      iconName: 'map',
      activeIconName: 'mapActive',
    },
    [TabRoutes.Appointments]: {
      iconName: 'appointments',
      activeIconName: 'appointmentsActive',
    },
    [TabRoutes.Profile]: {
      iconName: 'profile',
      activeIconName: 'profileActive',
    },
  };
