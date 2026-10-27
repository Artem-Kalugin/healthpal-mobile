import { useEffect } from 'react';

import type { SerializedError } from '@reduxjs/toolkit';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-hot-toast/headless';

import { BEError } from '#api/types';
import { isBEValidationError } from '#api/utils';

import Haptics from '#services/Haptics';
import Logger from '#services/Logger';

const useBEErrorHandler = <T extends object>(
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
        form.setError(
          //@ts-expect-error react-hook-form cannot resolve Path<T> for generic T, `field` is Extract<keyof T, string>
          field,
          { message: error.data.validation[field][0] },
        );
      }

      return;
    }

    if (
      typeof errorData === 'object' &&
      'message' in errorData &&
      typeof errorData.message === 'string'
    ) {
      toast.error(errorData.message);
    }
  }, [meta.error, form]);
};

export default useBEErrorHandler;
