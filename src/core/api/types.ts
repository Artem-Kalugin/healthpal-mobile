import type { Language, Region } from '#i18n/types';

import type {
  BEValidationErrorResponseDto,
  BEValidationIssueDto,
} from '#generated/__entities';

export type BEError = {
  data?: unknown;
  status?: number;
  meta?: { loggedOut?: boolean };
  // the request never got a response (no connection, timeout)
  internal?: boolean;
};

// the OpenAPI declares no error body on operations, so `BEError.data` stays `unknown`; these are its two shapes
export type BEValidationError<T extends object> = Omit<
  BEValidationErrorResponseDto,
  'validation'
> & {
  validation: BEValidationScheme<T>;
};

export type BEValidationScheme<T extends object> = Record<
  keyof Partial<T>,
  BEValidationIssueDto[]
>;

/** Language and region the backend localizes by: sent as headers, and part of the query args, so of the cache key. */
export type RequestMeta = {
  language: Language;
  region: Region;
};

export type FetchArgs = {
  url: string;
  method?: string;
  data?: unknown;
  params?: Record<string, string | number | boolean | null | undefined>;
  path?: Record<string, string | number>;
  meta?: RequestMeta;
};

export type Page = { size: number; page: number; hasMore: boolean };
