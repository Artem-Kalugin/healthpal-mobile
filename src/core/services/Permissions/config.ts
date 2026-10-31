import { IS_IOS } from '#config';

import { PermissionRequestConfig, RequestedPermission } from './types';

export const CameraPermission: RequestedPermission = IS_IOS
  ? ['ios.permission.CAMERA']
  : ['android.permission.CAMERA'];
export const CameraPermissionConfig: PermissionRequestConfig = {
  toastForUnavailablePermission: 'permissions.unavailable',
  toastForDeniedPermission: 'permissions.camera.denied',
  blockedAlert: {
    title: 'permissions.blockedTitle',
    message: 'permissions.blockedMessage',
  },
};

export const GalleryPermission: RequestedPermission = IS_IOS
  ? ['ios.permission.PHOTO_LIBRARY']
  : [];
export const GalleryPermissionConfig: PermissionRequestConfig = {
  toastForUnavailablePermission: 'permissions.unavailable',
  toastForDeniedPermission: 'permissions.gallery.denied',
  blockedAlert: {
    title: 'permissions.blockedTitle',
    message: 'permissions.blockedMessage',
  },
};

export const LocationPermission: RequestedPermission = IS_IOS
  ? ['ios.permission.LOCATION_WHEN_IN_USE']
  : ['android.permission.ACCESS_COARSE_LOCATION'];
export const LocationPermissionConfig: PermissionRequestConfig = {
  toastForUnavailablePermission: 'permissions.location.unavailable',
  toastForDeniedPermission: 'permissions.location.denied',
  blockedAlert: {
    title: 'permissions.blockedTitle',
    message: 'permissions.blockedMessage',
  },
};

export const permissionsAlertsConfigs = new Map<
  RequestedPermission,
  PermissionRequestConfig
>([
  [CameraPermission, CameraPermissionConfig],
  [GalleryPermission, GalleryPermissionConfig],
  [LocationPermission, LocationPermissionConfig],
]);
