// useAppLifecycle.test.ts
import BootSplash from 'react-native-bootsplash';
import { YamapInstance } from 'react-native-yamap-plus';

import { renderHook, waitFor } from '@testing-library/react-native';
import { useLocales } from 'expo-localization';

import { TokenService } from '#services/Token';

import { getLanguage } from '#i18n';

import { useAppData } from './useAppData';
import { useAppLifecycle } from './useAppLifecycle';

jest.mock('react-native-bootsplash');
jest.mock('react-native-yamap-plus', () => ({
  YamapInstance: {
    setLocale: jest.fn().mockResolvedValue(undefined),
    init: jest.fn().mockResolvedValue(undefined),
  },
}));
jest.mock('expo-constants', () => ({
  expoConfig: { extra: { apiKeys: { yandexMapKit: 'map-key' } } },
}));
jest.mock('#services/Token');
jest.mock('./useAppData');
jest.mock('expo-localization');

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();
jest.mock('#store', () => ({
  useSelector: () => mockUseSelector(),
  useDispatch: () => mockDispatch,
}));
jest.mock('#store/slices/runtime', () => ({
  RuntimeActions: {
    setMapLanguage: (language: string) => ({
      type: 'runtime/setMapLanguage',
      payload: language,
    }),
  },
}));

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
    (YamapInstance.setLocale as jest.Mock).mockResolvedValue(undefined);
    (YamapInstance.init as jest.Mock).mockResolvedValue(undefined);
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

  it('ставит локаль карты до её инициализации', async () => {
    const callOrder: string[] = [];

    (YamapInstance.setLocale as jest.Mock).mockImplementation(async () => {
      callOrder.push('setLocale');
    });
    (YamapInstance.init as jest.Mock).mockImplementation(async () => {
      callOrder.push('init');
    });

    renderHook(() => useAppLifecycle());

    await waitFor(() => {
      expect(callOrder).toEqual(['setLocale', 'init']);
    });
    expect(YamapInstance.setLocale).toHaveBeenCalledWith('en_US');
    expect(YamapInstance.init).toHaveBeenCalledWith('map-key');
  });
});
