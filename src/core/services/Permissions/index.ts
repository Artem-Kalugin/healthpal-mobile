import { Alert, Platform } from 'react-native';

import {
  check,
  openSettings,
  Permission,
  PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions';

import { toast } from 'react-hot-toast/headless';

import Debug from '#utils/debug';

import { permissionsAlertsConfigs } from './config';
import { PermissionRequestConfig, RequestedPermission } from './types';

const grantedLikeStatuses: PermissionStatus[] = [
  RESULTS.GRANTED,
  RESULTS.LIMITED,
];

type SilentPermissionResult = {
  allowed: boolean;
  originalStatus: PermissionStatus;
};

type RequestPermissionResult = {
  allowed: boolean;
  originalStatus: PermissionStatus;
  requestStatus: PermissionStatus;
};
export class PermissionManager {
  private static async showBlockedAlert(
    config: PermissionRequestConfig,
  ): Promise<void> {
    const alert = config.blockedAlert;
    if (!alert) return;

    Alert.alert(
      alert.title ?? 'Разрешение',
      alert.message ?? 'Для выдачи разрешения необходимо перейти в настройки',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Открыть настройки',
          onPress: () => openSettings().catch(() => {}),
        },
      ],
      { cancelable: true },
    );
  }

  static async _request(
    permission: Permission,
    config: PermissionRequestConfig,
    silent: boolean,
  ): Promise<{
    allowed: boolean;
    originalStatus: PermissionStatus;
    requestStatus?: PermissionStatus;
  }> {
    Debug.custom('permission', '---CHECK---PERMISSION---', permission);
    const status = await check(permission);

    Debug.custom('permission', 'status initial', status);
    if (status === RESULTS.UNAVAILABLE) {
      config.toastForUnavailablePermission &&
        toast(config.toastForUnavailablePermission);
      return { allowed: false, originalStatus: status };
    }

    if (grantedLikeStatuses.includes(status)) {
      return { allowed: true, originalStatus: status };
    }

    if (silent) {
      Debug.custom('permission', 'silent mode, returning', status);
      return { allowed: false, originalStatus: status };
    }

    if (status === RESULTS.BLOCKED && Platform.OS === 'ios') {
      config.blockedAlert && (await this.showBlockedAlert(config));
      return { allowed: false, originalStatus: status };
    }

    const result = await request(permission);

    Debug.custom('permission', 'status after request', result);

    if (grantedLikeStatuses.includes(result)) {
      return { allowed: true, originalStatus: status, requestStatus: result };
    }

    if (result === RESULTS.BLOCKED && Platform.OS === 'android') {
      config.blockedAlert && (await this.showBlockedAlert(config));
    }

    if (result === RESULTS.DENIED) {
      config.toastForDeniedPermission && toast(config.toastForDeniedPermission);
    }

    return { allowed: false, originalStatus: status, requestStatus: result };
  }

  static async request(
    permission: RequestedPermission,
    silent: true,
    config?: PermissionRequestConfig,
  ): Promise<SilentPermissionResult>;

  static async request(
    permission: RequestedPermission,
    silent?: false,
    config?: PermissionRequestConfig,
  ): Promise<RequestPermissionResult>;

  static async request(
    permission: RequestedPermission,
    silent: boolean = false,
    config?: PermissionRequestConfig,
  ) {
    if (permission.length === 0) {
      return { allowed: true, originalStatus: RESULTS.GRANTED };
    }

    if (permission.length === 1) {
      const alertConfig = config ?? permissionsAlertsConfigs.get(permission);

      if (!alertConfig) {
        Debug.error('No permission alert config specified');
        return { allowed: false, originalStatus: RESULTS.DENIED };
      }

      return this._request(permission[0], alertConfig, silent);
    }

    Debug.error('add multi permission request feature :)');
    return { allowed: false, originalStatus: RESULTS.DENIED };
  }
}
