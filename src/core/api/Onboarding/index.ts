import { RtkAppApi } from '#api';

import { RequestsOnboarding as Requests } from './types';

const OnboardingAPI = RtkAppApi.injectEndpoints({
  endpoints: build => ({
    onboarding: build.query<
      Requests['onboarding']['response'],
      Requests['onboarding']['args']
    >({
      query: () => ({
        url: '/onboarding/slides',
        method: 'get',
      }),
    }),
  }),
});

export const { useOnboardingQuery, useLazyOnboardingQuery } = OnboardingAPI;

export default OnboardingAPI;
