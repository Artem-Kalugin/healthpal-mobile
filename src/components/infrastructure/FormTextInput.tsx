import React, { useState } from 'react';
import { BlurEvent } from 'react-native';

import {
  Control,
  Controller,
  FieldValues,
  FormState,
  Path,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

import { MaskedInput, TextInput } from '#ui-kit';
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

type FormTextInputProps<T extends FieldValues> = FormTextInputBaseProps<T> &
  (DefaultInputProps | PhoneInputProps);

export function FormTextInput<T extends FieldValues>({
  name,
  control,
  formState,
  clearErrors,
  setValue,
  transformValue = val => val,
  trigger,
  ...externalProps
}: FormTextInputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState }) => {
        const baseInputProps = {
          errors: fieldState.invalid
            ? isFocused ||
              !fieldState.isTouched ||
              !fieldState.isDirty ||
              !fieldState.error?.types
              ? [fieldState.error?.message!]
              : (Object.values(fieldState.error?.types) as string[])
            : undefined,
          outlineType: fieldState.invalid ? ('error' as const) : undefined,
          value: transformValue(value) ?? '',
          onBlur: (e?: BlurEvent) => {
            onBlur();
            e && externalProps.onBlur && externalProps.onBlur(e);
            setIsFocused(false);
            fieldState.isTouched && trigger(name);
          },
          onErase: () => {
            //@ts-expect-error react-hook-form can't resolve PathValue for generic T, '' is not assignable
            setValue(name, '', {
              shouldValidate: false,
              shouldDirty: false,
              shouldTouch: false,
            });
          },
          onFocus: () => {
            clearErrors(name);
            setIsFocused(true);
          },
        };

        if (externalProps.type === 'phone') {
          const { type, mask, ...phoneProps } = externalProps;

          return (
            <MaskedInput
              mask={mask}
              onChange={(val, unmasked) => {
                onChange(val);
              }}
              {...baseInputProps}
              {...phoneProps}
            />
          );
        }

        const { type, ...textProps } = externalProps;

        return (
          <TextInput
            onChange={val => {
              onChange(val);
            }}
            {...baseInputProps}
            {...textProps}
          />
        );
      }}
    />
  );
}
