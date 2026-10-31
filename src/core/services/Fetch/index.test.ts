import { FetchService } from './index';
import { fetchWithTimeout } from './utils';

jest.mock('#services/Logger');
jest.mock('./interceptors/Connection', () => ({
  connectionInterceptor: () => Promise.resolve(),
}));
jest.mock('./utils', () => ({
  fetchWithTimeout: jest.fn(),
}));

describe('FetchService.query', () => {
  beforeEach(() => {
    jest.mocked(fetchWithTimeout).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
    } as Response);
  });

  test('должен отправить Accept-Language и X-Region из meta', async () => {
    await FetchService.query(
      {
        url: '/doctors',
        method: 'post',
        meta: { language: 'en', region: 'EU' },
      },
      'https://api.test',
    );

    expect(fetchWithTimeout).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Accept-Language': 'en',
          'X-Region': 'EU',
        }),
      }),
    );
  });

  test('не должен отправлять Accept-Language и X-Region без meta', async () => {
    await FetchService.query(
      { url: '/auth/refresh', method: 'post' },
      'https://api.test',
    );

    const { headers } = jest.mocked(fetchWithTimeout).mock.lastCall![1] as {
      headers: Record<string, string>;
    };

    expect(headers).not.toHaveProperty('Accept-Language');
    expect(headers).not.toHaveProperty('X-Region');
  });
});
