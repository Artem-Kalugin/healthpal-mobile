import { Query } from '#api';

import { RequestsDoctorCategories as Requests } from './types';

const DoctorAPI = Query.injectEndpoints({
  endpoints: build => ({
    doctorCategories: build.query<
      Requests['doctorCategories']['response'],
      Requests['doctorCategories']['args']
    >({
      query: () => ({
        url: '/doctor/categories',
        method: 'get',
      }),
    }),
  }),
});

export const { useDoctorCategoriesQuery, useLazyDoctorCategoriesQuery } =
  DoctorAPI;
