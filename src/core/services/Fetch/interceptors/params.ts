import type { InterceptorContext } from './types';

export const paramsInterceptor = (
  context: InterceptorContext,
  urlObj: URL,
): void => {
  const { params } = context;

  if (!params) return;

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlObj.searchParams.append(key, String(value));
    }
  });
};
