import { StyleSheet, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import { Brand, Button, Icon, TextInput, TextSmall, TextXL } from '#ui-kit';

import {
  PasswordRecoveryRoutes,
  PasswordRecoveryScreenProps,
} from '#navigation/PasswordRecovery/types';

import { colors, SAFE_ZONE_BOTTOM } from '#config';

export const PasswordRecoverySetPassword: React.FC<
  PasswordRecoveryScreenProps<PasswordRecoveryRoutes.PasswordRecoverySetPassword>
> = props => {
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
                <TextInput
                  IconLeft={<Icon name="lock" />}
                  label="Пароль"
                />

                <TextInput
                  IconLeft={<Icon name="lock" />}
                  label="Повторите пароль"
                />
              </View>
              <Button
                onPress={() =>
                  props.navigation.navigate(
                    PasswordRecoveryRoutes.PasswordRecoveryCodeInput,
                    {
                      phone: '',
                    },
                  )
                }
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
