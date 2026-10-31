import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Language, Region } from '#i18n/types';

const initialState = {
  shouldShowOnboarding: true,
  isUserBlockedLocationPermission: false,
  // undefined follows the device language
  language: undefined as Language | undefined,
  region: undefined as Region | undefined,
  // timestamp (ms) when the OTP resend cooldown ends, survives app restarts
  otpTimerEndsAt: null as number | null,
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
    setLanguage(state, action: PayloadAction<Language | undefined>) {
      state.language = action.payload;
    },
    setRegion(state, action: PayloadAction<Region | undefined>) {
      state.region = action.payload;
    },
    setOtpTimerEndsAt(state, action: PayloadAction<number | null>) {
      state.otpTimerEndsAt = action.payload;
    },
    reset: () => initialState,
  },
});

export const appReducer = appSlice.reducer;
export const AppActions = appSlice.actions;
