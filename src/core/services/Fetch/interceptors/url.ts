import type { InterceptorContext } from './types';

export interface UrlInterceptorResult {
  urlObj: URL;
  urlString: string;
}

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
