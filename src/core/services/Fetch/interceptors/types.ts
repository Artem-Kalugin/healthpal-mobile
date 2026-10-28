import type { FetchArgs } from '#api/types';

export interface InterceptorContext {
  url: string;
  method: string;
  baseUrl: string;
  data?: FetchArgs['data'];
  params?: FetchArgs['params'];
  path?: Record<string, string | number>;
  headers: Record<string, string>;
}

export interface UrlInterceptorResult {
  urlObj: URL;
  urlString: string;
}
