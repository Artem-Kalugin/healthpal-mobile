import { useEffect } from 'react';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ClassConstructor } from 'class-transformer';
import { DefaultValues, useForm } from 'react-hook-form';

import Haptics from '#services/Haptics';

const useAppForm = <T extends Record<string, any>>(
  validator: ClassConstructor<T>,
  defaultValues?: DefaultValues<T>,
) => {
  const form = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: classValidatorResolver(validator),
    defaultValues,
  });

  useEffect(() => {
    if (form.formState.isSubmitted && !form.formState.isValid) {
      Haptics.impactError();
    }
  }, [form.formState.submitCount]);

  const getFormInputProps = (name: keyof T) => {
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

export default useAppForm;
