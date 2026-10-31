import React, { useState } from 'react';
import { BlurEvent } from 'react-native';

import { Controller, FieldValues } from 'react-hook-form';

import { MaskedInput, TextInput } from '#ui-kit';

import { decodeLabel, useTranslation } from '#i18n';

import { FormTextInputProps } from './types';

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
  const { t } = useTranslation();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState }) => {
        const baseInputProps = {
          // RHF carries an `encodeLabel` string (client and server errors alike), translated here so a language change re-translates it
          errors: fieldState.invalid
            ? (isFocused ||
              !fieldState.isTouched ||
              !fieldState.isDirty ||
              !fieldState.error?.types
                ? [fieldState.error?.message!]
                : (Object.values(fieldState.error?.types).flat() as string[])
              ).map(label => {
                const { key, options } = decodeLabel(label);

                return t(key, {
                  ...options,
                  defaultValue: t('serverValidation.UNKNOWN'),
                });
              })
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
