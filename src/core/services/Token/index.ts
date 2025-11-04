import type { Store } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

import type { RootState } from '#store';
import { RuntimeActions } from '#store/slices/runtime';

import Logger from '../Logger';

enum TokenType {
  access = 'access',
  refresh = 'refresh',
}

type TokenPayload = {
  id: string;
  registrationComplete: boolean;
};

let storeInstance: Store<RootState> | null = null;

export class TokenService {
  static injectStore(store: Store<RootState>) {
    storeInstance = store;
  }

  private static getStore() {
    if (!storeInstance) {
      throw new Error('Store not initialized in TokenService');
    }
    return storeInstance;
  }

  static async get() {
    const tokensState = this.getStore().getState().runtime.token;

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

        this.getStore().dispatch(RuntimeActions.setToken(tokenDecoded));

        return this.getStore().getState().runtime.token;
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

      this.getStore().dispatch(RuntimeActions.setToken(tokenDecoded));

      return this.get();
    } catch (e) {
      Logger.error('[SECURE-STORE] error while saving token', e);
    }
  }

  static async clear() {
    try {
      await SecureStore.deleteItemAsync(TokenType.access);
      await SecureStore.deleteItemAsync(TokenType.refresh);

      this.getStore().dispatch(RuntimeActions.setToken(undefined));
    } catch (e) {
      Logger.error('[SECURE-STORE] error while deleting token', e);
    }
  }
}
