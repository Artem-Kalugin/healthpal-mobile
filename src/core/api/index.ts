import * as Keychain from 'react-native-keychain';

import NetInfo from '@react-native-community/netinfo';
import type { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi, retry } from '@reduxjs/toolkit/query/react';
import debounce from 'lodash/debounce';
import { toast } from 'react-hot-toast/headless';
import { REHYDRATE } from 'redux-persist';

import Debug from '#utils/debug';

import { RootState } from '#store';
import { AppActions } from '#store/slices/app';

import { BEError, FetchArgs } from './types';

const handleNoInternet = debounce(() => {
  toast.error('Отсутствует соединение с интернетом');
}, 2500);

const getTokens = async () => {
  const credentials = await Keychain.getGenericPassword();

  if (credentials) {
    const { username: access_token, password: refresh_token } = credentials;

    return {
      access_token,
      refresh_token,
    };
  }

  return;
};

const getUrlWithPathParams = (
  url: string,
  path?: Record<string, string | number>,
) =>
  Object.entries(path || {}).reduce(
    (acc, [k, v]) => acc.replace(`{${k}}`, encodeURIComponent(String(v))),
    url,
  );

const handleSessionError = (api: BaseQueryApi) => {
  Keychain.resetGenericPassword();
  api.dispatch(AppActions.setSignedIn(false));
  api.dispatch(Query.util.resetApiState());
  toast.error('Сессия истекла, пожалуйста, войдите заново');
};

const fetchWithTimeout = (
  url: string,
  options: RequestInit,
  timeout = 20000,
) => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout),
    ),
  ]);
};

const fetchBaseQuery = async (
  { url, method = 'GET', data, params, path }: FetchArgs,
  api: BaseQueryApi,
) => {
  try {
    !process.env.EXPO_PUBLIC_API_URL &&
      Debug.error('no API_URL available, make sure .env file inited');

    const { isConnected } = await NetInfo.fetch();
    if (!isConnected) {
      if (['PUT', 'POST', 'PATCH'].includes(method.toUpperCase())) {
        handleNoInternet();
      }
      throw new Error('No internet connection');
    }

    const urlWithPath = getUrlWithPathParams(url, path);
    const urlObj = new URL(process.env.EXPO_PUBLIC_API_URL + urlWithPath);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlObj.searchParams.append(key, String(value));
        }
      });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const tokens = await getTokens();
    if (tokens?.access_token)
      headers.Authorization = `Bearer ${tokens.access_token}`;

    const result = await fetchWithTimeout(urlObj.toString(), {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    const json = await result.json().catch(() => ({}));

    if (!result.ok) {
      if (
        result.status === 401 &&
        (api.getState() as RootState).app.isSignedIn
      ) {
        handleSessionError(api);
      }

      return {
        error: {
          status: result.status,
          data: json || result.statusText,
        },
      };
    }

    return {
      data: json?.data ?? json ?? {},
      meta: {
        ...json,
        timestamp: new Date().toISOString(),
        data: undefined,
      },
    };
  } catch (err: any) {
    Debug.requestError('', err);

    return {
      error: {
        status: undefined,
        data: err?.message ?? 'Unknown error',
      },
    };
  }
};

const baseQuery = retry(
  async (args: FetchArgs, _api) => {
    const result = await fetchBaseQuery(args, _api);

    if (
      'error' in result &&
      result.error &&
      typeof result.error === 'object' &&
      'status' in result.error &&
      [422, 403, 401, 409].includes(result.error?.status as number)
    ) {
      retry.fail(result.error);
    }

    return result;
  },
  { maxRetries: 2 },
);

const Query = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery as BaseQueryFn<FetchArgs, unknown, BEError>,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      //@ts-expect-error
      return action?.payload?.[reducerPath];
    }
  },
  keepUnusedDataFor: 600,
});

export { Query, fetchBaseQuery };
