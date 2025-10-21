import { useEffect } from 'react';

import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-hot-toast/headless';

import { BEError } from '#api/types';
import { handleBEValidationError, isBEValidationError } from '#api/utils';

import Logger from '#services/Logger';

const useBEErrorHandler = <T extends object>(
  meta: unknown,
  form?: UseFormReturn<T, any, T>,
) => {
  useEffect(() => {
    //@ts-expect-error

    const error = meta?.error;
    if (!error) return;
    Logger.requestError('error', error?.data);

    const beError = error as BEError;

    const errorData = beError?.data;
    if (!errorData) return;

    if (form && isBEValidationError<T>(beError)) {
      handleBEValidationError(beError.data.validation, form);
      return;
    }

    if (
      typeof errorData === 'object' &&
      'message' in errorData &&
      typeof errorData.message === 'string' &&
      errorData.message
    ) {
      toast.error(errorData.message);
    }
    //@ts-expect-error
  }, [meta.error, form]);
};

export default useBEErrorHandler;
