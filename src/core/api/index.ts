import type { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi, retry } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';

import { FetchService } from '#services/Fetch';
import Logger from '#services/Logger';

import { RootState, Store } from '#store';
import { RuntimeActions, TokenDecoded } from '#store/slices/runtime';

import { delay } from '../utils';
import { TagsAppointmentAPI } from './Appointments/types';
import { BEError, FetchArgs } from './types';
import { TagsUserAPI } from './User/types';

export const logOut = async (api: Pick<Store, 'dispatch'>) => {
  api.dispatch(RuntimeActions.setToken(undefined));
  //dirty, but waits for unmounts to prevent from bursting backend with auto executed rtk-hooks again
  //ideally make auth guard equivalent on endpoint definition to allow it to be sent without token
  //and check that token exists in base query
  await delay(750);

  api.dispatch(RtkAppApi.util.resetApiState());
};

let refreshingToken = '';
let lastRefreshResult: Promise<
  | {
      data: { accessToken: string; refreshToken: string };
    }
  | undefined
>;

const refresh = (api: BaseQueryApi, tokenToRefresh: TokenDecoded) => {
  if (refreshingToken === tokenToRefresh.plain) {
    return lastRefreshResult;
  }

  refreshingToken = tokenToRefresh.plain;

  lastRefreshResult = (async () => {
    try {
      const response = (await FetchService.query(
        {
          url: '/auth/refresh',
          method: 'post',
          data: {
            refreshToken: tokenToRefresh.refresh,
            userId: tokenToRefresh.userId,
          },
        },
        process.env.EXPO_PUBLIC_API_URL,
        undefined,
      ))!;

      if (!response.ok) {
        throw {};
      }

      api.dispatch(RuntimeActions.setToken(response.data));

      return response.data;
    } catch (err) {
      Logger.error('Token refresh failed', err);
      return undefined;
    }
  })();

  return lastRefreshResult;
};

const apiBaseQuery = async (args: FetchArgs, api: BaseQueryApi) => {
  const { url, method = 'GET', data, params, path } = args;
  !process.env.EXPO_PUBLIC_API_URL &&
    Logger.error('no API_URL available, make sure .env file inited');

  let runtimeToken = (api.getState() as RootState).runtime.token;

  let accessToken = runtimeToken?.plain;

  try {
    if (refreshingToken === accessToken) {
      const refreshResult = await lastRefreshResult;

      if (refreshResult) {
        return apiBaseQuery(args, api);
      } else {
        logOut(api);

        return {
          error: {
            meta: {
              loggedOut: true,
            },
          },
        };
      }
    }

    const req = await FetchService.query(
      {
        url,
        method,
        data,
        params,
        path,
      },
      process.env.EXPO_PUBLIC_API_URL,
      `Bearer ${accessToken}`,
    );

    if (!req?.ok) {
      throw req;
    }
    return {
      data: req.data,
      meta: req.meta,
    };
  } catch (error) {
    const errorStatus =
      error && typeof error === 'object' && 'status' in error
        ? error.status
        : undefined;

    if (errorStatus === 401 && runtimeToken) {
      refresh(api, runtimeToken);

      return await apiBaseQuery(args, api);
    }

    return { error };
  }
};

const baseQuery = retry(
  async (args: FetchArgs, _api) => {
    const result = await apiBaseQuery(args, _api);
    if (
      'error' in result &&
      result.error &&
      typeof result.error === 'object' &&
      (('status' in result.error &&
        [422, 403, 401, 409, 404, 500, 400].includes(
          result.error?.status as number,
        )) ||
        //@ts-expect-error
        ('meta' in result.error && result.error.meta?.loggedOut))
    ) {
      retry.fail(result.error);
    }

    return result;
  },
  { maxRetries: 2 },
);

const RtkAppApi = createApi({
  reducerPath: 'api',
  //@ts-expect-error
  baseQuery: baseQuery as BaseQueryFn<FetchArgs, unknown, BEError>,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      //@ts-expect-error
      return action?.payload?.[reducerPath];
    }
  },
  tagTypes: [
    ...Object.values(TagsUserAPI),
    ...Object.values(TagsAppointmentAPI),
  ],
  keepUnusedDataFor: 600,
});

export { RtkAppApi };
