import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand, Button, Icon, TextInput, TextSmall, TextXL } from '#ui-kit';

import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import { AppRoutes, RootScreenProps } from '#navigation/types';

import { colors, SAFE_ZONE_BOTTOM } from '#config';

export const SignUp: React.FC<RootScreenProps<AppRoutes>> = props => {
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

          <View>
            <View style={styles.titleBlock}>
              <TextXL
                color={colors.main.midnightBlue}
                weight="600"
              >
                Создать аккаунт
              </TextXL>
              <TextSmall>Мы здесь, чтобы помочь вам!</TextSmall>
            </View>

            <View style={styles.main}>
              <View style={styles.formInputs}>
                <TextInput
                  autoFocus
                  IconLeft={<Icon name="user" />}
                  label="Ваше имя"
                />
                <TextInput
                  IconLeft={<Icon name="sms" />}
                  label="Ваша почта"
                />
                <TextInput
                  IconLeft={<Icon name="lock" />}
                  label="Пароль"
                />
              </View>
              <Button>Создать аккаунт</Button>
            </View>
          </View>
          <TextSmall textAlign="center">
            Уже есть аккаунт?{' '}
            <TextSmall
              color={colors.primary.normal}
              onPress={() => {
                Keyboard.dismiss();
                props.navigation.replace(AppRoutes.SignIn);
              }}
            >
              Войти
            </TextSmall>
          </TextSmall>
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
    marginBottom: 24,
    gap: 20,
  },
  main: {
    marginBottom: 60,
  },
});
