import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ClassConstructor } from 'class-transformer';
import { useForm } from 'react-hook-form';

const useAppForm = <T extends Record<string, any>>(
  validator: ClassConstructor<T>,
  defaultValues?: any,
) => {
  const form = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: classValidatorResolver(validator),
    defaultValues,
  });

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
