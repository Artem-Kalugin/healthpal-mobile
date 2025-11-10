import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as ImagePickerExpo from 'expo-image-picker';

import ModalWrapper from '#components/infrastructure/ModalWrapper';

import { Button, Icon, TextSmall, TextXL } from '#ui-kit';

import { ModalsRoutes, ModalsScreenProps } from '#navigation/Modals/types';

import { PermissionManager } from '#services/Permissions';
import {
  CameraPermission,
  GalleryPermission,
} from '#services/Permissions/config';

import { colors } from '#config';

import useModal from '#hooks/useModalState';

export const ImagePicker: React.FC<
  ModalsScreenProps<ModalsRoutes.ImagePicker>
> = props => {
  const modal = useModal(true);

  const pickImage = async () => {
    const permission = await PermissionManager.request(GalleryPermission);

    if (!permission) {
      return;
    }

    let result = await ImagePickerExpo.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.97,
      shape: 'oval',
      base64: true,
    });

    if (!result.canceled) {
      modal.close();
      props.route.params.onEnd(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    const permission = await PermissionManager.request(CameraPermission);

    if (!permission) {
      return;
    }

    let result = await ImagePickerExpo.launchCameraAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.97,
      shape: 'oval',
      base64: true,
    });

    if (!result.canceled) {
      modal.close();
      props.route.params.onEnd(result.assets[0]);
    }
  };

  return (
    <ModalWrapper
      contentContainerStyle={styles.modalContentContainer}
      visible={modal.visible}
      onClose={modal.close}
    >
      <TextXL
        style={styles.title}
        weight="600"
      >
        Выберите изображение
      </TextXL>

      <View style={styles.buttonsContainer}>
        <Button
          appearance="outlined"
          size="small"
          onPress={pickImage}
        >
          <Icon
            fill={colors.main.midnightBlue}
            name="gallery"
            size={20}
          />
          <TextSmall weight="500">Выбрать из галереи</TextSmall>
        </Button>
        <Button
          appearance="outlined"
          size="small"
          onPress={takePhoto}
        >
          <Icon
            fill={colors.main.midnightBlue}
            name="camera"
            size={20}
          />
          <TextSmall weight="500">Сделать фотографию</TextSmall>
        </Button>
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  modalContentContainer: {
    paddingTop: 16,
    paddingHorizontal: 0,
  },
  buttonsContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
});
