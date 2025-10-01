import {
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from 'react-redux';

import { MMKV } from 'react-native-mmkv';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import reducers from './slices';

const storage = new MMKV();

export const reduxStorage: Storage = {
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
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'redux-persisted',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);

// uncomment to clear store

// persistor.purge();

// store.dispatch(Query.util.resetApiState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = _useDispatch.withTypes<AppDispatch>();
export const useSelector = _useSelector.withTypes<RootState>();
