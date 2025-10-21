export interface InterceptorContext {
  url: string;
  method: string;
  baseUrl: string;
  data?: any;
  params?: Record<string, any>;
  path?: Record<string, string | number>;
  headers: Record<string, string>;
}
