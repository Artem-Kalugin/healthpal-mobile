import NetInfo from '@react-native-community/netinfo';
import type { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi, retry } from '@reduxjs/toolkit/query/react';
import debounce from 'lodash/debounce';
import { toast } from 'react-hot-toast/headless';
import { REHYDRATE } from 'redux-persist';

import Debug from '#utils/debug';

import { RootState } from '#store';
import { RuntimeActions } from '#store/slices/runtime';

import { BEError, FetchArgs } from './types';
import { TagsUserAPI } from './User/types';

const handleNoInternet = debounce(() => {
  toast.error('Отсутствует соединение с интернетом');
}, 2500);

const getUrlWithPathParams = (
  url: string,
  path?: Record<string, string | number>,
) =>
  Object.entries(path || {}).reduce(
    (acc, [k, v]) => acc.replace(`{${k}}`, encodeURIComponent(String(v))),
    url,
  );

const logOut = (api: BaseQueryApi) => {
  api.dispatch(RuntimeActions.setToken(undefined));
  api.dispatch(Query.util.resetApiState());
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

    const isFormData = data instanceof FormData;

    const headers: Record<string, string> = {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    };

    const runtimeToken = (api.getState() as RootState).runtime.token;

    if (runtimeToken) headers.Authorization = `Bearer ${runtimeToken.plain}`;

    const body = isFormData ? data : data ? JSON.stringify(data) : undefined;

    const result = await fetchWithTimeout(urlObj.toString(), {
      method,
      headers,
      body,
    });

    const json = await result.json().catch(() => ({}));

    if (!result.ok) {
      if (
        result.status === 401 &&
        (api.getState() as RootState).runtime.token
      ) {
        logOut(api);
      }

      return {
        error: {
          status: result.status,
          data: json || result.statusText,
        },
      };
    }

    Debug.requestSuccess(`${method.toUpperCase()} ${urlWithPath}`);

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
      [422, 403, 401, 409, 404].includes(result.error?.status as number)
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
  tagTypes: [...Object.values(TagsUserAPI)],
  keepUnusedDataFor: 600,
});

export { Query, fetchBaseQuery };
