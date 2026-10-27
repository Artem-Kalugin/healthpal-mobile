import { combineReducers } from '@reduxjs/toolkit';

import { RtkAppApi } from '#api';

import { appReducer } from './app';
import { favoritesAddedReducer } from './favoritesAdded';
import { favoritesRemovedReducer } from './favoritesRemoved';
import { runtimeReducer } from './runtime';

export const rootReducer = combineReducers({
  app: appReducer,
  runtime: runtimeReducer,
  favoritesAdded: favoritesAddedReducer,
  favoritesRemoved: favoritesRemovedReducer,
  [RtkAppApi.reducerPath]: RtkAppApi.reducer,
});
