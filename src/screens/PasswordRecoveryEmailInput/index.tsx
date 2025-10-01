import { StyleSheet, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand, Button, Icon, TextInput, TextSmall, TextXL } from '#ui-kit';

import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import {
  PasswordRecoveryRoutes,
  PasswordRecoveryScreenProps,
} from '#navigation/PasswordRecovery/types';

import { colors, SAFE_ZONE_BOTTOM } from '#config';

export const PasswordRecoveryEmailInput: React.FC<
  PasswordRecoveryScreenProps<PasswordRecoveryRoutes.PasswordRecoveryEmailInput>
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

          <View>
            <View style={styles.titleBlock}>
              <TextXL
                color={colors.main.midnightBlue}
                weight="600"
              >
                Забыли пароль?
              </TextXL>
              <TextSmall>
                Введите вашу почту — мы отправим код подтверждения.
              </TextSmall>
            </View>

            <View style={styles.main}>
              <View style={styles.formInputs}>
                <TextInput
                  IconLeft={<Icon name="sms" />}
                  label="Ваша почта"
                />
              </View>
              <Button>Отправить код</Button>
            </View>
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
    marginBottom: 60,
  },
});
