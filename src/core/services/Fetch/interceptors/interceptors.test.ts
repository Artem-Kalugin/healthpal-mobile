import NetInfo from '@react-native-community/netinfo';

import { connectionInterceptor } from './connection';
import { headersInterceptor } from './headers';
import { paramsInterceptor } from './params';
import { pathInterceptor } from './path';
import { fetchWithTimeout } from './timeout';

describe('pathInterceptor', () => {
  test('должен подставить path params в URL', () => {
    const context = {
      url: '/doctors/{id}/appointments/{appointmentId}',
      path: { id: 123, appointmentId: 456 },
    };

    expect(pathInterceptor(context)).toBe('/doctors/123/appointments/456');
  });

  test('должен encode специальные символы', () => {
    const context = {
      url: '/search/{query}',
      path: { query: 'кардиолог москва' },
    };

    expect(pathInterceptor(context)).toContain(
      encodeURIComponent('кардиолог москва'),
    );
  });
});

describe('paramsInterceptor', () => {
  test('должен игнорировать null и undefined значения', () => {
    const urlObj = new URL('https://api.com');
    const context = {
      params: { name: 'John', age: null, city: undefined, active: true },
    };

    paramsInterceptor(context, urlObj);

    expect(urlObj.searchParams.has('name')).toBe(true);
    expect(urlObj.searchParams.has('age')).toBe(false);
    expect(urlObj.searchParams.has('city')).toBe(false);
  });
});

describe('headersInterceptor', () => {
  test('должен установить multipart для FormData', () => {
    const formData = new FormData();
    const context = { data: formData, headers: {} };

    headersInterceptor(context);

    expect(context.headers).toEqual({
      'Content-Type': 'multipart/form-data',
    });
  });

  test('должен установить JSON для объекта', () => {
    const context = { data: { name: 'John' }, headers: {} };

    headersInterceptor(context);

    expect(context.headers).toEqual({
      'Content-Type': 'application/json',
    });
  });
});

describe('connectionInterceptor', () => {
  test('должен throw когда нет интернета', async () => {
    //@ts-expect-error
    jest.spyOn(NetInfo, 'fetch').mockResolvedValue({ isConnected: false });

    await expect(connectionInterceptor()).rejects.toThrow(
      'No internet connection',
    );
  });
});

describe('fetchWithTimeout', () => {
  test('должен reject по timeout', async () => {
    global.fetch = jest.fn(
      () => new Promise(resolve => setTimeout(resolve, 100000)),
    );

    await expect(fetchWithTimeout('https://api.com', {}, 100)).rejects.toThrow(
      'Request timeout',
    );
  });
});
