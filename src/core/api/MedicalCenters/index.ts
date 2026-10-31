import { RtkAppApi } from '#api';
import { API_PAGINATION_PAGE_SIZE, PaginationConfig } from '#api/config';
import { withRequestMeta } from '#api/withRequestMeta';

import { RequestsMedicalCenters as Requests } from './types';

export const MedicalCentersAPI = RtkAppApi.injectEndpoints({
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
    addFavoriteMedicalCenter: build.mutation<
      Requests['addFavorite']['response'],
      Requests['addFavorite']['args']
    >({
      query: args => ({
        url: '/medical-centers/{id}/favorite',
        method: 'post',
        ...args,
      }),
    }),
    removeFavoriteMedicalCenter: build.mutation<
      Requests['removeFavorite']['response'],
      Requests['removeFavorite']['args']
    >({
      query: args => ({
        url: '/medical-centers/{id}/favorite',
        method: 'delete',
        ...args,
      }),
    }),
  }),
});

export const {
  useMedicalCentersQuery,
  useFavoriteMedicalCentersInfiniteQuery,
  useAddFavoriteMedicalCenterMutation,
  useRemoveFavoriteMedicalCenterMutation,
  useLazyMedicalCentersQuery,
} = withRequestMeta(MedicalCentersAPI);
