import React, { useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated from 'react-native-reanimated';

import { CompositeScreenProps } from '@react-navigation/native';
import { toast } from 'react-hot-toast/headless';

import { FormTextInput } from '#components/FormTextInput';
import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import { Brand, Button, Icon, TextSmall, TextXL } from '#ui-kit';

import { AuthRoutes, AuthScreenProps } from '#navigation/Auth/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { useRegisterMutation } from '#api/Auth';

import {
  colors,
  hitSlop,
  PHONE_MASK,
  SAFE_ZONE_BOTTOM,
  SCREEN_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '#config';

import useAppForm from '#hooks/useAppForm';
import useErrorHandler from '#hooks/useErrorHandler';

import { handleBEValidationError, isBEValidationError } from '#utils';

import { CreateUserDto } from './validator';

export const SignUp: React.FC<
  CompositeScreenProps<
    AuthScreenProps<AuthRoutes.SignUp>,
    RootScreenProps<AppRoutes>
  >
> = props => {
  const surnameInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { form, getFormInputProps } = useAppForm(CreateUserDto);

  const [register, registerMetadata] = useRegisterMutation();

  const [enableSecurePassword, setEnableSecurePassword] = useState(true);

  const onSubmit = async () => {
    Keyboard.dismiss();

    const formValues = form.getValues();

    try {
      await register({
        data: {
          ...formValues,
          phone: `+72${formValues.phone}`,
        },
      }).unwrap();
    } catch (e) {
      if (isBEValidationError<CreateUserDto>(e)) {
        handleBEValidationError(e.data.validation, form);
      } else {
        toast('Произошла неизвестная ошибка');
      }
    }
  };

  const submitForm = form.handleSubmit(onSubmit, () => {
    Keyboard.dismiss();

    toast('Некоторые поля содержат ошибки');
  });

  useErrorHandler(registerMetadata);

  return (
    <KeyboardAwareScrollView
      bottomOffset={120}
      contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.body}>
        <TapKeyboardDissmissArea />

        <Brand />

        <View>
          <Animated.View style={styles.titleBlock}>
            <TextXL
              color={colors.main.midnightBlue}
              weight="600"
            >
              Создать аккаунт
            </TextXL>
            <TextSmall>Мы здесь, чтобы помочь вам!</TextSmall>
          </Animated.View>

          <View style={styles.main}>
            <View style={styles.formInputs}>
              <View style={styles.fullnameInput}>
                <FormTextInput
                  autoFocus
                  autoCapitalize="words"
                  containerStyle={styles.inputInRow}
                  IconLeft={<Icon name="user" />}
                  label="Имя"
                  onSubmitEditing={() => surnameInputRef.current?.focus()}
                  {...getFormInputProps('name')}
                />
                <FormTextInput
                  autoCapitalize="words"
                  containerStyle={styles.inputInRow}
                  inputRef={surnameInputRef}
                  label="Фамилия"
                  onSubmitEditing={() => phoneInputRef.current?.focus()}
                  {...getFormInputProps('surname')}
                />
              </View>

              <FormTextInput
                IconLeft={
                  <Icon
                    name="call"
                    size={20}
                  />
                }
                inputRef={phoneInputRef}
                keyboardType="decimal-pad"
                label="Номер телефона"
                mask={PHONE_MASK}
                maxLength={18}
                placeholder=""
                type="phone"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                {...getFormInputProps('phone')}
              />
              <FormTextInput
                IconLeft={<Icon name="lock" />}
                IconRight={
                  <TouchableOpacity
                    onPress={() => setEnableSecurePassword(old => !old)}
                  >
                    <Icon
                      name={enableSecurePassword ? 'eye' : 'eyeSlash'}
                      size={20}
                    />
                  </TouchableOpacity>
                }
                inputRef={passwordInputRef}
                label="Пароль"
                returnKeyType="done"
                secureTextEntry={enableSecurePassword}
                onSubmitEditing={submitForm}
                {...getFormInputProps('password')}
              />
            </View>
            <Button
              isLoading={registerMetadata.isLoading}
              onPress={() => {
                submitForm();
                // props.navigation.push(AppRoutes.ProfileEditing);
              }}
            >
              Создать аккаунт
            </Button>
          </View>
        </View>

        <TouchableOpacity
          hitSlop={hitSlop}
          onPress={() => {
            Keyboard.dismiss();

            props.navigation.replace(AuthRoutes.SignIn);
          }}
        >
          <TextSmall textAlign="center">
            Уже есть аккаунт?{' '}
            <TextSmall color={colors.primary.normal}>Войти</TextSmall>
          </TextSmall>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingViewContentContainer: {
    flexGrow: 1,
    paddingBottom: SAFE_ZONE_BOTTOM,
  },
  fullnameInput: {
    flexDirection: 'row',
    gap: 8,
  },
  inputInRow: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    minHeight: SCREEN_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    paddingHorizontal: 20,
  },
  titleBlock: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  formInputs: {
    marginBottom: 32,
    gap: 20,
  },
  main: {
    marginBottom: 60,
  },
});
