import { BEValidationError } from './types';

export function __checkBEValidationError(error: unknown) {
  if (
    !(
      error &&
      typeof error === 'object' &&
      'data' in error &&
      typeof error.data === 'object' &&
      error.data !== null
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
