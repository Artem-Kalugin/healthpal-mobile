import { useState } from 'react';

import DoctorAPI from '#api/Doctor';
import MedicalCentersAPI from '#api/MedicalCenters';
import OnboardingAPI from '#api/Onboarding';
import UserAPI from '#api/User';

import { LocationService } from '#services/Location';

import { delay } from '#utils';

import { store } from '#store';

const prefetchConfig = {
  ifOlderThan: 600,
};

export const usePrefetchApp = () => {
  const [isPrefetching, setIsPrefetching] = useState(false);

  const prefetchDoctorCategories = DoctorAPI.usePrefetch(
    'doctorCategories',
    prefetchConfig,
  );
  const prefetchCurrentUser = UserAPI.usePrefetch('getCurrent', prefetchConfig);
  const prefetchMedicalCenters = MedicalCentersAPI.usePrefetch(
    'medicalCenters',
    prefetchConfig,
  );
  const prefetchOnboarding = OnboardingAPI.usePrefetch(
    'onboarding',
    prefetchConfig,
  );

  const prefetchApp = async () => {
    setIsPrefetching(true);
    const storeState = store.getState();

    const requestToPrefetch = [
      storeState.app.shouldShowOnboarding && prefetchOnboarding(null),
      ...(storeState.runtime.token
        ? [prefetchDoctorCategories(null), prefetchCurrentUser(null), ,]
        : []),
    ];

    if (storeState.runtime.token) {
      try {
        const location = await LocationService.getCurrentLocation();

        if (location) {
          requestToPrefetch.push(
            prefetchMedicalCenters({
              params: {
                lat: `${location.coords.latitude}`,
                lon: `${location.coords.longitude}`,
                shouldTake5Only: true,
              },
            }),
          );
        }
      } catch {}
    }

    const prefetchPromise = Promise.all(requestToPrefetch);

    //just for demo to let you see onboarding/splash screen animation
    await delay(3000);
    const prefetchOrTimeoutPromise = await prefetchPromise;

    setIsPrefetching(false);

    return prefetchOrTimeoutPromise;
  };

  return { prefetchApp, isPrefetching };
};
