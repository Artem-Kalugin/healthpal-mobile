import React, { useState } from 'react';
import { LayoutAnimation } from 'react-native';

import { MaskInputProps } from 'react-native-mask-input';

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

import { ITextInput, TextInput } from '#ui-kit';
import { MaskedInput } from '#ui-kit/TextInput/MaskedInput';

export const animateLayout = (onAnimationEnd = () => {}) => {
  LayoutAnimation.configureNext(
    {
      duration: 250,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    },
    () => {
      onAnimationEnd();
    },
  );
};
interface FormTextInputProps<T extends FieldValues>
  extends Omit<Partial<ITextInput>, 'value' | 'onChange' | 'outlineType'> {
  name: Path<T>;
  formState: FormState<T>;
  trigger: UseFormTrigger<T>;
  setValue: UseFormSetValue<T>;
  transformValue?: (value: string) => string;
  clearErrors: UseFormClearErrors<T>;
  control: Control<T>;
  type?: 'phone' | 'default';
  mask?: MaskInputProps['mask'];
}

export function FormTextInput<T extends FieldValues>({
  name,
  control,
  formState,
  mask,
  clearErrors,
  setValue,
  transformValue = val => val,
  type = 'default',
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
          onBlur: () => {
            animateLayout();
            onBlur();
            externalProps.onBlur && externalProps?.onBlur();
            setIsFocused(false);
            fieldState.isTouched && trigger(name);
          },
          onErase: () => {
            animateLayout();
            //@ts-expect-errors
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

        if (type === 'phone') {
          return (
            <MaskedInput
              //@ts-expect-error
              mask={mask}
              onChange={(val, unmasked) => {
                animateLayout();
                onChange(unmasked);
              }}
              {...baseInputProps}
              {...externalProps}
            />
          );
        }

        return (
          <TextInput
            onChange={val => {
              animateLayout();
              onChange(val);
            }}
            {...baseInputProps}
            {...externalProps}
          />
        );
      }}
    />
  );
}
