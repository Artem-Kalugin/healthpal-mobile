import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import Logger from '#services/Logger';

import { BELoginResponseDto } from '#generated/__entities';

export type TokenDecoded = {
  plain: string;
  refresh: string;
  userId: string;
  registrationComplete: string;
};
const initialState = {
  token: undefined as TokenDecoded | undefined,
};

const runtimeSlice = createSlice({
  name: 'runtime',
  initialState,
  reducers: {
    setToken(
      state,
      action: PayloadAction<
        Pick<BELoginResponseDto, 'accessToken' | 'refreshToken'> | undefined
      >,
    ) {
      if (!action.payload) {
        state.token = undefined;
        return;
      }

      const decoded = jwtDecode<{
        id: string;
        registrationComplete: string;
      }>(action.payload.accessToken);

      const { id, registrationComplete } = decoded;

      Logger.log('Set new token', decoded);

      state.token = {
        plain: action.payload.accessToken,
        refresh: action.payload.refreshToken,
        userId: id,
        registrationComplete,
      };
    },
    reset: () => initialState,
  },
});

export default runtimeSlice.reducer;
export const RuntimeActions = runtimeSlice.actions;
