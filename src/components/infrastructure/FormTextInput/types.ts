import {
  Control,
  FieldValues,
  FormState,
  Path,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

import { IMaskedInput } from '#ui-kit/inputs/MaskedInput';
import { ITextInput } from '#ui-kit/inputs/TextInput';

type InputOmittedProps = 'value' | 'onChange' | 'outlineType';

interface FormTextInputBaseProps<T extends FieldValues> {
  name: Path<T>;
  formState: FormState<T>;
  trigger: UseFormTrigger<T>;
  setValue: UseFormSetValue<T>;
  transformValue?: (value: string) => string;
  clearErrors: UseFormClearErrors<T>;
  control: Control<T>;
}

type DefaultInputProps = Omit<Partial<ITextInput>, InputOmittedProps> & {
  type?: 'default';
};

type PhoneInputProps = Omit<Partial<IMaskedInput>, InputOmittedProps> & {
  type: 'phone';
  mask?: string;
};

export type FormTextInputProps<T extends FieldValues> =
  FormTextInputBaseProps<T> & (DefaultInputProps | PhoneInputProps);
