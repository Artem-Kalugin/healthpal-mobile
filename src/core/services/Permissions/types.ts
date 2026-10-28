import { Permission, PermissionStatus } from 'react-native-permissions';

export interface PermissionRequestConfig {
  toastForUnavailablePermission?: string;
  toastForDeniedPermission?: string;
  blockedAlert: {
    title?: string;
    message?: string;
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
