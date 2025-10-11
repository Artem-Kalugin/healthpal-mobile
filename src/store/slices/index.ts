import { combineReducers } from '@reduxjs/toolkit';

import { Query } from '../../core/api/index';
import app from './app';

export default combineReducers({
  app,
  [Query.reducerPath]: Query.reducer,
});
