import type { InterceptorContext } from './types';

export const bodyInterceptor = (
  context: InterceptorContext,
): string | FormData | undefined => {
  const { data } = context;

  if (!data) return undefined;

  if (data instanceof FormData) {
    return data;
  }

  return JSON.stringify(data);
};
