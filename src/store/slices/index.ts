import { combineReducers } from '@reduxjs/toolkit';

import { RtkAppApi } from '../../core/api/index';
import app from './app';
import favoritesAdded from './favoritesAdded';
import favoritesRemoved from './favoritesRemoved';
import runtime from './runtime';

export default combineReducers({
  app,
  runtime,
  favoritesAdded,
  favoritesRemoved,
  [RtkAppApi.reducerPath]: RtkAppApi.reducer,
});
