import { Query } from '#api';
import { PaginationConfig } from '#api/config';

import { RequestsDoctor as Requests } from './types';

const DoctorAPI = Query.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    doctorCategories: build.query<
      Requests['doctorCategories']['response'],
      Requests['doctorCategories']['args']
    >({
      query: () => ({
        url: '/doctor-categories',
        method: 'get',
      }),
    }),
    searchDoctors: build.infiniteQuery<
      Requests['search']['response'],
      Requests['search']['args'],
      number
    >({
      infiniteQueryOptions: PaginationConfig,
      query: ({ pageParam, queryArg }) => ({
        url: `/doctors/search?page=${pageParam}&size=${10}`,
        method: 'get',
        ...queryArg,
      }),
    }),
    favoriteDoctors: build.infiniteQuery<
      Requests['favorites']['response'],
      Requests['favorites']['args'],
      number
    >({
      infiniteQueryOptions: PaginationConfig,
      query: ({ pageParam, queryArg }) => ({
        url: `/doctors/favorites?page=${pageParam}&size=${10}`,
        method: 'get',
        ...queryArg,
      }),
    }),
    getDoctor: build.query<
      Requests['doctor']['response'],
      Requests['doctor']['args']
    >({
      query: args => ({
        url: '/doctors/{id}',
        method: 'get',
        ...args,
      }),
    }),
  }),
});

export const {
  useDoctorCategoriesQuery,
  useLazyDoctorCategoriesQuery,
  useSearchDoctorsInfiniteQuery,
  useFavoriteDoctorsInfiniteQuery,
  useGetDoctorQuery,
} = DoctorAPI;
