import * as Location from 'expo-location';

import Logger from '#services/Logger';

import { store } from '#store';

import { LocationService } from '.';
import { PermissionManager } from '../Permissions';

jest.mock('../Permissions');
jest.mock('#store', () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(),
  },
}));
jest.mock('expo-location');
jest.mock('#services/Logger');

describe('LocationService', () => {
  const dispatch = store.dispatch as jest.Mock;
  const getState = store.getState as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('диспатчит true и не вызывает getLastKnownPositionAsync, когда permission blocked', async () => {
    getState.mockReturnValue({
      app: { isUserBlockedLocationPermission: false },
    });
    (PermissionManager.request as jest.Mock).mockResolvedValue({
      originalStatus: 'blocked',
      requestStatus: 'blocked',
      allowed: false,
    });

    await LocationService.getCurrentLocation();

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'app/setIsUserBlockedLocationPermission',
        payload: true,
      }),
    );
    expect(Location.getLastKnownPositionAsync).not.toHaveBeenCalled();
  });

  it('возвращает местоположение и диспатчит false, когда permission allowed', async () => {
    const mockLocation = { coords: { latitude: 1, longitude: 2 } };
    getState.mockReturnValue({
      app: { isUserBlockedLocationPermission: false },
    });
    (PermissionManager.request as jest.Mock).mockResolvedValue({
      originalStatus: 'granted',
      requestStatus: 'granted',
      allowed: true,
    });
    (Location.getLastKnownPositionAsync as jest.Mock).mockResolvedValue(
      mockLocation,
    );

    const res = await LocationService.getCurrentLocation();

    expect(res).toBe(mockLocation);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'app/setIsUserBlockedLocationPermission',
        payload: false,
      }),
    );
    expect(Location.getLastKnownPositionAsync).toHaveBeenCalledTimes(1);
  });
});
