import { useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { CompositeScreenProps } from '@react-navigation/native';
import { toast } from 'react-hot-toast/headless';

import { FormTextInput } from '#components/FormTextInput';
import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import { Brand, Button, Icon, TextSmall, TextXL } from '#ui-kit';

import { TabRoutes } from '#navigation/Main/Tab/types';
import { MainRoutes } from '#navigation/Main/types';
import {
  PasswordRecoveryRoutes,
  PasswordRecoveryScreenProps,
} from '#navigation/PasswordRecovery/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { useResetPasswordMutation } from '#api/Auth';
import { ResetPasswordDto } from '#api/Auth/dto/ResetPasswordDto';

import { colors, SAFE_ZONE_BOTTOM } from '#config';

import useAppForm from '#hooks/useAppForm';
import useBEErrorHandler from '#hooks/useErrorHandler';
import { usePrefetchApp } from '#hooks/usePrefetchApp';

import { useDispatch } from '#store';
import { AppActions } from '#store/slices/app';
import { RuntimeActions } from '#store/slices/runtime';

export const PasswordRecoverySetPassword: React.FC<
  CompositeScreenProps<
    PasswordRecoveryScreenProps<PasswordRecoveryRoutes.PasswordRecoverySetPassword>,
    RootScreenProps<AppRoutes>
  >
> = props => {
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const dispatch = useDispatch();

  const { prefetchApp, isPrefetching } = usePrefetchApp();

  const [enableSecurePassword, setEnableSecurePassword] = useState(true);
  const [enableSecureConfirmPassword, setEnableSecureConfirmPassword] =
    useState(true);

  const [resetPassowrd, resetPasswordMetadata] = useResetPasswordMutation();

  const { form, getFormInputProps } = useAppForm(ResetPasswordDto);

  const onSubmit = async () => {
    Keyboard.dismiss();

    const formValues = form.getValues();

    const res = await resetPassowrd({
      data: {
        ...formValues,
        token: props.route.params.recoveryToken,
      },
    }).unwrap();

    dispatch(AppActions.setShouldShowOnboarding(false));

    dispatch(RuntimeActions.setToken(res.accessToken));

    toast('Пароль был успешно изменен');

    await prefetchApp();

    if (res.user.registrationComplete) {
      props.navigation.replace(AppRoutes.StackMain, {
        screen: MainRoutes.Tab,
        params: {
          screen: TabRoutes.Profile,
        },
      });
    } else {
      props.navigation.replace(AppRoutes.ProfileEditing);
    }
  };

  const submitForm = form.handleSubmit(onSubmit, () => {
    Keyboard.dismiss();

    toast('Некоторые поля содержат ошибки');
  });

  useBEErrorHandler(resetPasswordMetadata, form);

  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={[styles.header]}
        title=""
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          <TapKeyboardDissmissArea />

          <Brand />

          <View>
            <View style={styles.titleBlock}>
              <TextXL
                color={colors.main.midnightBlue}
                weight="600"
              >
                Создайте новый пароль
              </TextXL>
              <TextSmall textAlign="center">
                Ваш новый пароль должен отличаться от ранее использованных.
              </TextSmall>
            </View>

            <View style={styles.main}>
              <View style={styles.formInputs}>
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
                  label="Пароль"
                  returnKeyType="done"
                  secureTextEntry={enableSecurePassword}
                  onSubmitEditing={() =>
                    confirmPasswordInputRef.current?.focus()
                  }
                  {...getFormInputProps('password')}
                />

                <FormTextInput
                  IconLeft={<Icon name="lock" />}
                  IconRight={
                    <TouchableOpacity
                      onPress={() =>
                        setEnableSecureConfirmPassword(old => !old)
                      }
                    >
                      <Icon
                        name={enableSecureConfirmPassword ? 'eye' : 'eyeSlash'}
                        size={20}
                      />
                    </TouchableOpacity>
                  }
                  inputRef={confirmPasswordInputRef}
                  label="Подтвердите пароль"
                  returnKeyType="done"
                  secureTextEntry={enableSecureConfirmPassword}
                  onSubmitEditing={submitForm}
                  {...getFormInputProps('confirmPassword')}
                />
              </View>
              <Button
                isLoading={resetPasswordMetadata.isLoading || isPrefetching}
                onPress={submitForm}
              >
                Сменить пароль
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    left: 0,
  },
  keyboardAvoidingViewContentContainer: {
    flexGrow: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
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
});
