import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Language } from '#i18n/types';

export type TokenDecoded = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  registrationComplete: boolean;
};
const initialState = {
  token: undefined as TokenDecoded | undefined,
  // language the map was started with: the native map locale can't change until restart
  mapLanguage: undefined as Language | undefined,
};

const runtimeSlice = createSlice({
  name: 'runtime',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<TokenDecoded | undefined>) {
      if (!action.payload) {
        state.token = undefined;
        return;
      }
      state.token = action.payload;
    },
    setMapLanguage(state, action: PayloadAction<Language | undefined>) {
      state.mapLanguage = action.payload;
    },
    // the native map keeps its locale until restart, so the reset must not forget it
    reset: state => ({ ...initialState, mapLanguage: state.mapLanguage }),
  },
});

export const runtimeReducer = runtimeSlice.reducer;
export const RuntimeActions = runtimeSlice.actions;
