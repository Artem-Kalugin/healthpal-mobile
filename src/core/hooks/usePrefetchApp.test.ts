import { act } from 'react';

import { renderHook } from '@testing-library/react-native';

import DoctorAPI from '#api/Doctor';
import MedicalCentersAPI from '#api/MedicalCenters';
import OnboardingAPI from '#api/Onboarding';
import UserAPI from '#api/User';

import { LocationService } from '#services/Location';

import { store } from '#store';
import { AppActions } from '#store/slices/app';
import { RuntimeActions } from '#store/slices/runtime';

import { usePrefetchApp } from './usePrefetchApp';

jest.mock('#services/Location');
jest.mock('#api/Doctor');
jest.mock('#api/MedicalCenters');
jest.mock('#api/Onboarding');
jest.mock('#api/User');
jest.mock('../utils', () => ({
  delay: jest.fn().mockResolvedValue(undefined),
}));

describe('usePrefetchApp', () => {
  const mockPrefetchFn = jest.fn().mockResolvedValue(undefined);

  afterEach(() => {
    jest.clearAllMocks();

    store.dispatch(RuntimeActions.setToken(undefined));
    store.dispatch(AppActions.setShouldShowOnboarding(false));

    (DoctorAPI.usePrefetch as jest.Mock).mockReturnValue(mockPrefetchFn);
    (UserAPI.usePrefetch as jest.Mock).mockReturnValue(mockPrefetchFn);
    (MedicalCentersAPI.usePrefetch as jest.Mock).mockReturnValue(
      mockPrefetchFn,
    );
    (OnboardingAPI.usePrefetch as jest.Mock).mockReturnValue(mockPrefetchFn);
  });

  it('возвращает функцию prefetchApp и флаг isPrefetching', () => {
    const { result } = renderHook(() => usePrefetchApp());

    expect(result.current).toHaveProperty('prefetchApp');
    expect(result.current).toHaveProperty('isPrefetching');
    expect(typeof result.current.prefetchApp).toBe('function');
    expect(typeof result.current.isPrefetching).toBe('boolean');
  });

  it('isPrefetching инитится как false, становится true во время загрузки и false после завершения', async () => {
    const { result } = renderHook(() => usePrefetchApp());

    expect(result.current.isPrefetching).toBe(false);

    let prefetchPromise: Promise<any>;

    act(() => {
      prefetchPromise = result.current.prefetchApp();
    });

    expect(result.current.isPrefetching).toBe(true);

    await act(async () => {
      await prefetchPromise;
    });

    expect(result.current.isPrefetching).toBe(false);
  });

  it('успешно завершается для неавторизованного пользователя', async () => {
    store.dispatch(RuntimeActions.setToken(undefined));

    const { result } = renderHook(() => usePrefetchApp());

    await act(async () => {
      await expect(result.current.prefetchApp()).resolves.not.toThrow();
    });

    expect(result.current.isPrefetching).toBe(false);
  });

  it('успешно завершается для авторизованного пользователя', async () => {
    //@ts-expect-error
    store.dispatch(RuntimeActions.setToken({ registrationComplete: true }));

    (LocationService.getCurrentLocation as jest.Mock).mockResolvedValue({
      coords: { latitude: 55.7558, longitude: 37.6173 },
    });

    const { result } = renderHook(() => usePrefetchApp());

    await act(async () => {
      await expect(result.current.prefetchApp()).resolves.not.toThrow();
    });

    expect(result.current.isPrefetching).toBe(false);
  });

  it('успешно завершается даже если геолокация недоступна', async () => {
    //@ts-expect-error
    store.dispatch(RuntimeActions.setToken({ registrationComplete: true }));

    (LocationService.getCurrentLocation as jest.Mock).mockRejectedValue(
      new Error('Location not available'),
    );

    const { result } = renderHook(() => usePrefetchApp());

    await act(async () => {
      await expect(result.current.prefetchApp()).resolves.not.toThrow();
    });

    expect(result.current.isPrefetching).toBe(false);
  });

  it('успешно завершается когда нужно показать онбординг', async () => {
    store.dispatch(AppActions.setShouldShowOnboarding(true));

    const { result } = renderHook(() => usePrefetchApp());

    await act(async () => {
      await expect(result.current.prefetchApp()).resolves.not.toThrow();
    });

    expect(result.current.isPrefetching).toBe(false);
  });

  it('можно вызвать prefetchApp несколько раз', async () => {
    const { result } = renderHook(() => usePrefetchApp());

    await act(async () => {
      await result.current.prefetchApp();
      await result.current.prefetchApp();
    });

    expect(result.current.isPrefetching).toBe(false);
  });
});
