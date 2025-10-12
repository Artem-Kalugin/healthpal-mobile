import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ClassConstructor } from 'class-transformer';
import { useForm } from 'react-hook-form';

const useAppForm = <T extends Record<string, any>>(
  validator: ClassConstructor<T>,
) => {
  const form = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    resolver: classValidatorResolver(validator),
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
