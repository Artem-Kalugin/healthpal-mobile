import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Image } from 'expo-image';
import { DateTime } from 'luxon';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import { Button, Icon, TextBase, TextInput, TextXL } from '#ui-kit';

import { ModalsRoutes, SelectModalParams } from '#navigation/Modals/types';
import { TabRoutes } from '#navigation/Tab/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import {
  ActiveOpacities,
  BORDER_RADIUS_ROUNDED,
  colors,
  Images,
  SAFE_ZONE_BOTTOM,
} from '#config';

const MINIMAL_BIRTHDAY_YEAR = new Date();
MINIMAL_BIRTHDAY_YEAR.setFullYear(new Date().getFullYear() - 18);

export const ProfileEditing: React.FC<
  RootScreenProps<AppRoutes.ProfileEditing>
> = props => {
  const [avatar, setAvatar] = useState<null | string>('');
  const [date, setDate] = useState<Date | null>();
  const [sex, setSex] = useState<string>();

  const [test, setTest] = useState<string>();
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
                source={avatar || Images.profileCircle}
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
                <TextInput
                  label="Имя Пользователя"
                  value={test}
                  onChange={setTest}
                />
                <TextInput label="Электронная почта" />
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(AppRoutes.StackModals, {
                      screen: ModalsRoutes.DateTimePicker,
                      params: {
                        pickerProps: {
                          maximumDate: MINIMAL_BIRTHDAY_YEAR,
                          date: date || MINIMAL_BIRTHDAY_YEAR,
                          mode: 'date',
                        },
                        onEnd: _date => {
                          setDate(_date);
                        },
                      },
                    })
                  }
                >
                  <TextInput
                    IconLeft={<Icon name="calendar" />}
                    label="Дата рождения"
                    pointerEvents="none"
                    showDeleteIfFocusedOnly={false}
                    value={
                      date
                        ? DateTime.fromJSDate(date)
                            .setLocale('ru')
                            .toFormat('dd LLLL yyyy')
                        : ''
                    }
                    onChange={value => value === '' && setDate(null)}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(AppRoutes.StackModals, {
                      screen: ModalsRoutes.Select,
                      params: {
                        title: 'Выберите пол',
                        data: ['Мужской', 'Женский'],
                        keyExtractor: item => item,
                        checkedExtractor: (item, currentItem) =>
                          item === currentItem,
                        renderItem: item => (
                          <TextBase weight="400">{item}</TextBase>
                        ),
                        defaultValue: sex,
                        onSelectionEnd: item => setSex(item),
                      } as SelectModalParams<string>,
                    })
                  }
                >
                  <TextInput
                    IconRight={
                      <Icon
                        fill={colors.grayscale['500']}
                        name="chevronDown"
                      />
                    }
                    label="Пол"
                    pointerEvents="none"
                    value={sex}
                  />
                </TouchableOpacity>
              </View>
              <Button
                onPress={() =>
                  props.navigation.navigate(AppRoutes.Tab, {
                    screen: TabRoutes.Home,
                  })
                }
              >
                Войти
              </Button>
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
