export type BEError = {
  data: unknown;
  status?: number;
};

export type BEValidationError<T extends object> = {
  validation: BEValidationScheme<T>;
  status?: number;
};

export type BEValidationScheme<T extends object> = Record<
  keyof Partial<T>,
  string[]
>;

export type FetchArgs = {
  url: string;
  method?: string;
  data?: any;
  params?: Record<string, string | number | boolean | null | undefined>;
  path?: Record<string, string | number>;
};
