import { useState } from 'react';

import { DoctorAPI } from '#api/Doctor';
import { MedicalCentersAPI } from '#api/MedicalCenters';
import { OnboardingAPI } from '#api/Onboarding';
import { UserAPI } from '#api/User';
import { useRequestMeta } from '#api/withRequestMeta';

import { LocationService } from '#services/Location';

import { delay } from '#utils';

import { store } from '#store';

const prefetchConfig = {
  ifOlderThan: 600,
};

export const useAppData = () => {
  const [isPrefetching, setIsPrefetching] = useState(false);
  const meta = useRequestMeta();

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

    const shouldShowOnboarding = storeState.app.shouldShowOnboarding;
    const requestToPrefetch = [
      shouldShowOnboarding && prefetchOnboarding({ meta }),
      ...(storeState.runtime.token &&
      storeState.runtime.token.registrationComplete
        ? [prefetchDoctorCategories({ meta }), prefetchCurrentUser({ meta }), ,]
        : []),
    ];

    if (
      storeState.runtime.token &&
      storeState.runtime.token.registrationComplete
    ) {
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
              meta,
            }),
          );
        }
      } catch {}
    }

    const prefetchPromise = Promise.all(requestToPrefetch);

    //just for demo to let you see onboarding/splash screen animation
    shouldShowOnboarding && (await delay(3000));
    const prefetchOrTimeoutPromise = await prefetchPromise;

    setIsPrefetching(false);

    return prefetchOrTimeoutPromise;
  };

  return { prefetchApp, isPrefetching };
};
