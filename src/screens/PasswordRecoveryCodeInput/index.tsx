import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { toast } from 'react-hot-toast/headless';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import { useTimer } from '#components/providers/OTPTimer/use-timer';
import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import { Brand, Button, CodeInput, Loader, TextSmall, TextXL } from '#ui-kit';

import {
  PasswordRecoveryRoutes,
  PasswordRecoveryScreenProps,
} from '#navigation/PasswordRecovery/types';

import { colors, SAFE_ZONE_BOTTOM } from '#config';

import { animateLayout, delay } from '#utils';

export const PasswordRecoveryCodeInput: React.FC<
  PasswordRecoveryScreenProps<PasswordRecoveryRoutes.PasswordRecoveryCodeInput>
> = props => {
  const OTPTimerCtx = useTimer();

  const resendAvailable = !OTPTimerCtx.valueRaw;

  const [verificationCode, setVerificationCode] = useState('');
  const [verficationCodeError, setVerificationCodeError] = useState(false);
  const [isRequestPendingMock, setIsRequestPendingMock] = useState(false);

  useEffect(() => {
    setVerificationCodeError(verificationCode.length === 5);
  }, [verificationCode]);

  const onResend = async () => {
    if (isRequestPendingMock || !resendAvailable) {
      return;
    }

    animateLayout();
    setIsRequestPendingMock(true);

    await delay(400);

    animateLayout();
    setIsRequestPendingMock(false);

    toast('Код был отправлен на электронный адрес example@mail.ru');

    OTPTimerCtx.start(5);
  };

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
                Введите код, который мы отправили на вашу почту.
              </TextSmall>
            </View>

            <View style={styles.main}>
              <View style={styles.formInputs}>
                <CodeInput
                  autoFocus
                  isError={verficationCodeError}
                  value={verificationCode}
                  setValue={setVerificationCode}
                />
              </View>
              <Button
                onPress={() => {
                  props.navigation.navigate(
                    PasswordRecoveryRoutes.PasswordRecoverySetPassword,
                    {
                      phone: '',
                      code: '',
                    },
                  );
                }}
              >
                Подтвердить
              </Button>
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
                  layout={LinearTransition.easing(Easing.ease)}
                  style={styles.resendContainer}
                >
                  <Animated.View layout={LinearTransition.easing(Easing.ease)}>
                    <TextSmall textAlign="center">
                      Не получили код?{' '}
                      <TextSmall
                        color={
                          isRequestPendingMock
                            ? colors.grayscale['400']
                            : colors.primary.normal
                        }
                        onPress={onResend}
                      >
                        Отправить снова
                      </TextSmall>
                    </TextSmall>
                  </Animated.View>
                  <Animated.View layout={LinearTransition.easing(Easing.ease)}>
                    {isRequestPendingMock ? <Loader cover={false} /> : null}
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
  formInputs: {
    marginBottom: 32,
    gap: 20,
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
