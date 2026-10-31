import type { InterceptorContext } from '../types';

const getFormDataContentType = (data: unknown): string => {
  return data instanceof FormData ? 'multipart/form-data' : 'application/json';
};

export const headersInterceptor = (
  context: Pick<InterceptorContext, 'data' | 'headers' | 'language' | 'region'>,
): void => {
  const { data, headers, language, region } = context;

  headers['Content-Type'] = getFormDataContentType(data);
  if (language) headers['Accept-Language'] = language;
  if (region) headers['X-Region'] = region;
};
