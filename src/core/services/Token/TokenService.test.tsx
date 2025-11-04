import * as SecureStore from 'expo-secure-store';

import { store } from '#store';
import { RuntimeActions, TokenDecoded } from '#store/slices/runtime';

import {
  mockAccessToken,
  mockRefreshToken,
} from '../../../../__tests__/config/fixtures/tokens';
import { TokenService } from './index';

jest.mock('expo-secure-store');
jest.mock('../Logger');

const decodedPayload = {
  userId: 'b28a1578-60f0-4dda-8071-a02fd7999861',
  registrationComplete: false,
};

const decodedToken: TokenDecoded = {
  accessToken: mockAccessToken,
  refreshToken: mockRefreshToken,
  userId: decodedPayload.userId,
  registrationComplete: decodedPayload.registrationComplete,
};

describe('TokenService', () => {
  beforeEach(() => {
    store.dispatch(RuntimeActions.reset());
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('возвращает токены из store, если они уже есть', async () => {
      store.dispatch(RuntimeActions.setToken(decodedToken));

      const token = await TokenService.get();

      expect(token).toMatchObject(decodedToken);
    });

    it('вызывает load, если токены отсутствуют', async () => {
      const loadSpy = jest
        .spyOn(TokenService as any, 'load')
        .mockResolvedValue(decodedToken);

      const token = await TokenService.get();

      expect(loadSpy).toHaveBeenCalled();
      expect(token).toMatchObject(decodedToken);

      loadSpy.mockRestore();
    });
  });

  describe('load', () => {
    it('декодирует токены и сохраняет в store, если они есть в SecureStore', async () => {
      (SecureStore.getItemAsync as jest.Mock)
        .mockResolvedValueOnce(mockAccessToken)
        .mockResolvedValueOnce(mockRefreshToken);

      const token = await TokenService.load();

      expect(token).toMatchObject(decodedToken);
      expect(store.getState().runtime.token).toMatchObject(decodedToken);
    });

    it('возвращает undefined, если нет токенов в SecureStore', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

      const token = await TokenService.load();

      expect(token).toBeUndefined();
    });
  });

  describe('save', () => {
    it('сохраняет токены в SecureStore и store', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);

      const token = await TokenService.save({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      });

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        'access',
        mockAccessToken,
      );
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        'refresh',
        mockRefreshToken,
      );
      expect(token).toMatchObject(decodedToken);
      expect(store.getState().runtime.token).toMatchObject(decodedToken);
    });
  });

  describe('clear', () => {
    it('удаляет токены из SecureStore и store', async () => {
      (SecureStore.deleteItemAsync as jest.Mock).mockResolvedValue(undefined);

      await TokenService.clear();

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('access');
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('refresh');
      expect(store.getState().runtime.token).toBeUndefined();
    });
  });
});
