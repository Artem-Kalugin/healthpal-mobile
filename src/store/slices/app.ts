import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSignedIn(state, action: PayloadAction<boolean>) {
      state.isSignedIn = action.payload;
    },
  },
});

export default appSlice.reducer;
export const AppActions = appSlice.actions;
