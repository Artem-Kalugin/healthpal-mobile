import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  shouldShowOnboarding: true,
  isUserBlockedLocationPermission: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setShouldShowOnboarding(state, action: PayloadAction<boolean>) {
      state.shouldShowOnboarding = action.payload;
    },
    setIsUserBlockedLocationPermission(state, action: PayloadAction<boolean>) {
      state.isUserBlockedLocationPermission = action.payload;
    },
    reset: () => initialState,
  },
});

export const appReducer = appSlice.reducer;
export const AppActions = appSlice.actions;
