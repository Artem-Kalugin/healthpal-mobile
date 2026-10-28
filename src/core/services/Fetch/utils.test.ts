import { fetchWithTimeout } from './utils';

describe('fetchWithTimeout', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('должен reject по timeout', async () => {
    global.fetch = jest.fn(() => new Promise(() => {}));

    await expect(fetchWithTimeout('https://api.com', {}, 100)).rejects.toThrow(
      'Request timeout',
    );
  });

  test('не должен оставлять таймер после ответа', async () => {
    jest.useFakeTimers();
    global.fetch = jest.fn(() => Promise.resolve({ ok: true } as Response));

    await fetchWithTimeout('https://api.com', {});

    expect(jest.getTimerCount()).toBe(0);
  });
});
