import { IS_IOS } from '#config';

import { PermissionRequestConfig, RequestedPermission } from './types';

export const CameraPermission: RequestedPermission = IS_IOS
  ? ['ios.permission.CAMERA']
  : ['android.permission.CAMERA'];
export const CameraPermissionConfig = {
  toastForUnavailablePermission:
    'Данная возможность недоступна на вашем устройстве',
  toastForDeniedPermission:
    'Для изменения фотографии профиля необходим доступ к камере',
  blockedAlert: {
    title: 'Выдача разрешения заблокирована',
    message: 'Для выдачи разрешения необходимо перейти в настройки',
  },
};

export const GalleryPermission: RequestedPermission = IS_IOS
  ? ['ios.permission.PHOTO_LIBRARY']
  : [];
export const GalleryPermissionConfig = {
  toastForUnavailablePermission:
    'Данная возможность недоступна на вашем устройстве',
  toastForDeniedPermission:
    'Для изменения фотографии профиля необходим доступ к галерее',
  blockedAlert: {
    title: 'Выдача разрешения заблокирована',
    message: 'Для выдачи разрешения необходимо перейти в настройки',
  },
};

export const LocationPermission: RequestedPermission = IS_IOS
  ? ['ios.permission.LOCATION_WHEN_IN_USE']
  : ['android.permission.ACCESS_COARSE_LOCATION'];
export const LocationPermissionConfig = {
  toastForUnavailablePermission:
    'Отслеживание ближайших медцентров и расположения пользователя недоступно',
  toastForDeniedPermission:
    'Для доступа к ближашим медцентрам и расположению пользователя необходимо разрешение',
  blockedAlert: {
    title: 'Выдача разрешения заблокирована',
    message: 'Для выдачи разрешения необходимо перейти в настройки',
  },
};

export const permissionsAlertsConfigs = new Map<
  RequestedPermission,
  PermissionRequestConfig
>();

permissionsAlertsConfigs.set(CameraPermission, CameraPermissionConfig);
permissionsAlertsConfigs.set(GalleryPermission, GalleryPermissionConfig);
permissionsAlertsConfigs.set(LocationPermission, LocationPermissionConfig);
