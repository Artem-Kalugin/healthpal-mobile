import type { InterceptorContext, UrlInterceptorResult } from './types';

export const urlInterceptor = (
  context: InterceptorContext,
  urlWithPath: string,
): UrlInterceptorResult => {
  const urlObj = new URL(context.baseUrl + urlWithPath);

  return {
    urlObj,
    urlString: urlObj.toString(),
  };
};
