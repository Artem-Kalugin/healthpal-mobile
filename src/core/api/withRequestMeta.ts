import { skipToken, type SkipToken } from '@reduxjs/toolkit/query/react';
import { getLocales } from 'expo-localization';

import { getLanguage, resolveRegion, useTranslation } from '#i18n';

import { useSelector } from '#store';

import type { RequestMeta } from './types';

// generic over the generated RTK hooks: `never` params accept any signature, the public type stays the wrapped hook's own
type ArgHook = (arg: never, options?: never) => unknown;
type MutationHook = (
  options?: never,
) => readonly [(arg: never) => unknown, ...unknown[]];

export const useRequestMeta = (): RequestMeta => {
  // subscription only: re-renders on language change, the value is read by `getLanguage`
  useTranslation();
  const region = useSelector(state => state.app.region);

  return {
    language: getLanguage(),
    region: resolveRegion(
      region,
      getLocales().map(locale => locale.languageCode),
    ),
  };
};

const wrapArgHook = <H extends ArgHook>(useHook: H) => {
  const useHookWithMeta = (
    arg: Parameters<H>[0] | SkipToken,
    options?: Parameters<H>[1],
  ) => {
    const meta = useRequestMeta();

    return useHook(
      (arg === skipToken ? arg : { ...(arg as object | null), meta }) as never,
      options as never,
    );
  };

  return useHookWithMeta as unknown as H;
};

const wrapMutationHook = <H extends MutationHook>(useHook: H) => {
  const useHookWithMeta = (options?: Parameters<H>[0]) => {
    const meta = useRequestMeta();
    const [trigger, ...rest] = useHook(options as never);

    return [
      (arg: Parameters<ReturnType<H>[0]>[0]) =>
        trigger({ ...(arg as object | null), meta } as never),
      ...rest,
    ] as const;
  };

  return useHookWithMeta as unknown as H;
};

// RTK names the hooks of an endpoint `use<Name><Suffix>`
const HookWrappers: Record<string, (useHook: never) => unknown> = {
  Query: wrapArgHook,
  InfiniteQuery: wrapArgHook,
  Mutation: wrapMutationHook,
};

/**
 * Wraps the query, infinite query and mutation hooks of an injected api: `meta` joins the arg, so a language
 * or region change is a new arg (a new cache entry) and the request carries the headers.
 * `usePrefetch`, lazy and state hooks are left as they are.
 */
export const withRequestMeta = <A extends { endpoints: object }>(api: A): A => {
  const source = api as unknown as Record<string, unknown>;
  const wrapped: Record<string, unknown> = {};

  Object.keys(api.endpoints).forEach(name => {
    Object.entries(HookWrappers).forEach(([suffix, wrap]) => {
      const hookName = `use${name[0].toUpperCase()}${name.slice(1)}${suffix}`;
      const useHook = source[hookName];

      if (typeof useHook === 'function') {
        wrapped[hookName] = wrap(useHook as never);
      }
    });
  });

  return { ...api, ...wrapped };
};
