import { useLazyOnboardingQuery } from '#api/Onboarding';

import { delay } from '#utils';

export const usePrefetchApp = () => {
  const [getOnboarding] = useLazyOnboardingQuery();

  const prefetchApp = async () => {
    const prefetchPromise = Promise.all([getOnboarding(null)]);

    const prefetchOrTimeoutPromise = Promise.race([
      prefetchPromise,
      delay(5000),
    ]);

    return prefetchOrTimeoutPromise;
  };

  return prefetchApp;
};
