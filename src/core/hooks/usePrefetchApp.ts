import { useState } from 'react';

import DoctorAPI from '#api/Doctor';
import MedicalCentersAPI from '#api/MedicalCenters';
import OnboardingAPI from '#api/Onboarding';
import UserAPI from '#api/User';

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
        ? [
            prefetchDoctorCategories(null),
            prefetchCurrentUser(null),
            prefetchMedicalCenters({
              params: {
                lat: '55.7558',
                lon: '37.6173',
                shouldTake5Only: true,
              },
            }),
          ]
        : []),
    ];
    const prefetchPromise = Promise.all(requestToPrefetch);

    const prefetchOrTimeoutPromise = await Promise.race([
      prefetchPromise,
      delay(5000),
    ]);
    setIsPrefetching(false);

    return prefetchOrTimeoutPromise;
  };

  return { prefetchApp, isPrefetching };
};
