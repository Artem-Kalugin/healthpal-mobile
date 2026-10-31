import React, { useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInputInstance,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaskedTextInputRef } from 'react-native-advanced-input-mask';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated from 'react-native-reanimated';

import { CompositeScreenProps } from '@react-navigation/native';
import { toast } from 'react-hot-toast/headless';

import {
  FormTextInput,
  TapKeyboardDismissArea,
} from '#components/infrastructure';

import { Brand, Button, Icon, TextSmall, TextXL } from '#ui-kit';

import { AuthRoutes, AuthScreenProps } from '#navigation/Auth/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { useRegisterMutation } from '#api/Auth';

import { TokenService } from '#services/Token';

import {
  hitSlop,
  SAFE_ZONE_BOTTOM,
  SCREEN_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '#config';
import { colors } from '#config/colors';

import { useTranslation } from '#i18n';

import { useAppForm } from '#hooks/useAppForm';
import { useErrorHandler } from '#hooks/useErrorHandler';

import { reactSync } from '#utils';

import { useDispatch } from '#store';
import { AppActions } from '#store/slices/app';

import { createUserSchema } from './config';

export const SignUp: React.FC<
  CompositeScreenProps<
    AuthScreenProps<AuthRoutes.SignUp>,
    RootScreenProps<AppRoutes>
  >
> = props => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const surnameInputRef = useRef<TextInputInstance>(null);
  const phoneInputRef = useRef<MaskedTextInputRef>(null);
  const passwordInputRef = useRef<TextInputInstance>(null);

  const { form, getFormInputProps } = useAppForm(createUserSchema, {
    phone: '+',
  });

  const [register, registerMetadata] = useRegisterMutation();

  const [enableSecurePassword, setEnableSecurePassword] = useState(true);

  const onSubmit = async () => {
    Keyboard.dismiss();

    const formValues = form.getValues();

    const response = await register({
      data: {
        ...formValues,
        phone: '+' + formValues.phone.replace(/\D/g, ''),
      },
    }).unwrap();

    dispatch(AppActions.setShouldShowOnboarding(false));

    await TokenService.save(response);

    await reactSync();

    if (response.user.registrationComplete) {
      props.navigation.replace(AppRoutes.StackMain);
    } else {
      props.navigation.replace(AppRoutes.ProfileEditing, {
        user: response.user,
      });
    }

    form.reset();
  };

  const submitForm = form.handleSubmit(onSubmit, () => {
    Keyboard.dismiss();

    toast(t('common.formHasErrors'));
  });

  useErrorHandler(registerMetadata, form);

  return (
    <KeyboardAwareScrollView
      bottomOffset={120}
      contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.body}>
        <TapKeyboardDismissArea />

        <Brand />

        <View>
          <Animated.View style={styles.titleBlock}>
            <TextXL
              color={colors.main.midnightBlue}
              weight="600"
            >
              {t('signUp.title')}
            </TextXL>
            <TextSmall>{t('signUp.subtitle')}</TextSmall>
          </Animated.View>

          <View style={styles.main}>
            <View style={styles.formInputs}>
              <View style={styles.fullnameInput}>
                <FormTextInput
                  autoFocus
                  autoCapitalize="words"
                  containerStyle={styles.inputInRow}
                  IconLeft={<Icon name="user" />}
                  label={t('signUp.name.label')}
                  onSubmitEditing={() => surnameInputRef.current?.focus()}
                  {...getFormInputProps('name')}
                />
                <FormTextInput
                  autoCapitalize="words"
                  containerStyle={styles.inputInRow}
                  inputRef={surnameInputRef}
                  label={t('signUp.surname.label')}
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
                keyboardType="phone-pad"
                label={t('signUp.phone.label')}
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
                label={t('signUp.password.label')}
                returnKeyType="done"
                secureTextEntry={enableSecurePassword}
                onSubmitEditing={() => submitForm()}
                {...getFormInputProps('password')}
              />
            </View>
            <Button
              isLoading={registerMetadata.isLoading}
              onPress={submitForm}
            >
              {t('signUp.submit')}
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
            {t('signUp.hasAccount')}{' '}
            <TextSmall color={colors.primary.normal}>
              {t('signUp.signIn')}
            </TextSmall>
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
