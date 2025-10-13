import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  shouldShowOnboarding: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setShouldShowOnboarding(state, action: PayloadAction<boolean>) {
      state.shouldShowOnboarding = action.payload;
    },
  },
});

export default appSlice.reducer;
export const AppActions = appSlice.actions;
