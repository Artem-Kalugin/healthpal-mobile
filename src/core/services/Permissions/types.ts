import { Permission } from 'react-native-permissions';

export interface PermissionRequestConfig {
  toastForUnavailablePermission?: string;
  toastForDeniedPermission?: string;
  blockedAlert: {
    title?: string;
    message?: string;
  };
}

export type RequestedPermission = Permission[];
