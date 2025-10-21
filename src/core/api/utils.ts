import { UseFormReturn } from 'react-hook-form';

import { BEValidationError, BEValidationScheme } from './types';

export function __checkBEValidationError(error: unknown) {
  if (
    !(
      error &&
      typeof error === 'object' &&
      'data' in error &&
      typeof (error as any).data === 'object' &&
      (error as any).data !== null
    )
  ) {
    return false;
  }

  const errorData = (error as { data: unknown }).data;

  if (
    !(
      typeof errorData === 'object' &&
      errorData !== null &&
      'validation' in errorData
    )
  ) {
    return false;
  }

  return true;
}

export function isBEValidationError<T extends object>(
  error: unknown,
): error is { data: BEValidationError<T> } {
  return __checkBEValidationError(error);
}

export function handleBEValidationError<T extends object>(
  validationErrors: BEValidationScheme<T>,
  form: UseFormReturn<T, any, T>,
): boolean {
  for (const field in validationErrors) {
    //@ts-expect-error
    form.setError(field, { message: validationErrors[field][0] });
  }

  return true;
}
