import { Alert } from 'react-native';

import { UseFormReturn } from 'react-hook-form';

import { BEValidationError, BEValidationScheme } from '#api/types';

import Haptics from '#services/Haptics';

export const showUnexpectedAPIError = (error: any) => {
  Alert.alert(
    'При выполнении сетевого запроса произошла неожиданная ошибка',
    JSON.stringify(error),
  );
};

export const isHaveErrors = (validationResults: boolean[]) => {
  const haveErrors = validationResults.some(el => el);

  if (haveErrors) {
    Haptics.notificationError();
  }

  return haveErrors;
};

export const prettifyTime = (time: string | undefined): string => {
  if (!time) {
    return '';
  }

  const [hours, minutes] = time.split(':').map(el => +el);

  let res = '';

  if (hours) {
    res += `${hours} ${pluralize(+hours, 'час', 'часа', 'часов')} `;
  }

  if (minutes) {
    res += `${minutes} ${pluralize(+minutes, 'минута', 'минуты', 'минут')}`;
  }

  return res;
};

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

export const delay = (time = 100) => {
  const _delay = new Promise(resolve => {
    setTimeout(() => {
      resolve('');
    }, time);
  });

  return _delay;
};

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
