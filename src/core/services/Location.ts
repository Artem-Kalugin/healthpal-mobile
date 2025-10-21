import * as Location from 'expo-location';

import Debug from '#utils/debug';

import { store } from '#store';
import { AppActions } from '#store/slices/app';

import { PermissionManager } from './Permissions';
import { LocationPermission } from './Permissions/config';

export class LocationService {
  static async getCurrentLocation() {
    try {
      const isSilent = store.getState().app.isUserBlockedLocationPermission;

      const permission = await PermissionManager.request(
        LocationPermission,
        //@ts-expect-error
        isSilent,
      );

      if (
        (isSilent ||
          [permission.originalStatus, permission.requestStatus].includes(
            'blocked',
          )) &&
        !permission.allowed
      ) {
        store.dispatch(AppActions.setIsUserBlockedLocationPermission(true));
        return;
      }

      store.dispatch(AppActions.setIsUserBlockedLocationPermission(false));

      const perf = performance.now();

      const res = await Location.getLastKnownPositionAsync({});

      Debug.custom(
        'location',
        `got user location in ${((performance.now() - perf) / 1000).toFixed(3)}s`,
        JSON.stringify(res),
      );

      return res;
    } catch (err) {
      Debug.error('LocationService.getCurrentLocation failed', err);
    }
  }
}
