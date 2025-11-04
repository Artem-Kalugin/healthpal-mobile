import { useEffect } from 'react';

import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-hot-toast/headless';

import { BEError } from '#api/types';
import { isBEValidationError } from '#api/utils';

import Haptics from '#services/Haptics';
import Logger from '#services/Logger';

const useBEErrorHandler = <T extends object>(
  meta: unknown,
  form?: UseFormReturn<T, any, T>,
) => {
  useEffect(() => {
    //@ts-expect-error

    const error = meta?.error;
    if (!error) return;

    Haptics.impactError();

    Logger.requestError('error', error?.data);

    const beError = error as BEError;

    const errorData = beError?.data;

    if (!errorData) return;

    if (form && isBEValidationError<T>(beError)) {
      for (const field in beError.data.validation) {
        //@ts-expect-error
        form.setError(field, { message: validationErrors[field][0] });
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
    //@ts-expect-error
  }, [meta.error, form]);
};

export default useBEErrorHandler;
