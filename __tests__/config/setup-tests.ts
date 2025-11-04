/* eslint-disable @typescript-eslint/no-require-imports */
import { setUpTests } from 'react-native-reanimated';

//TODO: replace when https://github.com/mrousavy/react-native-mmkv/issues/945 fixed

jest.mock('react-native-permissions', () => ({
  check: jest.fn(),
  request: jest.fn(),
  openSettings: jest.fn(),
  RESULTS: {
    UNAVAILABLE: 'unavailable',
    DENIED: 'denied',
    GRANTED: 'granted',
    LIMITED: 'limited',
    BLOCKED: 'blocked',
  },
}));

jest.mock('redux-persist/lib/persistStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    pause: jest.fn(),
    persist: jest.fn(),
    purge: jest.fn(),
    flush: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn(),
    subscribe: jest.fn(),
    replaceReducer: jest.fn(),
  })),
}));

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValue(true),
    isVisible: jest.fn().mockResolvedValue(false),
    useHideAnimation: jest.fn().mockReturnValue({
      container: {},
      logo: { source: 0 },
      brand: { source: 0 },
    }),
  };
});

jest.mock('react-native-mmkv', () => {
  const { createMockMMKV } = require('./mocks/mockMMKV');
  return {
    createMMKV: () => createMockMMKV(),
  };
});

setUpTests();
jest.mock('react-native-svg', () => require('react-native-reanimated/mock'));
