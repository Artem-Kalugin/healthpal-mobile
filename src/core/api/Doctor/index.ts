import { Query } from '#api';

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
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          if (lastPage.page * lastPage.size > lastPage.count) {
            return undefined;
          }
          return lastPageParam + 1;
        },
      },
      query: ({ pageParam, queryArg }) => ({
        url: `/doctors/search?page=${pageParam}&size=${20}`,
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
  useGetDoctorQuery,
} = DoctorAPI;
