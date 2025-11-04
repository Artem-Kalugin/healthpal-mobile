// useAppLifecycle.test.ts
import BootSplash from 'react-native-bootsplash';

import { renderHook, waitFor } from '@testing-library/react-native';

import { TokenService } from '#services/Token';

import useAppLifecycle from './useAppLifecycle';
import { usePrefetchApp } from './usePrefetchApp';

jest.mock('react-native-bootsplash');
jest.mock('#services/Token');
jest.mock('./usePrefetchApp');

describe('useAppLifecycle', () => {
  const mockPrefetchApp = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePrefetchApp as jest.Mock).mockReturnValue({
      prefetchApp: mockPrefetchApp,
    });
    mockPrefetchApp.mockResolvedValue(undefined);
    (TokenService.load as jest.Mock).mockResolvedValue(undefined);
  });

  it('должен вызываться единожды и соблюдать правильный порядок вызовов', async () => {
    const callOrder: string[] = [];

    (TokenService.load as jest.Mock).mockImplementation(async () => {
      callOrder.push('token');
    });
    (BootSplash.hide as jest.Mock).mockImplementation(() => {
      callOrder.push('splash');
    });
    mockPrefetchApp.mockImplementation(async () => {
      callOrder.push('prefetch');
    });

    renderHook(() => useAppLifecycle());

    await waitFor(() => {
      expect(callOrder).toEqual(['token', 'splash', 'prefetch']);
    });
  });

  it('должен установить isReadyToRender=true даже при ошибке', async () => {
    (TokenService.load as jest.Mock).mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useAppLifecycle());

    await waitFor(() => {
      expect(result.current.isReadyToRender).toBe(true);
    });
  });

  it('НЕ должен вызывать prefetchApp если TokenService.load упал', async () => {
    (TokenService.load as jest.Mock).mockRejectedValue(new Error('fail'));

    renderHook(() => useAppLifecycle());

    await waitFor(() => {
      expect(mockPrefetchApp).not.toHaveBeenCalled();
    });
  });

  it('должен скрыть splash screen даже при ошибке prefetch', async () => {
    mockPrefetchApp.mockRejectedValue(new Error('prefetch fail'));

    renderHook(() => useAppLifecycle());

    await waitFor(() => {
      expect(BootSplash.hide).toHaveBeenCalled();
    });
  });
});
