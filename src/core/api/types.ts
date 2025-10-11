export type BEError = {
  error: {
    data: unknown;
    status?: number;
  };
};

export type FetchArgs = {
  url: string;
  method?: string;
  data?: any;
  params?: Record<string, string | number | boolean | null | undefined>;
  path?: Record<string, string | number>;
};
