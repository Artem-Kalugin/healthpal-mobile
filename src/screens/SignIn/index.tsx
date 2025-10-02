import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CompositeScreenProps } from '@react-navigation/native';

import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import { Button, Icon, TextInput, TextSmall, TextXL } from '#ui-kit';
import { Brand } from '#ui-kit/Brand';

import { AuthRoutes, AuthScreenProps } from '#navigation/Auth/types';
import { PasswordRecoveryRoutes } from '#navigation/PasswordRecovery/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { colors, SAFE_ZONE_BOTTOM } from '#config';

export const SignIn: React.FC<
  CompositeScreenProps<
    AuthScreenProps<AuthRoutes.SignIn>,
    RootScreenProps<AppRoutes>
  >
> = props => {
  return (
    <SafeAreaView
      edges={['top']}
      style={styles.container}
    >
      <KeyboardAwareScrollView
        bottomOffset={300}
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
                <TextInput
                  autoFocus
                  IconLeft={<Icon name="sms" />}
                  label="Ваша почта"
                />
                <TextInput
                  IconLeft={<Icon name="lock" />}
                  label="Пароль"
                />
              </View>
              <Button>Войти</Button>
            </View>
          </View>

          <View style={styles.footer}>
            <TextSmall
              color={colors.primary.normal}
              textAlign="center"
              onPress={() => {
                Keyboard.dismiss();
                props.navigation.push(AppRoutes.StackPasswordRecovery, {
                  screen: PasswordRecoveryRoutes.PasswordRecoveryEmailInput,
                });
              }}
            >
              Забыли пароль?
            </TextSmall>
            <TextSmall textAlign="center">
              Ещё нет аккаунта?{' '}
              <TextSmall
                color={colors.primary.normal}
                onPress={() => {
                  Keyboard.dismiss();
                  props.navigation.replace(AuthRoutes.SignUp);
                }}
              >
                Зарегистрироваться
              </TextSmall>
            </TextSmall>
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
