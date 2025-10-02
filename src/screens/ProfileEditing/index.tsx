import React from 'react';
import { StyleSheet, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Image } from 'expo-image';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import { Button, Icon, TextInput } from '#ui-kit';

import { AppRoutes, RootScreenProps } from '#navigation/types';

import { Images, SAFE_ZONE_BOTTOM } from '#config';

export const ProfileEditing: React.FC<
  RootScreenProps<AppRoutes.ProfileEditing>
> = props => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        bottomOffset={300}
        contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <HeaderWithThreeSections
          paddingHorizontal={0}
          title="Заполните ваш профиль"
        />
        <View style={styles.body}>
          <TapKeyboardDissmissArea />
          <View style={styles.profileImageContainer}>
            <Image
              key={1}
              contentFit="contain"
              source={Images.profileCircle}
              style={styles.profileCircleImage}
            />
          </View>

          <View>
            <View>
              <View style={styles.formInputs}>
                <TextInput label="ФИО" />
                <TextInput label="Имя Пользователя" />
                <TextInput label="Электронная почта" />
                <TextInput label="Дата рождения" />
                <TextInput label="Пол" />
                <TextInput
                  IconLeft={<Icon name="lock" />}
                  label="Пароль"
                />
              </View>
              <Button>Войти</Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
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
  profileImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCircleImage: {
    flex: 1,
    height: 202,
    maxHeight: 202,
    aspectRatio: 1,
  },
  formInputs: {
    marginBottom: 32,
    gap: 20,
  },
});
