import { RtkAppApi } from '#api';
import { API_PAGINATION_PAGE_SIZE, PaginationConfig } from '#api/config';

import { RequestsMedicalCenters as Requests } from './types';

const MedicalCentersAPI = RtkAppApi.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    medicalCenters: build.query<
      Requests['medicalCenters']['response'],
      Requests['medicalCenters']['args']
    >({
      query: arg => {
        return {
          url: '/medical-centers',
          method: 'get',
          ...arg,
        };
      },
    }),
    favoriteMedicalCenters: build.infiniteQuery<
      Requests['favorites']['response'],
      Requests['favorites']['args'],
      number
    >({
      infiniteQueryOptions: PaginationConfig,
      query: ({ pageParam, queryArg }) => ({
        url: `/medical-centers/favorites?page=${pageParam}&size=${API_PAGINATION_PAGE_SIZE}`,
        method: 'get',
        ...queryArg,
      }),
    }),
  }),
});

export const {
  useMedicalCentersQuery,
  useFavoriteMedicalCentersInfiniteQuery,
  useLazyMedicalCentersQuery,
} = MedicalCentersAPI;

export default MedicalCentersAPI;
