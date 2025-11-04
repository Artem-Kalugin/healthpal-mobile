import { Alert, Platform } from 'react-native';

import { check, request, RESULTS } from 'react-native-permissions';

import { toast } from 'react-hot-toast/headless';

import { PermissionManager } from '.';
import { permissionsAlertsConfigs } from './config';
import { PermissionRequestConfig } from './types';

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
  Platform: {
    OS: 'ios',
  },
}));

jest.mock('#services/Logger', () => ({
  custom: jest.fn(),
  error: jest.fn(),
}));

jest.mock('react-hot-toast/headless', () => ({
  toast: jest.fn(),
}));

jest.mock('./config', () => ({
  permissionsAlertsConfigs: new Map(),
}));

describe('PermissionManager', () => {
  const mockPermission = 'ios.permission.CAMERA';
  const mockConfig: PermissionRequestConfig = {
    toastForUnavailablePermission: 'Unavailable message',
    toastForDeniedPermission: 'Denied message',
    blockedAlert: {
      title: 'Blocked title',
      message: 'Blocked message',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (permissionsAlertsConfigs as Map<any, any>).clear();
    Platform.OS = 'ios';
  });

  describe('граничные случаи', () => {
    it('должен возвращать allowed: true для пустого массива разрешений', async () => {
      const result = await PermissionManager.request([]);

      expect(result).toEqual({
        allowed: true,
        originalStatus: RESULTS.GRANTED,
      });
    });

    it('должен возвращать allowed: false если нет конфига', async () => {
      const result = await PermissionManager.request([mockPermission]);

      expect(result.allowed).toBe(false);
    });
  });

  describe('статусы разрешений', () => {
    it('BLOCKED - не должен запрашивать разрешение', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.BLOCKED);

      const result = await PermissionManager.request(
        [mockPermission],
        false,
        mockConfig,
      );

      expect(result.allowed).toBe(false);
      expect(result.originalStatus).toBe(RESULTS.BLOCKED);
      expect(request).not.toHaveBeenCalled();
    });

    it('DENIED - должен запросить разрешение', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.DENIED);

      const result = await PermissionManager.request(
        [mockPermission],
        false,
        mockConfig,
      );

      expect(result.allowed).toBe(false);
      expect(result.originalStatus).toBe(RESULTS.DENIED);
      expect(request).toHaveBeenCalledTimes(1);
    });

    it('UNAVAILABLE - должен вернуть allowed: false', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.UNAVAILABLE);

      const result = await PermissionManager.request(
        [mockPermission],
        false,
        mockConfig,
      );

      expect(result.allowed).toBe(false);
      expect(result.originalStatus).toBe(RESULTS.UNAVAILABLE);
      expect(request).not.toHaveBeenCalled();
    });

    it('GRANTED - должен вернуть allowed: true', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.GRANTED);

      const result = await PermissionManager.request(
        [mockPermission],
        false,
        mockConfig,
      );

      expect(result.allowed).toBe(true);
      expect(result.originalStatus).toBe(RESULTS.GRANTED);
      expect(request).not.toHaveBeenCalled();
    });

    it('LIMITED - должен вернуть allowed: true', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.LIMITED);

      const result = await PermissionManager.request(
        [mockPermission],
        false,
        mockConfig,
      );

      expect(result.allowed).toBe(true);
      expect(result.originalStatus).toBe(RESULTS.LIMITED);
      expect(request).not.toHaveBeenCalled();
    });
  });

  describe('запрос разрешения', () => {
    it('должен запросить и вернуть allowed: true если пользователь разрешил', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.DENIED);
      (request as jest.Mock).mockResolvedValue(RESULTS.GRANTED);

      const result = await PermissionManager.request(
        [mockPermission],
        false,
        mockConfig,
      );

      expect(request).toHaveBeenCalledWith(mockPermission);
      expect(result.allowed).toBe(true);
      expect(result.originalStatus).toBe(RESULTS.DENIED);
      expect(result.requestStatus).toBe(RESULTS.GRANTED);
    });

    it('должен вернуть allowed: false если пользователь отклонил', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.DENIED);
      (request as jest.Mock).mockResolvedValue(RESULTS.DENIED);

      const result = await PermissionManager.request(
        [mockPermission],
        false,
        mockConfig,
      );

      expect(result.allowed).toBe(false);
      expect(result.requestStatus).toBe(RESULTS.DENIED);
    });
  });

  describe('silent режим', () => {
    it('DENIED - не должен запрашивать разрешение', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.DENIED);

      const result = await PermissionManager.request(
        [mockPermission],
        true, // silent
        mockConfig,
      );

      expect(result.allowed).toBe(false);
      expect(request).not.toHaveBeenCalled();
    });

    it('GRANTED - должен вернуть allowed: true', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.GRANTED);

      const result = await PermissionManager.request(
        [mockPermission],
        true,
        mockConfig,
      );

      expect(result.allowed).toBe(true);
    });
  });

  describe('платформо-специфичное поведение', () => {
    describe('iOS', () => {
      beforeEach(() => {
        Platform.OS = 'ios';
      });

      it('BLOCKED - должен показать alert и не запрашивать', async () => {
        (check as jest.Mock).mockResolvedValue(RESULTS.BLOCKED);
        const alertSpy = jest.spyOn(Alert, 'alert');

        const result = await PermissionManager.request(
          [mockPermission],
          false,
          mockConfig,
        );

        expect(result.allowed).toBe(false);
        expect(alertSpy).toHaveBeenCalled();
        expect(request).not.toHaveBeenCalled();
      });

      it('BLOCKED - не должен показывать alert если blockedAlert не задан', async () => {
        (check as jest.Mock).mockResolvedValue(RESULTS.BLOCKED);
        const configWithoutAlert = { ...mockConfig, blockedAlert: undefined };
        const alertSpy = jest.spyOn(Alert, 'alert');

        await PermissionManager.request(
          [mockPermission],
          false,
          configWithoutAlert as any,
        );

        expect(alertSpy).not.toHaveBeenCalled();
      });
    });

    describe('Android', () => {
      beforeEach(() => {
        Platform.OS = 'android';
      });

      it('BLOCKED - должен запросить разрешение, затем показать alert', async () => {
        (check as jest.Mock).mockResolvedValue(RESULTS.DENIED);
        (request as jest.Mock).mockResolvedValue(RESULTS.BLOCKED);
        const alertSpy = jest.spyOn(Alert, 'alert');

        const result = await PermissionManager.request(
          [mockPermission],
          false,
          mockConfig,
        );

        expect(request).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalled();
        expect(result.allowed).toBe(false);
      });
    });
  });

  describe('пользовательские уведомления', () => {
    it('должен показать toast для UNAVAILABLE если задан', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.UNAVAILABLE);

      await PermissionManager.request([mockPermission], false, mockConfig);

      expect(toast).toHaveBeenCalledWith(
        mockConfig.toastForUnavailablePermission,
      );
    });

    it('должен показать toast для DENIED после запроса если задан', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.DENIED);
      (request as jest.Mock).mockResolvedValue(RESULTS.DENIED);

      await PermissionManager.request([mockPermission], false, mockConfig);

      expect(toast).toHaveBeenCalledWith(mockConfig.toastForDeniedPermission);
    });

    it('не должен показывать toast если не заданы', async () => {
      (check as jest.Mock).mockResolvedValue(RESULTS.UNAVAILABLE);
      const minimalConfig: PermissionRequestConfig = {
        blockedAlert: { title: 'Test', message: 'Test' },
      };

      await PermissionManager.request([mockPermission], false, minimalConfig);

      expect(toast).not.toHaveBeenCalled();
    });
  });
});
