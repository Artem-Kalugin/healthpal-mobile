import { Query } from '#api';
import { PaginationConfig } from '#api/config';

import { RequestsDoctor as Requests } from './types';

const DoctorAPI = Query.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    doctorCategories: build.query<
      Requests['getDoctorCategories']['response'],
      Requests['getDoctorCategories']['args']
    >({
      query: () => ({
        url: '/doctor-categories',
        method: 'get',
      }),
    }),
    searchDoctors: build.infiniteQuery<
      Requests['getSearch']['response'],
      Requests['getSearch']['args'],
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
      Requests['getFavorites']['response'],
      Requests['getFavorites']['args'],
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
      Requests['getDoctor']['response'],
      Requests['getDoctor']['args']
    >({
      query: args => ({
        url: '/doctors/{id}',
        method: 'get',
        ...args,
      }),
    }),
    getDoctorSchedule: build.query<
      Requests['getSchedule']['response'],
      Requests['getSchedule']['args']
    >({
      query: args => ({
        url: '/doctors/{doctorId}/schedule',
        method: 'get',
        ...args,
      }),
    }),
    getDoctorTimeSlotsRange: build.query<
      Requests['getTimeslotsRange']['response'],
      Requests['getTimeslotsRange']['args']
    >({
      query: args => ({
        url: '/doctors/{doctorId}/time-slots/range',
        method: 'get',
        ...args,
      }),
    }),
    getDoctorTimeSlots: build.query<
      Requests['getTimeslots']['response'],
      Requests['getTimeslots']['args']
    >({
      query: args => ({
        url: '/doctors/{doctorId}/time-slots',
        method: 'get',
        ...args,
      }),
      serializeQueryArgs: args => {
        return args.endpointName + args.queryArgs?.path.doctorId;
      },
      forceRefetch(payload) {
        return payload.currentArg !== payload.previousArg;
      },
      merge(currentCacheData, responseData) {
        const newTimeSlots = new Map();

        for (const dayWithTimeSlotNew of responseData) {
          newTimeSlots.set(dayWithTimeSlotNew.date, dayWithTimeSlotNew);
        }

        for (const dayWithTimeSlotsOld of currentCacheData) {
          if (!newTimeSlots.has(dayWithTimeSlotsOld.date)) {
            newTimeSlots.set(dayWithTimeSlotsOld.date, dayWithTimeSlotsOld);
          }
        }

        return Array.from(newTimeSlots.values());
      },
    }),
  }),
});

export const {
  useDoctorCategoriesQuery,
  useLazyDoctorCategoriesQuery,
  useSearchDoctorsInfiniteQuery,
  useFavoriteDoctorsInfiniteQuery,
  useGetDoctorQuery,
  useGetDoctorTimeSlotsQuery,
  useGetDoctorTimeSlotsRangeQuery,
  useGetDoctorScheduleQuery,
} = DoctorAPI;
