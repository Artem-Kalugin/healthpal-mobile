import { Keyboard, StyleSheet, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { toast } from 'react-hot-toast/headless';

import { FormTextInput } from '#components/infrastructure/FormTextInput';
import HeaderWithThreeSections from '#components/infrastructure/HeaderWithThreeSections';
import { useTimer } from '#components/infrastructure/providers/OTPTimer/use-timer';
import TapKeyboardDissmissArea from '#components/infrastructure/TapKeyboardDismissArea';

import { Brand, Button, Icon, TextSmall, TextXL } from '#ui-kit';

import {
  PasswordRecoveryRoutes,
  PasswordRecoveryScreenProps,
} from '#navigation/PasswordRecovery/types';

import { useVerifyPhoneMutation } from '#api/Auth';
import { RequestOtpDto } from '#api/Auth/dto/RequestOtpDto';

import { colors, SAFE_ZONE_BOTTOM } from '#config';

import useAppForm from '#hooks/useAppForm';
import useBEErrorHandler from '#hooks/useErrorHandler';

export const PasswordRecoveryPhoneInput: React.FC<
  PasswordRecoveryScreenProps<PasswordRecoveryRoutes.PasswordRecoveryPhoneInput>
> = props => {
  const OTPTimerCtx = useTimer();

  const { form, getFormInputProps } = useAppForm(RequestOtpDto);

  const [verifyPhone, verifyPhoneMetadata] = useVerifyPhoneMutation();

  const onSubmit = async () => {
    Keyboard.dismiss();

    const formValues = form.getValues();

    const phone = '+' + formValues.phone.replace(/\D/g, '');

    const res = await verifyPhone({
      data: {
        phone,
      },
    }).unwrap();

    OTPTimerCtx.start(10);

    toast(
      `${res.smsDemoOnly} - код в демо, т.к. интеграция смс-провайдера платная`,
    );

    props.navigation.navigate(
      PasswordRecoveryRoutes.PasswordRecoveryCodeInput,
      {
        phone,
      },
    );
  };

  const submitForm = form.handleSubmit(onSubmit, () => {
    Keyboard.dismiss();

    toast('Некоторые поля содержат ошибки');
  });

  useBEErrorHandler(verifyPhoneMetadata, form);

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
                Забыли пароль?
              </TextXL>
              <TextSmall textAlign="center">
                Введите ваш номер телефона — мы отправим код подтверждения.
              </TextSmall>
            </View>

            <View style={styles.main}>
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
                  onSubmitEditing={submitForm}
                  {...getFormInputProps('phone')}
                />
              </View>
              <Button
                disabled={!!OTPTimerCtx.valueRaw}
                isLoading={verifyPhoneMetadata.isLoading}
                onPress={submitForm}
              >
                {OTPTimerCtx.valueRaw
                  ? `Доступно через ${OTPTimerCtx.value}`
                  : 'Подтвердить'}
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
