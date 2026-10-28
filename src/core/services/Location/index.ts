import * as Location from 'expo-location';

import { Logger } from '#services/Logger';
import { LocationPermission, PermissionManager } from '#services/Permissions';

type LocationStorePort = {
  getIsBlocked: () => boolean;
  setIsBlocked: (value: boolean) => void;
};

let storeInstance: LocationStorePort | null = null;

export class LocationService {
  static injectStore(port: LocationStorePort) {
    storeInstance = port;
  }

  private static getStore() {
    if (!storeInstance) {
      throw new Error('Store not initialized in LocationService');
    }
    return storeInstance;
  }

  static async getCurrentLocation() {
    try {
      const isSilent = this.getStore().getIsBlocked();

      const permission = isSilent
        ? await PermissionManager.check(LocationPermission)
        : await PermissionManager.request(LocationPermission);

      const statuses =
        'requestStatus' in permission
          ? [permission.originalStatus, permission.requestStatus]
          : [permission.originalStatus];

      if ((isSilent || statuses.includes('blocked')) && !permission.allowed) {
        this.getStore().setIsBlocked(true);
        return;
      }

      this.getStore().setIsBlocked(false);

      const perf = performance.now();

      const res = await Location.getLastKnownPositionAsync({});

      Logger.custom(
        'location',
        `got user location in ${((performance.now() - perf) / 1000).toFixed(3)}s`,
        JSON.stringify(res),
      );

      return res;
    } catch (err) {
      Logger.error('LocationService.getCurrentLocation failed', err);
    }
  }
}
