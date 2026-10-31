import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  DefaultValues,
  FieldError,
  FieldErrors,
  FieldValues,
  Resolver,
  useForm,
} from 'react-hook-form';
import type { z } from 'zod';

import { Haptics } from '#services/Haptics';

import { encodeLabel } from '#i18n';
import type { TranslationKey } from '#i18n/types';

const encodeMessage = <M>(message: M) =>
  typeof message === 'string'
    ? encodeLabel(message as TranslationKey)
    : message;

const encodeError = (error: FieldError): FieldError => ({
  ...error,
  message: encodeMessage(error.message),
  types:
    error.types &&
    Object.fromEntries(
      Object.entries(error.types).map(([type, message]) => [
        type,
        Array.isArray(message)
          ? message.map(encodeMessage)
          : encodeMessage(message),
      ]),
    ),
});

// the forms here are flat: one `FieldError` per field name
const encodeErrors = <T extends FieldValues>(
  errors: FieldErrors<T>,
): FieldErrors<T> =>
  Object.fromEntries(
    Object.entries(errors).map(([name, error]) => [
      name,
      error && encodeError(error as FieldError),
    ]),
  ) as FieldErrors<T>;

/**
 * Schema labels are catalog keys; the form carries them as `encodeLabel` strings,
 * the same shape server errors use, so `FormTextInput` has one way to translate.
 */
const createResolver =
  <S extends z.ZodType<FieldValues, FieldValues>>(
    schema: S,
  ): Resolver<z.input<S>, unknown, z.output<S>> =>
  async (values, context, options) => {
    const result = await zodResolver(schema)(values, context, options);

    if (!Object.keys(result.errors).length) return result;

    return { values: {}, errors: encodeErrors<z.input<S>>(result.errors) };
  };

export const useAppForm = <S extends z.ZodType<FieldValues, FieldValues>>(
  schema: S,
  defaultValues?: DefaultValues<z.input<S>>,
) => {
  const form = useForm<z.input<S>, unknown, z.output<S>>({
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: createResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (form.formState.isSubmitted && !form.formState.isValid) {
      Haptics.impactError();
    }
  }, [form.formState.submitCount]);

  const getFormInputProps = (name: keyof z.input<S>) => {
    return {
      clearErrors: form.clearErrors,
      control: form.control,
      formState: form.formState,
      trigger: form.trigger,
      setValue: form.setValue,
      name,
    };
  };

  return { form, getFormInputProps };
};
