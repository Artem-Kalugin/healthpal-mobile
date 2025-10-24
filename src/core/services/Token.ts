import * as SecureStore from 'expo-secure-store';

import { store } from '#store';
import { RuntimeActions } from '#store/slices/runtime';

import Logger from './Logger';

enum TokenType {
  access = 'access',
  refresh = 'refresh',
}

export class TokenService {
  static async get() {
    const tokensState = store.getState().runtime.token;

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
        store.dispatch(
          RuntimeActions.setToken({
            accessToken,
            refreshToken,
          }),
        );

        return store.getState().runtime.token;
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

      store.dispatch(RuntimeActions.setToken(tokenPayload));

      return this.get();
    } catch (e) {
      Logger.error('[SECURE-STORE] error while saving token', e);
    }
  }

  static async clear() {
    try {
      await SecureStore.deleteItemAsync(TokenType.access);
      await SecureStore.deleteItemAsync(TokenType.refresh);

      store.dispatch(RuntimeActions.setToken(undefined));
    } catch (e) {
      Logger.error('[SECURE-STORE] error while deleting token', e);
    }
  }
}
