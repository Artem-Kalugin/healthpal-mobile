import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { toast } from 'react-hot-toast/headless';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import { useTimer } from '#components/providers/OTPTimer/use-timer';
import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import {
  Brand,
  CodeInput,
  Loader,
  OTP_CELL_COUNT,
  TextSmall,
  TextXL,
} from '#ui-kit';

import {
  PasswordRecoveryRoutes,
  PasswordRecoveryScreenProps,
} from '#navigation/PasswordRecovery/types';

import { useVerifyCodeMutation, useVerifyPhoneMutation } from '#api/Auth';

import { colors, layoutAnimation, SAFE_ZONE_BOTTOM } from '#config';

import useBEErrorHandler from '#hooks/useErrorHandler';

export const PasswordRecoveryCodeInput: React.FC<
  PasswordRecoveryScreenProps<PasswordRecoveryRoutes.PasswordRecoveryCodeInput>
> = props => {
  const OTPTimerCtx = useTimer();

  const resendAvailable = !OTPTimerCtx.valueRaw;

  const [verifyPhone, verifyPhoneMetadata] = useVerifyPhoneMutation();
  const [verifyCode] = useVerifyCodeMutation();

  const [verificationCode, setVerificationCode] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    verificationCode.length === OTP_CELL_COUNT && onDoneEditing();
  }, [verificationCode]);

  const onDoneEditing = async () => {
    try {
      const res = await verifyCode({
        data: {
          otp: verificationCode,
          phone: props.route.params.phone,
        },
      }).unwrap();

      props.navigation.replace(
        PasswordRecoveryRoutes.PasswordRecoverySetPassword,
        {
          phone: props.route.params.phone,
          code: verificationCode,
          recoveryToken: res.recoveryToken,
        },
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setHasError(true);
    }
  };

  const onResend = async () => {
    if (verifyPhoneMetadata.isLoading || !resendAvailable) {
      return;
    }

    toast(`Код был отправлен на телефон ${props.route.params.phone}`);

    OTPTimerCtx.start(10);

    const res = await verifyPhone({
      data: {
        phone: props.route.params.phone,
      },
    }).unwrap();

    toast(
      `${res.smsDemoOnly} - код в демо, т.к. интеграция смс-провайдера платная`,
    );
  };

  useBEErrorHandler(verifyPhoneMetadata);

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
                Подтверждение кода
              </TextXL>
              <TextSmall textAlign="center">
                Введите код, который мы отправили на ваш номер телефона.
              </TextSmall>
            </View>

            <View style={styles.main}>
              <CodeInput
                autoFocus
                isError={hasError}
                value={verificationCode}
                setValue={setVerificationCode}
              />
            </View>

            <View>
              {!resendAvailable ? (
                <Animated.View
                  key="timer"
                  entering={FadeIn}
                  exiting={FadeOut}
                >
                  <TextSmall
                    color={colors.grayscale[400]}
                    textAlign="center"
                  >
                    Отправить снова можно будет через {OTPTimerCtx.value}
                  </TextSmall>
                </Animated.View>
              ) : (
                <Animated.View
                  key="resend"
                  entering={FadeIn}
                  exiting={FadeOut}
                  style={styles.resendContainer}
                >
                  <Animated.View layout={layoutAnimation}>
                    <TextSmall textAlign="center">
                      Не получили код?{' '}
                      <TextSmall
                        color={
                          verifyPhoneMetadata.isLoading
                            ? colors.grayscale['400']
                            : colors.primary.normal
                        }
                        onPress={onResend}
                      >
                        Отправить снова
                      </TextSmall>
                    </TextSmall>
                  </Animated.View>
                  <Animated.View layout={layoutAnimation}>
                    {verifyPhoneMetadata.isLoading ? (
                      <Loader cover={false} />
                    ) : null}
                  </Animated.View>
                </Animated.View>
              )}
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
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  main: {
    marginBottom: 24,
  },
});
