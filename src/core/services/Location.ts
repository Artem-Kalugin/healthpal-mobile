import * as Location from 'expo-location';

import Debug from '#utils/debug';

import { PermissionManager } from './Permissions';
import { LocationPermission } from './Permissions/config';

export class LocationService {
  static async getCurrentLocation() {
    try {
      const permission = await PermissionManager.request(LocationPermission);

      if (!permission) {
        return;
      }

      const perf = performance.now();
      const res = await Location.getCurrentPositionAsync({});

      Debug.custom(
        'location',
        `got user location in ${((performance.now() - perf) / 1000).toFixed(3)}s`,
        JSON.stringify(res),
      );

      return res;
    } catch {}
  }
}
