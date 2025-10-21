import type { InterceptorContext } from './types';

const getUrlWithPathParams = (
  url: string,
  path?: Record<string, string | number>,
): string =>
  Object.entries(path || {}).reduce(
    (acc, [k, v]) => acc.replace(`{${k}}`, encodeURIComponent(String(v))),
    url,
  );

export const pathInterceptor = (context: InterceptorContext): string => {
  return getUrlWithPathParams(context.url, context.path);
};
