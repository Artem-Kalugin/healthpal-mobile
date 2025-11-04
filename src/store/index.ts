// uncomment to clear store
// clearPersistor();

import {
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from 'react-redux';

import { createMMKV } from 'react-native-mmkv';

import { Action, configureStore, Middleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import { RtkAppApi } from '#api';

import { TokenService } from '#services/Token';

import reducers from './slices';

export const storage = createMMKV();
const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  //@ts-expect-error
  getItem: key => {
    const value = storage.getString(key) || null;
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.remove(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'redux-persisted',
  storage: reduxStorage,
  blacklist: ['runtime'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const loggerMiddleware: Middleware = store => next => _action => {
  const action = _action as unknown as Action<any>;
  // if (
  //   !action.type.startsWith('api') &&
  //   !action.type.startsWith('persist/REHYDRATE')
  // ) {
  //   // eslint-disable-next-line no-console
  //   console.log('⚡️Action:', action.type);

  //   //@ts-expect-error
  //   if (action.payload !== undefined) {
  //     // eslint-disable-next-line no-console
  //     console.log(
  //       '📦Payload:',
  //       //@ts-expect-error
  //       action.payload,
  //     );
  //   }
  // }

  const result = next(action);

  return result;
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(RtkAppApi.middleware)
      .concat(loggerMiddleware),
});
TokenService.injectStore(store);
export const persistor = persistStore(store);

export const clearPersistor = async () => {
  persistor.pause();

  await persistor.flush();

  await persistor.purge();
};

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = _useDispatch.withTypes<AppDispatch>();
export const useSelector = _useSelector.withTypes<RootState>();
