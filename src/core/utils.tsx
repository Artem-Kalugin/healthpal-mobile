import type { BEValidationError } from '#api/types';

export const pluralize = (
  number: number,
  wordForOne: string,
  wordForTwo: string,
  wordForFive: string,
) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return wordForFive;
  }
  n %= 10;
  if (n === 1) {
    return wordForOne;
  }
  if (n >= 2 && n <= 4) {
    return wordForTwo;
  }
  return wordForFive;
};

//syntax sugar for (await reactSync());
export const reactSync = () => delay(0);

export const delay = (time = 100) => {
  const _delay = new Promise(resolve => {
    setTimeout(() => {
      resolve('');
    }, time);
  });

  return _delay;
};

export const __checkBEValidationError = (error: unknown) => {
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
};

export const isBEValidationError = <T extends object>(
  error: unknown,
): error is { data: BEValidationError<T> } => __checkBEValidationError(error);
