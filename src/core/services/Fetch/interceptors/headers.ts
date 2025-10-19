import type { InterceptorContext } from './types';

const getFormDataContentType = (data: any): string => {
  return data instanceof FormData ? 'multipart/form-data' : 'application/json';
};

export const headersInterceptor = (context: InterceptorContext): void => {
  const { data, headers } = context;

  headers['Content-Type'] = getFormDataContentType(data);
};
