import { RtkAppApi } from '#api';
import { withRequestMeta } from '#api/withRequestMeta';

import { RequestsOnboarding as Requests } from './types';

export const OnboardingAPI = RtkAppApi.injectEndpoints({
  endpoints: build => ({
    onboarding: build.query<
      Requests['onboarding']['response'],
      Requests['onboarding']['args']
    >({
      query: args => ({
        url: '/onboarding/slides',
        method: 'get',
        ...args,
      }),
    }),
  }),
});

export const { useOnboardingQuery } = withRequestMeta(OnboardingAPI);
