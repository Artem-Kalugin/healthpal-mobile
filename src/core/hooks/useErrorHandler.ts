import { useEffect } from 'react';

import type { SerializedError } from '@reduxjs/toolkit';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-hot-toast/headless';

import type { BEError } from '#api/types';

import { Haptics } from '#services/Haptics';
import { Logger } from '#services/Logger';

import { encodeLabel, t } from '#i18n';
import type { TranslationKey } from '#i18n/types';

import { isBEValidationError } from '#utils';

const getErrorCode = (data: unknown) =>
  typeof data === 'object' &&
  data !== null &&
  'code' in data &&
  typeof data.code === 'string'
    ? data.code
    : undefined;

export const useErrorHandler = <T extends object>(
  meta: { error?: BEError | SerializedError },
  form?: UseFormReturn<T, any, T>,
) => {
  useEffect(() => {
    const error = meta?.error;
    if (!error || !('data' in error)) return;

    Haptics.impactError();

    Logger.requestError('error', error.data);

    const errorData = error.data;

    if (!errorData) return;

    if (form && isBEValidationError<T>(error)) {
      for (const field in error.data.validation) {
        const labels = error.data.validation[field].map(({ code, params }) => ({
          code,
          label: encodeLabel(`serverValidation.${code}`, params),
        }));

        if (!labels.length) continue;

        form.setError(
          //@ts-expect-error react-hook-form cannot resolve Path<T> for generic T, `field` is Extract<keyof T, string>
          field,
          {
            type: 'server',
            message: labels[0].label,
            types: Object.fromEntries(
              labels.map(({ code, label }) => [code, label]),
            ),
          },
        );
      }

      return;
    }

    const code = getErrorCode(errorData);

    // an app bug (wrong `Accept-Language` / `X-Region`), the user can do nothing about it
    if (code === 'INVALID_REQUEST_CONTEXT') return;

    // an unknown or missing code falls back to the generic text, never a raw code
    toast.error(
      t(`serverErrors.${code}` as TranslationKey, {
        defaultValue: t('serverErrors.UNKNOWN'),
      }),
    );
  }, [meta.error, form]);
};
