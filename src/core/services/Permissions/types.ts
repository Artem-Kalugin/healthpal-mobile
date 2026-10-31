import { Permission, PermissionStatus } from 'react-native-permissions';

import type { TranslationKey } from '#i18n/types';

export interface PermissionRequestConfig {
  toastForUnavailablePermission?: TranslationKey;
  toastForDeniedPermission?: TranslationKey;
  blockedAlert: {
    title?: TranslationKey;
    message?: TranslationKey;
  };
}

export type RequestedPermission = Permission[];

export type CheckPermissionResult = {
  allowed: boolean;
  originalStatus: PermissionStatus;
};

export type RequestPermissionResult = {
  allowed: boolean;
  originalStatus: PermissionStatus;
  requestStatus: PermissionStatus;
};
