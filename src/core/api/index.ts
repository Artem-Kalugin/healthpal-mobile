import { Store } from '@reduxjs/toolkit';
import type { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi, retry } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';

import { FetchService } from '#services/Fetch';
import Logger from '#services/Logger';
import { TokenService } from '#services/Token';

import { RootState } from '#store';
import { TokenDecoded } from '#store/slices/runtime';

import { delay } from '../utils';
import { TagsAppointmentAPI } from './Appointments/types';
import { BEError, FetchArgs } from './types';
import { TagsUserAPI } from './User/types';

export const logOut = async (api: Pick<Store, 'dispatch'>) => {
  await TokenService.clear();
  //dirty, but waits for unmounts to prevent from bursting backend with auto executed rtk-hooks again
  //ideally make auth guard equivalent on endpoint definition to allow it to be sent without token
  //and check that token exists in base query
  await delay(750);

  api.dispatch(RtkAppApi.util.resetApiState());
};

export const refreshState = {
  refreshingToken: '',
  lastRefreshResult: undefined as
    | Promise<{
        data: { accessToken: string; refreshToken: string };
      }>
    | undefined,
};

const refresh = (api: BaseQueryApi, tokenToRefresh: TokenDecoded) => {
  if (refreshState.refreshingToken === tokenToRefresh.accessToken) {
    return refreshState.lastRefreshResult;
  }

  refreshState.refreshingToken = tokenToRefresh.accessToken;

  refreshState.lastRefreshResult = (async () => {
    try {
      const response = (await FetchService.query(
        {
          url: '/auth/refresh',
          method: 'post',
          data: {
            refreshToken: tokenToRefresh.refreshToken,
            userId: tokenToRefresh.userId,
          },
        },
        process.env.EXPO_PUBLIC_API_URL,
        undefined,
      ))!;

      if (!response.ok) {
        throw {};
      }

      await TokenService.save(response.data);

      return response.data;
    } catch (err) {
      Logger.error('Token refresh failed', err);
      return undefined;
    }
  })();

  return refreshState.lastRefreshResult;
};

//@ts-expect-error
export const apiBaseQuery: BaseQueryFn<FetchArgs, unknown, BEError> = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  const { url, method = 'GET', data, params, path } = args;
  !process.env.EXPO_PUBLIC_API_URL &&
    Logger.error('no API_URL available, make sure .env file inited');

  let runtimeToken = (api.getState() as RootState).runtime.token;

  let accessToken = runtimeToken?.accessToken;

  try {
    if (refreshState.refreshingToken === accessToken) {
      const refreshResult = await refreshState.lastRefreshResult;

      if (refreshResult) {
        return apiBaseQuery(args, api, extraOptions);
      } else {
        await logOut(api);

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

      return await apiBaseQuery(args, api, extraOptions);
    }

    return { error };
  }
};

const baseQuery = retry(
  async (args: FetchArgs, _api, extraOptions) => {
    const result = await apiBaseQuery(args, _api, extraOptions);
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
  baseQuery: baseQuery,
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
