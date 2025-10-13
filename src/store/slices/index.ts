import { combineReducers } from '@reduxjs/toolkit';

import { Query } from '../../core/api/index';
import app from './app';
import runtime from './runtime';

export default combineReducers({
  app,
  runtime,
  [Query.reducerPath]: Query.reducer,
});
