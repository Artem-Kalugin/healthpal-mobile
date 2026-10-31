import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInputInstance,
  TouchableOpacity,
  View,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { StackActions } from '@react-navigation/native';
import dayjs from 'dayjs';
import { toast } from 'react-hot-toast/headless';

import {
  FormTextInput,
  HeaderWithThreeSections,
  ServerImage,
  TapKeyboardDismissArea,
} from '#components/infrastructure';

import { Button, Icon, TextBase } from '#ui-kit';

import { ModalsRoutes, SelectModalParams } from '#navigation/Modals/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { logOut } from '#api';
import { useCompleteRegistationMutation } from '#api/Auth';
import { useGetCurrentUserQuery, useUpdateCurrentMutation } from '#api/User';
import type { UpdateUserDto } from '#api/User/dto/UpdateUserDto';

import { TokenService } from '#services/Token';

import {
  ActiveOpacities,
  BORDER_RADIUS_ROUNDED,
  hitSlopBig,
  Images,
  SAFE_ZONE_BOTTOM,
} from '#config';
import { colors } from '#config/colors';

import { useFormatters, useTranslation } from '#i18n';

import { useAppData } from '#hooks/useAppData';
import { useAppForm } from '#hooks/useAppForm';
import { useErrorHandler } from '#hooks/useErrorHandler';

import { reactSync } from '#utils';

import { store, useSelector } from '#store';

import { Gender } from '#generated/schema';

import { updateUserSchema } from './config';

const MINIMAL_BIRTHDAY_YEAR = new Date();
MINIMAL_BIRTHDAY_YEAR.setFullYear(new Date().getFullYear() - 18);

export const ProfileEditing: React.FC<
  RootScreenProps<AppRoutes.ProfileEditing>
> = props => {
  const { t } = useTranslation();
  const { formatDate } = useFormatters();

  const surnameInputRef = useRef<TextInputInstance>(null);
  const nicknameInputRef = useRef<TextInputInstance>(null);

  const { prefetchApp, isPrefetching } = useAppData();

  const token = useSelector(storage => storage.runtime.token);

  const userQuery = useGetCurrentUserQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const updateUser = useUpdateCurrentMutation();
  const completeRegistration = useCompleteRegistationMutation();

  const [targetRequest, targetMetadata] = token?.registrationComplete
    ? updateUser
    : completeRegistration;

  const initialUser = props.route?.params?.user || userQuery.data;

  const { form, getFormInputProps } = useAppForm(
    updateUserSchema,
    initialUser && {
      ...initialUser,
      birthday: initialUser.birthday ?? undefined,
      gender: initialUser.gender ?? undefined,
      nickname: initialUser.nickname ?? undefined,
    },
  );

  const [avatar, setAvatar] = useState<null | string>('');

  const goBack = () => {
    const canGoBack = props.navigation.canGoBack();

    if (canGoBack) {
      props.navigation.goBack();
    } else {
      logOut(store);
      props.navigation.dispatch(StackActions.popTo(AppRoutes.StackAuth));
    }
  };

  useEffect(() => {
    const user = userQuery.data;

    if (!user) {
      return;
    }

    for (const userProperty in user) {
      // for...in keys are typed as string, all form fields are present in user
      const key = userProperty as keyof UpdateUserDto;

      form.setValue(key, user[key] ?? undefined);
    }
  }, [userQuery.data]);

  const onSubmit = async () => {
    Keyboard.dismiss();

    const formValues = form.getValues();

    const birthday = dayjs(formValues.birthday).format('YYYY-MM-DD');

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
      await TokenService.save(res);

      await prefetchApp();

      props.navigation.replace(AppRoutes.StackMain);
    } else {
      goBack();
      toast(t('profileEditing.updated'));
    }
  };

  const submitForm = form.handleSubmit(onSubmit, values => {
    Keyboard.dismiss();

    toast(t('common.formHasErrors'));
  });

  const openSelectBirthdayModal = async () => {
    Keyboard.dismiss();

    await reactSync();

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
    });
  };

  const openSelectSexModal = async () => {
    Keyboard.dismiss();

    await reactSync();

    props.navigation.navigate(AppRoutes.StackModals, {
      screen: ModalsRoutes.Select,
      params: {
        title: t('profileEditing.selectGender'),
        data: Object.values(Gender),
        keyExtractor: item => item,
        checkedExtractor: (item, currentItem) => item === currentItem,
        renderItem: item => (
          <TextBase weight="400">{t(`gender.${item}`)}</TextBase>
        ),
        defaultValue: form.getValues('gender'),
        onSelectionEnd: item => {
          Keyboard.dismiss();
          //@ts-expect-error empty string is the intentional 'not selected' value caught by @IsNotEmpty, form is typed as Gender
          form.setValue('gender', item || '');
          item && form.clearErrors('gender');
        },
      } as SelectModalParams<Gender>,
    });
  };
  useErrorHandler(targetMetadata, form);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAvoidingViewContentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TapKeyboardDismissArea />
        <HeaderWithThreeSections
          leftElement={
            <TouchableOpacity
              hitSlop={hitSlopBig}
              onPress={goBack}
            >
              <Icon
                color={colors.grayscale['900']}
                name="arrowLeft"
              />
            </TouchableOpacity>
          }
          paddingHorizontal={0}
          title={
            token?.registrationComplete
              ? t('profileEditing.editTitle')
              : t('profileEditing.completeTitle')
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
            <ServerImage
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
              label={t('profileEditing.name')}
              onSubmitEditing={() => surnameInputRef.current?.focus()}
              {...getFormInputProps('name')}
            />
            <FormTextInput
              autoCapitalize="words"
              containerStyle={styles.inputInRow}
              inputRef={surnameInputRef}
              label={t('profileEditing.surname')}
              onSubmitEditing={() => nicknameInputRef.current?.focus()}
              {...getFormInputProps('surname')}
            />
          </View>
          <FormTextInput
            autoCapitalize="words"
            containerStyle={styles.inputInRow}
            inputRef={nicknameInputRef}
            label={t('profileEditing.nickname')}
            submitBehavior="blurAndSubmit"
            {...getFormInputProps('nickname')}
          />
          <TouchableOpacity onPress={openSelectBirthdayModal}>
            <FormTextInput
              IconLeft={<Icon name="calendar" />}
              label={t('profileEditing.birthday')}
              pointerEvents="none"
              submitBehavior="blurAndSubmit"
              transformValue={value =>
                value ? formatDate(dayjs(value).toDate()) : ''
              }
              {...getFormInputProps('birthday')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openSelectSexModal}>
            <FormTextInput
              IconRight={
                <Icon
                  name="chevronDown"
                  stroke={colors.grayscale['500']}
                />
              }
              label={t('profileEditing.gender')}
              pointerEvents="none"
              transformValue={value =>
                value ? t(`gender.${value as Gender}`) : ''
              }
              {...getFormInputProps('gender')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Button
            isLoading={targetMetadata.isLoading || isPrefetching}
            onPress={submitForm}
          >
            {token?.registrationComplete
              ? t('profileEditing.update')
              : t('profileEditing.complete')}
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
    ...StyleSheet.absoluteFill,
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
