import { Keyboard, StyleSheet, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { toast } from 'react-hot-toast/headless';

import {
  FormTextInput,
  HeaderWithThreeSections,
  TapKeyboardDismissArea,
} from '#components/infrastructure';
import { useTimer } from '#components/infrastructure/providers/OTPTimer';

import { Brand, Button, Icon, TextSmall, TextXL } from '#ui-kit';

import {
  PasswordRecoveryRoutes,
  PasswordRecoveryScreenProps,
} from '#navigation/PasswordRecovery/types';

import { useVerifyPhoneMutation } from '#api/Auth';

import { SAFE_ZONE_BOTTOM } from '#config';
import { colors } from '#config/colors';

import { useTranslation } from '#i18n';

import { useAppForm } from '#hooks/useAppForm';
import { useErrorHandler } from '#hooks/useErrorHandler';

import { requestOtpSchema } from './config';

export const PasswordRecoveryPhoneInput: React.FC<
  PasswordRecoveryScreenProps<PasswordRecoveryRoutes.PasswordRecoveryPhoneInput>
> = props => {
  const { t } = useTranslation();

  const OTPTimerCtx = useTimer();

  const { form, getFormInputProps } = useAppForm(requestOtpSchema, {
    phone: '',
  });

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

    toast(t('common.smsDemo', { code: res.smsDemoOnly }));

    props.navigation.navigate(
      PasswordRecoveryRoutes.PasswordRecoveryCodeInput,
      {
        phone,
      },
    );
  };

  const submitForm = form.handleSubmit(onSubmit, () => {
    Keyboard.dismiss();

    toast(t('common.formHasErrors'));
  });

  useErrorHandler(verifyPhoneMetadata, form);

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
          <TapKeyboardDismissArea />

          <Brand />

          <View>
            <View style={styles.titleBlock}>
              <TextXL
                color={colors.main.midnightBlue}
                weight="600"
              >
                {t('passwordRecoveryPhoneInput.title')}
              </TextXL>
              <TextSmall textAlign="center">
                {t('passwordRecoveryPhoneInput.subtitle')}
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
                  label={t('passwordRecoveryPhoneInput.phone.label')}
                  type="phone"
                  onSubmitEditing={() => submitForm()}
                  {...getFormInputProps('phone')}
                />
              </View>
              <Button
                disabled={!!OTPTimerCtx.valueRaw}
                isLoading={verifyPhoneMetadata.isLoading}
                onPress={submitForm}
              >
                {OTPTimerCtx.valueRaw
                  ? t('passwordRecoveryPhoneInput.availableIn', {
                      value: OTPTimerCtx.value,
                    })
                  : t('passwordRecoveryPhoneInput.submit')}
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
