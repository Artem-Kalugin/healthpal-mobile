import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Image } from 'expo-image';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import { Button, Icon, TextInput } from '#ui-kit';

import { ModalsRoutes } from '#navigation/Modals/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import {
  ActiveOpacities,
  BORDER_RADIUS_ROUNDED,
  SAFE_ZONE_BOTTOM,
} from '#config';

export const ProfileEditing: React.FC<
  RootScreenProps<AppRoutes.ProfileEditing>
> = props => {
  const [avatar, setAvatar] = useState<null | string>('');

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
          <View style={styles.avatarWrapper}>
            <TouchableOpacity
              activeOpacity={ActiveOpacities.HEAVY}
              style={styles.avatarImageContainer}
              onPress={() =>
                props.navigation.navigate(AppRoutes.StackModals, {
                  screen: ModalsRoutes.ImagePicker,
                  params: {
                    onEnd(image) {
                      setAvatar(image.uri);
                    },
                  },
                })
              }
            >
              <Image
                contentFit="contain"
                source={avatar}
                style={styles.avatarImage}
              />
              <Icon
                name="messageEdit"
                style={styles.profileImageEditIcon}
              />
            </TouchableOpacity>
          </View>

          <View>
            <View>
              <View style={styles.formInputs}>
                <TextInput label="ФИО" />
                <TextInput label="Имя Пользователя" />
                <TextInput label="Электронная почта" />
                <TextInput label="Дата рождения" />
                <TextInput label="Пол" />
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
    paddingBottom: SAFE_ZONE_BOTTOM,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    flex: 1,
    maxHeight: 202,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    padding: 16,
  },
  avatarImageContainer: {
    flex: 1,
    aspectRatio: 1,
  },
  avatarImage: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BORDER_RADIUS_ROUNDED,
  },
  profileImageEditIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  formInputs: {
    marginBottom: 32,
    gap: 20,
  },
});
