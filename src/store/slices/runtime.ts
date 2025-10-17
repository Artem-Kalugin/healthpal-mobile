import Keychain from 'react-native-keychain';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import Debug from '#utils/debug';

type TokenDecoded = {
  plain: string;
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
    setToken(state, action: PayloadAction<string | undefined>) {
      if (!action.payload) {
        Keychain.resetGenericPassword();

        state.token = undefined;
        return;
      }

      Keychain.setGenericPassword(action.payload, 'todo');

      const decoded = jwtDecode<{
        id: string;
        registrationComplete: string;
      }>(action.payload);

      const { id, registrationComplete } = decoded;

      Debug.log('Set new token', decoded);

      state.token = {
        plain: action.payload,
        userId: id,
        registrationComplete,
      };
    },
    reset: () => initialState,
  },
});

export default runtimeSlice.reducer;
export const RuntimeActions = runtimeSlice.actions;
