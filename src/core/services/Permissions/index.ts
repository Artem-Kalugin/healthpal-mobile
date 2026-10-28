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

import { Logger } from '#services/Logger';

import { permissionsAlertsConfigs } from './config';
import {
  CheckPermissionResult,
  PermissionRequestConfig,
  RequestedPermission,
  RequestPermissionResult,
} from './types';

const grantedLikeStatuses: PermissionStatus[] = [
  RESULTS.GRANTED,
  RESULTS.LIMITED,
];

export {
  CameraPermission,
  GalleryPermission,
  LocationPermission,
} from './config';

export class PermissionManager {
  private static async showBlockedAlert(
    config: PermissionRequestConfig,
  ): Promise<void> {
    const alert = config.blockedAlert;

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

  private static resolveConfig(
    permission: RequestedPermission,
    config?: PermissionRequestConfig,
  ): PermissionRequestConfig | null {
    const resolved = config ?? permissionsAlertsConfigs.get(permission);
    if (!resolved) {
      Logger.error('No permission alert config specified');
      return null;
    }
    return resolved;
  }

  private static async _check(
    permission: Permission,
    config: PermissionRequestConfig,
  ): Promise<CheckPermissionResult> {
    Logger.custom('permission', '---CHECK---PERMISSION---', permission);
    const status = await check(permission);

    Logger.custom('permission', 'status initial', status);
    if (status === RESULTS.UNAVAILABLE) {
      config.toastForUnavailablePermission &&
        toast(config.toastForUnavailablePermission);
      return { allowed: false, originalStatus: status };
    }

    if (grantedLikeStatuses.includes(status)) {
      return { allowed: true, originalStatus: status };
    }

    return { allowed: false, originalStatus: status };
  }

  private static async _request(
    permission: Permission,
    config: PermissionRequestConfig,
  ): Promise<RequestPermissionResult> {
    const checkResult = await this._check(permission, config);
    const { originalStatus } = checkResult;

    if (checkResult.allowed || originalStatus === RESULTS.UNAVAILABLE) {
      return { ...checkResult, requestStatus: originalStatus };
    }

    if (originalStatus === RESULTS.BLOCKED && Platform.OS === 'ios') {
      await this.showBlockedAlert(config);
      return { allowed: false, originalStatus, requestStatus: originalStatus };
    }

    const result = await request(permission);

    Logger.custom('permission', 'status after request', result);

    if (grantedLikeStatuses.includes(result)) {
      return { allowed: true, originalStatus, requestStatus: result };
    }

    if (result === RESULTS.BLOCKED && Platform.OS === 'android') {
      await this.showBlockedAlert(config);
    }

    if (result === RESULTS.DENIED) {
      config.toastForDeniedPermission && toast(config.toastForDeniedPermission);
    }

    return { allowed: false, originalStatus, requestStatus: result };
  }

  static async check(
    permission: RequestedPermission,
    config?: PermissionRequestConfig,
  ): Promise<CheckPermissionResult> {
    if (permission.length === 0) {
      return { allowed: true, originalStatus: RESULTS.GRANTED };
    }

    if (permission.length === 1) {
      const alertConfig = this.resolveConfig(permission, config);
      if (!alertConfig) {
        return { allowed: false, originalStatus: RESULTS.DENIED };
      }

      return this._check(permission[0], alertConfig);
    }

    Logger.error('add multi permission check feature :)');
    return { allowed: false, originalStatus: RESULTS.DENIED };
  }

  static async request(
    permission: RequestedPermission,
    config?: PermissionRequestConfig,
  ): Promise<RequestPermissionResult> {
    if (permission.length === 0) {
      return {
        allowed: true,
        originalStatus: RESULTS.GRANTED,
        requestStatus: RESULTS.GRANTED,
      };
    }

    if (permission.length === 1) {
      const alertConfig = this.resolveConfig(permission, config);
      if (!alertConfig) {
        return {
          allowed: false,
          originalStatus: RESULTS.DENIED,
          requestStatus: RESULTS.DENIED,
        };
      }

      return this._request(permission[0], alertConfig);
    }

    Logger.error('add multi permission request feature :)');
    return {
      allowed: false,
      originalStatus: RESULTS.DENIED,
      requestStatus: RESULTS.DENIED,
    };
  }
}
