import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Brand, Button, CodeInput, TextSmall, TextXL } from '#ui-kit';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import { useTimer } from '#components/OTPTimerProvider/use-timer';
import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import {
  PasswordRecoveryRoutes,
  PasswordRecoveryScreenProps,
} from '#navigation/PasswordRecovery/types';

import { colors, SAFE_ZONE_BOTTOM } from '#config';

import { animateLayout } from '#utils';

export const PasswordRecoveryCodeInput: React.FC<
  PasswordRecoveryScreenProps<PasswordRecoveryRoutes.PasswordRecoveryCodeInput>
> = props => {
  const OTPTimerCtx = useTimer();
  const [verificationCode, setVerificationCode] = useState('');
  const [verficationCodeError, setVerificationCodeError] = useState(false);

  useEffect(() => {
    setVerificationCodeError(verificationCode.length === 5);
  }, [verificationCode]);

  const resend = () => {
    animateLayout();
    OTPTimerCtx.start(6);
  };

  const resendAvailable = !OTPTimerCtx.valueRaw;

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
              <Button>Подтвердить</Button>
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
                >
                  <TextSmall textAlign="center">
                    Не получили код?{' '}
                    <TextSmall
                      color={colors.primary.normal}
                      onPress={resend}
                    >
                      Отправить снова
                    </TextSmall>
                  </TextSmall>
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
    marginBottom: 24,
    gap: 20,
  },

  main: {
    marginBottom: 24,
  },
});
