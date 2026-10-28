import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

import { Logger } from '#services/Logger';

import { TokenPayload, TokenStorePort, TokenType } from './types';

let storeInstance: TokenStorePort | null = null;

export class TokenService {
  static injectStore(port: TokenStorePort) {
    storeInstance = port;
  }

  private static getStore() {
    if (!storeInstance) {
      throw new Error('Store not initialized in TokenService');
    }
    return storeInstance;
  }

  static async get() {
    const tokensState = this.getStore().getToken();

    if (!tokensState) {
      return this.load();
    }

    return tokensState;
  }

  static async load() {
    try {
      const accessToken = await SecureStore.getItemAsync(TokenType.access);
      const refreshToken = await SecureStore.getItemAsync(TokenType.refresh);

      if (accessToken && refreshToken) {
        const decoded = jwtDecode<TokenPayload>(accessToken);

        const tokenDecoded = {
          ...decoded,
          userId: decoded.id,
          accessToken,
          refreshToken,
        };

        this.getStore().setToken(tokenDecoded);

        return this.getStore().getToken();
      }

      return undefined;
    } catch (e) {
      Logger.error('[SECURE-STORE] error while loading token', e);
    }
  }

  static async save(tokenPayload: {
    accessToken: string;
    refreshToken: string;
  }) {
    try {
      await SecureStore.setItemAsync(
        TokenType.access,
        tokenPayload.accessToken,
      );
      await SecureStore.setItemAsync(
        TokenType.refresh,
        tokenPayload.refreshToken,
      );

      const decoded = jwtDecode<TokenPayload>(tokenPayload.accessToken);

      const tokenDecoded = {
        ...decoded,
        ...tokenPayload,
        userId: decoded.id,
      };

      this.getStore().setToken(tokenDecoded);

      return this.get();
    } catch (e) {
      Logger.error('[SECURE-STORE] error while saving token', e);
    }
  }

  static async clear() {
    try {
      await SecureStore.deleteItemAsync(TokenType.access);
      await SecureStore.deleteItemAsync(TokenType.refresh);

      this.getStore().setToken(undefined);
    } catch (e) {
      Logger.error('[SECURE-STORE] error while deleting token', e);
    }
  }
}
