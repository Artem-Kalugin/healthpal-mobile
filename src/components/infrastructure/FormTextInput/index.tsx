import React, { useState } from 'react';
import { BlurEvent } from 'react-native';

import { AFFINITY_CALCULATION_STRATEGY } from 'react-native-advanced-input-mask';

import { Controller, FieldValues } from 'react-hook-form';

import { MaskedInput, TextInput } from '#ui-kit';

import { decodeLabel, useTranslation } from '#i18n';

import {
  PHONE_AFFINITY_FORMAT,
  PHONE_ALLOWED_KEYS,
  PHONE_PLACEHOLDER,
  PHONE_PRIMARY_MASK,
} from './config';
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
          const {
            type,
            mask = PHONE_PRIMARY_MASK,
            ...phoneProps
          } = externalProps;

          return (
            <MaskedInput
              keepPlaceholderOnFocus
              affinityCalculationStrategy={AFFINITY_CALCULATION_STRATEGY.PREFIX}
              affinityFormat={PHONE_AFFINITY_FORMAT}
              allowedKeys={PHONE_ALLOWED_KEYS}
              mask={mask}
              placeholder={PHONE_PLACEHOLDER}
              onChange={val => {
                onChange(val);
              }}
              {...baseInputProps}
              {...phoneProps}
              // typing must start with '+', otherwise no format can win the affinity against the primary mask
              onBlur={e => {
                baseInputProps.onBlur(e);
                value === '+' && onChange('');
              }}
              onFocus={() => {
                baseInputProps.onFocus();
                !value && onChange('+');
              }}
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
