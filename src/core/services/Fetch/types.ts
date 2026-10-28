import type { FetchArgs } from '#api/types';

type FetchMeta = { timestamp: string };

export type FetchResponse = {
  ok: boolean;
  status: number;
  // backend body, typed per endpoint on the RTK Query side; `unknown` would
  // need a cast or runtime validation where it is consumed untyped (token refresh)
  data: any;
  meta: FetchMeta;
  internal?: undefined;
};

// the request never reached a response (no connection, timeout, interceptor failure)
export type FetchInternalFailure = {
  ok: false;
  status?: undefined;
  data: null;
  meta: FetchMeta;
  internal: true;
  message: string;
};

export type FetchResult = FetchResponse | FetchInternalFailure;

export interface InterceptorContext {
  url: string;
  method: string;
  baseUrl: string;
  data?: FetchArgs['data'];
  params?: FetchArgs['params'];
  path?: Record<string, string | number>;
  headers: Record<string, string>;
}
