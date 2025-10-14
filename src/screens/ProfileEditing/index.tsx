import React, { useEffect, useRef, useState } from 'react';
import {
  TextInput as _TextInput,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { StackActions } from '@react-navigation/native';
import { DateTime } from 'luxon';
import { toast } from 'react-hot-toast/headless';

import { FormTextInput } from '#components/FormTextInput';
import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import TapKeyboardDissmissArea from '#components/TapKeyboardDismissArea';

import { Button, Icon, Image, TextBase } from '#ui-kit';
import ButtonGoBack from '#ui-kit/ButtonGoBack';

import { ModalsRoutes, SelectModalParams } from '#navigation/Modals/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { useCompleteRegistationMutation } from '#api/Auth';
import { useGetCurrentUserQuery, useUpdateCurrentMutation } from '#api/User';
import { UpdateUserDto } from '#api/User/dto/UpdateUserDto';

import {
  ActiveOpacities,
  BORDER_RADIUS_ROUNDED,
  colors,
  Images,
  SAFE_ZONE_BOTTOM,
} from '#config';
import { MapGenderToLabel } from '#config/locale';

import useAppForm from '#hooks/useAppForm';
import useBEErrorHandler from '#hooks/useErrorHandler';

import { delay } from '#utils';

import { useDispatch, useSelector } from '#store';
import { RuntimeActions } from '#store/slices/runtime';

import { Gender } from '#generated/schema';

const MINIMAL_BIRTHDAY_YEAR = new Date();
MINIMAL_BIRTHDAY_YEAR.setFullYear(new Date().getFullYear() - 18);

export const ProfileEditing: React.FC<
  RootScreenProps<AppRoutes.ProfileEditing>
> = props => {
  const surnameInputRef = useRef<_TextInput>(null);
  const nicknameInputRef = useRef<_TextInput>(null);

  const dispatch = useDispatch();

  const token = useSelector(store => store.runtime.token);

  const userQuery = useGetCurrentUserQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const updateUser = useUpdateCurrentMutation();
  const completeRegistration = useCompleteRegistationMutation();

  const [targetRequest, targetMetadata] = token?.registrationComplete
    ? updateUser
    : completeRegistration;

  const { form, getFormInputProps } = useAppForm(UpdateUserDto, userQuery.data);

  const [avatar, setAvatar] = useState<null | string>('');

  const goBack = () => {
    const canGoBack = props.navigation.canGoBack();

    if (canGoBack) {
      props.navigation.goBack();
    } else {
      props.navigation.dispatch(StackActions.popTo(AppRoutes.StackAuth));
    }
  };

  useEffect(() => {
    const user = userQuery.data;

    if (!user) {
      return;
    }

    for (const userProperty in user) {
      //@ts-expect-error
      form.setValue(userProperty, user[userProperty]);
    }
  }, [userQuery.data]);

  const onSubmit = async () => {
    Keyboard.dismiss();

    const formValues = form.getValues();

    const birthday = DateTime.fromISO(formValues.birthday)
      .setLocale('ru')
      .toFormat('yyyy-MM-dd');

    const res = await targetRequest({
      data: {
        birthday,
        gender: formValues.gender,
        name: formValues.name,
        nickname: formValues.nickname,
        surname: formValues.surname,
        ...(avatar ? { avatar: avatar } : {}),
      },
    }).unwrap();

    if ('accessToken' in res) {
      dispatch(RuntimeActions.setToken(res.accessToken));

      //todo prefetch
      await delay(0);

      //@ts-expect-error
      props.navigation.replace(AppRoutes.StackMain);
    } else {
      goBack();
      toast('Данные успешно обновлены');
    }
  };

  const submitForm = form.handleSubmit(onSubmit, values => {
    Keyboard.dismiss();

    toast('Некоторые поля содержат ошибки');
  });

  useBEErrorHandler(targetMetadata);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        bottomOffset={300}
        contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TapKeyboardDissmissArea />
        <HeaderWithThreeSections
          leftElement={<ButtonGoBack onPress={goBack} />}
          paddingHorizontal={0}
          title={
            token?.registrationComplete
              ? 'Изменение профиля'
              : 'Заполните ваш профиль'
          }
        />

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
              source={avatar || userQuery.data?.avatar || Images.profileCircle}
              style={styles.avatarImage}
            />
            <Icon
              name="messageEdit"
              style={styles.profileImageEditIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.formInputs}>
          <View style={styles.fullnameInput}>
            <FormTextInput
              autoCapitalize="words"
              containerStyle={styles.inputInRow}
              IconLeft={<Icon name="user" />}
              label="Имя"
              onSubmitEditing={() => surnameInputRef.current?.focus()}
              {...getFormInputProps('name')}
            />
            <FormTextInput
              autoCapitalize="words"
              containerStyle={styles.inputInRow}
              inputRef={surnameInputRef}
              label="Фамилия"
              onSubmitEditing={() => nicknameInputRef.current?.focus()}
              {...getFormInputProps('surname')}
            />
          </View>
          <FormTextInput
            autoCapitalize="words"
            containerStyle={styles.inputInRow}
            inputRef={nicknameInputRef}
            label="Имя пользователя"
            submitBehavior="blurAndSubmit"
            {...getFormInputProps('nickname')}
          />
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(AppRoutes.StackModals, {
                screen: ModalsRoutes.DateTimePicker,
                params: {
                  pickerProps: {
                    maximumDate: MINIMAL_BIRTHDAY_YEAR,
                    date: form.getValues('birthday')
                      ? new Date(form.getValues('birthday'))
                      : MINIMAL_BIRTHDAY_YEAR,
                    mode: 'date',
                  },
                  onEnd: _date => {
                    Keyboard.dismiss();
                    form.setValue('birthday', _date.toISOString());
                    form.clearErrors('birthday');
                  },
                },
              })
            }
          >
            <FormTextInput
              IconLeft={<Icon name="calendar" />}
              label="День рождения"
              pointerEvents="none"
              submitBehavior="blurAndSubmit"
              transformValue={value =>
                value
                  ? DateTime.fromISO(value)
                      .setLocale('ru')
                      .toFormat('dd LLLL yyyy')
                  : ''
              }
              {...getFormInputProps('birthday')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(AppRoutes.StackModals, {
                screen: ModalsRoutes.Select,
                params: {
                  title: 'Выберите пол',
                  data: Object.values(Gender),
                  keyExtractor: item => item,
                  checkedExtractor: (item, currentItem) => item === currentItem,
                  renderItem: item => (
                    <TextBase weight="400">{MapGenderToLabel[item]}</TextBase>
                  ),
                  defaultValue: form.getValues('gender'),
                  onSelectionEnd: item => {
                    Keyboard.dismiss();
                    form.setValue('gender', item || '');
                    item && form.clearErrors('gender');
                  },
                } as SelectModalParams<Gender>,
              })
            }
          >
            <FormTextInput
              IconRight={
                <Icon
                  name="chevronDown"
                  stroke={colors.grayscale['500']}
                />
              }
              label="Пол"
              pointerEvents="none"
              transformValue={value =>
                value ? MapGenderToLabel[value as Gender] : ''
              }
              {...getFormInputProps('gender')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Button onPress={submitForm}>
            {token?.registrationComplete ? 'Обновить' : 'Войти'}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingViewContentContainer: {
    flexGrow: 1,
  },
  footer: {
    marginTop: 'auto',
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
    marginBottom: 24,
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
  fullnameInput: {
    flexDirection: 'row',
    gap: 8,
  },
  inputInRow: {
    flex: 1,
  },
});
