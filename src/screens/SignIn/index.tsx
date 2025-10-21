import React, { useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CompositeScreenProps } from '@react-navigation/native';
import { toast } from 'react-hot-toast/headless';

import { FormTextInput } from '#components/FormTextInput';
import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import { Button, Icon, TextSmall, TextXL } from '#ui-kit';
import { Brand } from '#ui-kit/Brand';

import { AuthRoutes, AuthScreenProps } from '#navigation/Auth/types';
import { PasswordRecoveryRoutes } from '#navigation/PasswordRecovery/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { useLoginMutation } from '#api/Auth';
import { LoginDto } from '#api/Auth/dto/LoginDto';

import { colors, hitSlop, SAFE_ZONE_BOTTOM, SCREEN_HEIGHT } from '#config';

import useAppForm from '#hooks/useAppForm';
import useBEErrorHandler from '#hooks/useErrorHandler';
import { usePrefetchApp } from '#hooks/usePrefetchApp';

import { useDispatch } from '#store';
import { AppActions } from '#store/slices/app';
import { RuntimeActions } from '#store/slices/runtime';

export const SignIn: React.FC<
  CompositeScreenProps<
    AuthScreenProps<AuthRoutes.SignIn>,
    RootScreenProps<AppRoutes>
  >
> = props => {
  const dispatch = useDispatch();

  const { prefetchApp, isPrefetching } = usePrefetchApp();
  const passwordInputRef = useRef<TextInput>(null);

  const { form, getFormInputProps } = useAppForm(LoginDto, {
    phone: '+7 (888) 888-88-88',
    password: '123123aa',
  });

  const [login, loginMetadata] = useLoginMutation();

  const [enableSecurePassword, setEnableSecurePassword] = useState(true);

  const onSubmit = async () => {
    Keyboard.dismiss();

    const formValues = form.getValues();

    const response = await login({
      data: {
        ...formValues,
        phone: '+' + formValues.phone.replace(/\D/g, ''),
      },
    }).unwrap();

    dispatch(AppActions.setShouldShowOnboarding(false));

    dispatch(RuntimeActions.setToken(response));

    await prefetchApp();

    props.navigation.replace(
      //@ts-expect-error
      response.user.registrationComplete
        ? AppRoutes.StackMain
        : AppRoutes.ProfileEditing,
    );
    form.reset();
  };

  const submitForm = form.handleSubmit(onSubmit, () => {
    Keyboard.dismiss();

    toast('Некоторые поля содержат ошибки');
  });

  useBEErrorHandler(loginMetadata, form);

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.container}
    >
      <KeyboardAwareScrollView
        bottomOffset={SCREEN_HEIGHT * 0.8}
        contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          <TapKeyboardDissmissArea />

          <Brand />

          <View style={styles.main}>
            <View style={styles.titleBlock}>
              <TextXL
                color={colors.main.midnightBlue}
                weight="600"
              >
                Привет, рады снова видеть!
              </TextXL>
              <TextSmall>Надеемся, у вас всё хорошо.</TextSmall>
            </View>

            <View>
              <View style={styles.formInputs}>
                <FormTextInput
                  IconLeft={
                    <Icon
                      name="call"
                      size={20}
                    />
                  }
                  keyboardType="decimal-pad"
                  label="Номер телефона"
                  maxLength={18}
                  placeholder="Любой, смс в демо не придет"
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
                isLoading={loginMetadata.isLoading || isPrefetching}
                onPress={submitForm}
              >
                Войти
              </Button>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              hitSlop={hitSlop}
              onPress={() => {
                Keyboard.dismiss();
                props.navigation.push(AppRoutes.StackPasswordRecovery, {
                  screen: PasswordRecoveryRoutes.PasswordRecoveryPhoneInput,
                });
              }}
            >
              <TextSmall
                color={colors.primary.normal}
                textAlign="center"
              >
                Забыли пароль?
              </TextSmall>
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={hitSlop}
              onPress={() => {
                Keyboard.dismiss();
                props.navigation.replace(AuthRoutes.SignUp);
              }}
            >
              <TextSmall textAlign="center">
                Ещё нет аккаунта?{' '}
                <TextSmall color={colors.primary.normal}>
                  Зарегистрироваться
                </TextSmall>
              </TextSmall>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingViewContentContainer: {
    flexGrow: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: SAFE_ZONE_BOTTOM,
  },
  container: {
    flex: 1,
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
  footer: {
    height: 80,
    justifyContent: 'space-between',
  },
});
