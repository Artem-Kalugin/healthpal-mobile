import { combineReducers } from '@reduxjs/toolkit';

import { Query } from '../../core/api/index';
import app from './app';
import favoritesAdded from './favoritesAdded';
import favoritesRemoved from './favoritesRemoved';
import runtime from './runtime';

export default combineReducers({
  app,
  runtime,
  favoritesAdded,
  favoritesRemoved,
  [Query.reducerPath]: Query.reducer,
});
