import * as Location from 'expo-location';

import { PermissionManager } from '#services/Permissions';

import { LocationService } from '.';

jest.mock('#services/Permissions');
jest.mock('expo-location');
jest.mock('#services/Logger');

describe('LocationService', () => {
  const getIsBlocked = jest.fn();
  const setIsBlocked = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    LocationService.injectStore({ getIsBlocked, setIsBlocked });
  });

  it('ставит blocked=true и не вызывает getLastKnownPositionAsync, когда permission blocked', async () => {
    getIsBlocked.mockReturnValue(false);
    (PermissionManager.request as jest.Mock).mockResolvedValue({
      originalStatus: 'blocked',
      requestStatus: 'blocked',
      allowed: false,
    });

    await LocationService.getCurrentLocation();

    expect(setIsBlocked).toHaveBeenCalledTimes(1);
    expect(setIsBlocked).toHaveBeenCalledWith(true);
    expect(Location.getLastKnownPositionAsync).not.toHaveBeenCalled();
  });

  it('возвращает местоположение и ставит blocked=false, когда permission allowed', async () => {
    const mockLocation = { coords: { latitude: 1, longitude: 2 } };
    getIsBlocked.mockReturnValue(false);
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
    expect(setIsBlocked).toHaveBeenCalledTimes(1);
    expect(setIsBlocked).toHaveBeenCalledWith(false);
    expect(Location.getLastKnownPositionAsync).toHaveBeenCalledTimes(1);
  });
});
