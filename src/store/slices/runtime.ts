import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TokenDecoded = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  registrationComplete: boolean;
};
const initialState = {
  token: undefined as TokenDecoded | undefined,
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
    reset: () => initialState,
  },
});

export default runtimeSlice.reducer;
export const RuntimeActions = runtimeSlice.actions;
