// useAppLifecycle.test.ts
import BootSplash from 'react-native-bootsplash';

import { renderHook, waitFor } from '@testing-library/react-native';
import { useLocales } from 'expo-localization';

import { TokenService } from '#services/Token';

import { getLanguage } from '#i18n';

import { useAppData } from './useAppData';
import { useAppLifecycle } from './useAppLifecycle';

jest.mock('react-native-bootsplash');
jest.mock('#services/Token');
jest.mock('./useAppData');
jest.mock('expo-localization');

const mockUseSelector = jest.fn();
jest.mock('#store', () => ({ useSelector: () => mockUseSelector() }));

describe('useAppLifecycle', () => {
  const mockPrefetchApp = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppData as jest.Mock).mockReturnValue({
      prefetchApp: mockPrefetchApp,
    });
    mockPrefetchApp.mockResolvedValue(undefined);
    (TokenService.load as jest.Mock).mockResolvedValue(undefined);
    mockUseSelector.mockReturnValue(undefined);
    (useLocales as jest.Mock).mockReturnValue([{ languageCode: 'en' }]);
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

  it('применяет сохранённый язык, а не язык устройства', async () => {
    mockUseSelector.mockReturnValue('ru');
    (useLocales as jest.Mock).mockReturnValue([{ languageCode: 'en' }]);

    renderHook(() => useAppLifecycle());

    await waitFor(() => {
      expect(getLanguage()).toBe('ru');
    });
  });

  it('следует языку устройства, если язык не сохранён', async () => {
    (useLocales as jest.Mock).mockReturnValue([{ languageCode: 'ru' }]);

    renderHook(() => useAppLifecycle());

    await waitFor(() => {
      expect(getLanguage()).toBe('ru');
    });
  });
});
