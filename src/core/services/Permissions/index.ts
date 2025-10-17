import { Alert, Platform } from 'react-native';

import {
  check,
  openSettings,
  Permission,
  request,
  RESULTS,
} from 'react-native-permissions';

import { toast } from 'react-hot-toast/headless';

import Debug from '#utils/debug';

import { permissionsAlertsConfigs } from './config';
import { PermissionRequestConfig, RequestedPermission } from './types';

const grantedLikeStatuses = [RESULTS.GRANTED, RESULTS.LIMITED];

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
  ): Promise<boolean> {
    Debug.custom('permission', '---CHECK---PERMISSION---', permission);
    const status = await check(permission);

    Debug.custom('permission', 'status initial', status);
    if (status === RESULTS.UNAVAILABLE) {
      config.toastForUnavailablePermission &&
        toast(config.toastForUnavailablePermission);
      return false;
    }

    //@ts-expect-error
    if (grantedLikeStatuses.includes(status)) return true;

    if (status === RESULTS.BLOCKED && Platform.OS === 'ios') {
      await this.showBlockedAlert(config);
      return false;
    }

    const result = await request(permission);

    Debug.custom('permission', 'status after request', result);
    //@ts-expect-error
    if (grantedLikeStatuses.includes(result)) return true;

    if (result === RESULTS.BLOCKED && Platform.OS === 'android') {
      await this.showBlockedAlert(config);
      return false;
    }

    if (result === RESULTS.DENIED) {
      config.toastForDeniedPermission && toast(config.toastForDeniedPermission);
    }

    return false;
  }

  static request(
    permission: RequestedPermission,
    config?: PermissionRequestConfig,
  ) {
    if (permission.length === 0) {
      return true;
    }

    if (permission.length === 1) {
      const alertConfig = config ?? permissionsAlertsConfigs.get(permission);

      if (!alertConfig) {
        Debug.error('No permission alert config specified');
        return false;
      }

      return this._request(permission[0], alertConfig);
    }

    Debug.error('add multi permission request feature :)');
    return false;
  }
}
