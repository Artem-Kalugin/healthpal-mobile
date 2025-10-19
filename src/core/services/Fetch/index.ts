import { FetchArgs } from '#api/types';

import Debug from '#utils/debug';

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
    shouldBubbleUpError = true,
  ) => {
    let urlSaved: string;
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

      Debug.requestStart(`${method.toUpperCase()} ${urlString}`);

      urlSaved = urlObj.toString();
      const result = await fetchWithTimeout(urlObj.toString(), {
        method,
        headers: context.headers,
        body,
      });

      const resultUnwrapped = await result.json();

      if (!result.ok) {
        throw resultUnwrapped;
      }

      Debug.requestSuccess(`${method.toUpperCase()} ${urlWithPath}`);

      return {
        data: resultUnwrapped ?? {},
        meta: {
          timestamp: new Date().toISOString(),
        },
      };
    } catch (err: any) {
      const isApiError = 'statusCode' in err;

      if (isApiError) {
        Debug.requestError(urlSaved!, err);
      }

      if (isApiError && shouldBubbleUpError) {
        throw err;
      } else {
        Debug.requestError('RtkAppApi unexpected error', err);
      }
    }
  };
}
