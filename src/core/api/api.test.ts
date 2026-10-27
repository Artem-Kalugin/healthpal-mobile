import type { BaseQueryApi } from '@reduxjs/toolkit/query';

import { apiBaseQuery, refreshState, RtkAppApi } from '#api';

import { FetchService } from '#services/Fetch';

import { store } from '#store';
import { RuntimeActions } from '#store/slices/runtime';

import {
  mockAccessToken,
  mockAccessToken2,
  mockRefreshToken,
  mockRefreshToken2,
} from '../../../__tests__/config/fixtures/tokens';

const OLD_ENV = process.env;
process.env = { ...OLD_ENV, EXPO_PUBLIC_API_URL: 'test' };

jest.mock('#services/Logger');
jest.mock('#services/Fetch');
jest.mock('#utils', () => ({
  delay: () => Promise.resolve(),
}));

// the code under test only calls getState/dispatch on BaseQueryApi, the real store has both
const api = store as unknown as BaseQueryApi;

describe('apiBaseQuery token refresh', () => {
  beforeEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    refreshState.refreshingToken = '';
    refreshState.lastRefreshResult = undefined;
    store.dispatch(RtkAppApi.util.resetApiState());
    store.dispatch(
      RuntimeActions.setToken({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        userId: '123',
        registrationComplete: true,
      }),
    );
  });

  afterEach(() => {
    store.dispatch(RuntimeActions.setToken(undefined));
  });

  test('Должен запросить refresh token по 401 и сделать retry', async () => {
    (FetchService.query as jest.Mock)
      .mockResolvedValueOnce({ ok: false, status: 401 })
      .mockResolvedValueOnce({
        ok: true,
        data: {
          accessToken: mockAccessToken2,
          refreshToken: mockRefreshToken2,
        },
      })
      .mockResolvedValueOnce({
        ok: true,
        data: { doctors: [] },
      });

    const result = await apiBaseQuery(
      { url: '/doctors', method: 'GET' },
      api,
      {},
    );

    expect(FetchService.query).toHaveBeenCalledTimes(3);

    const updatedToken = store.getState().runtime.token;
    expect(updatedToken?.accessToken).toBe(mockAccessToken2);
    expect(updatedToken?.refreshToken).toBe(mockRefreshToken2);

    expect(result.data).toEqual({ doctors: [] });
  });

  test('должен вызвать logout если refresh упал', async () => {
    (FetchService.query as jest.Mock)
      .mockResolvedValueOnce({ ok: false, status: 401 })
      .mockResolvedValueOnce({ ok: false, status: 401 });

    await apiBaseQuery({ url: '/doctors' }, api, {});

    const updatedToken = store.getState().runtime.token;

    expect(updatedToken).toBe(undefined);
  });

  test('не должен делать дублирующие вызовы refresh если несколько запросов упали', async () => {
    (FetchService.query as jest.Mock).mockResolvedValue({ status: 401 });

    const promise1 = apiBaseQuery({ url: '/doctors' }, api, {});
    const promise2 = apiBaseQuery({ url: '/appointments' }, api, {});

    await Promise.all([promise1, promise2]);

    const refreshCalls = jest
      .mocked(FetchService.query)
      .mock.calls.filter(call => call[0].url === '/auth/refresh');
    expect(refreshCalls).toHaveLength(1);
  });

  test('должен вернуть internal error если запрос не получил ответ', async () => {
    (FetchService.query as jest.Mock).mockResolvedValueOnce({
      ok: false,
      internal: true,
      message: 'No internet connection',
    });

    const result = await apiBaseQuery({ url: '/doctors' }, api, {});

    expect(result.error).toEqual({ internal: true });
    expect(FetchService.query).toHaveBeenCalledTimes(1);
  });
});

process.env = OLD_ENV;
