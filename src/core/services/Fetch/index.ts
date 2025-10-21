import { FetchArgs } from '#api/types';

import Logger from '#services/Logger';

import {
  bodyInterceptor,
  connectionInterceptor,
  fetchWithTimeout,
  headersInterceptor,
  InterceptorContext,
  paramsInterceptor,
  pathInterceptor,
  urlInterceptor,
} from './interceptors';

export class FetchService {
  static query = async (
    { url, method = 'GET', data, params, path }: FetchArgs,
    baseUrl: string,
    Authorization?: string,
  ) => {
    let urlSaved: string;
    let status: number;

    try {
      const context: InterceptorContext = {
        baseUrl,
        url,
        method,
        data,
        params,
        path,
        headers: {},
      };

      await connectionInterceptor(context);
      const urlWithPath = pathInterceptor(context);
      const { urlObj, urlString } = urlInterceptor(context, urlWithPath);
      paramsInterceptor(context, urlObj);
      headersInterceptor(context);
      const body = bodyInterceptor(context);

      if (Authorization) {
        context.headers.Authorization = Authorization;
      }

      Logger.requestStart(`${method.toUpperCase()} ${urlString}`);

      urlSaved = urlObj.toString();
      const result = await fetchWithTimeout(urlObj.toString(), {
        method,
        headers: context.headers,
        body,
      });

      const resultUnwrapped = await result.json();

      status = result.status;

      if (result.ok) {
        Logger.requestSuccess(`${method.toUpperCase()} ${urlWithPath}`);
      } else {
        Logger.requestError(urlSaved!, resultUnwrapped);
      }

      return {
        ok: result.ok,
        status,
        data: resultUnwrapped ?? {},
        meta: {
          timestamp: new Date().toISOString(),
        },
      };
    } catch (err: any) {
      Logger.requestError('FetchService.query error', err);
    }
  };
}
