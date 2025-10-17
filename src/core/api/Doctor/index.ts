import { Query } from '#api';
import { API_PAGINATION_PAGE_SIZE, PaginationConfig } from '#api/config';

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
        url: `/doctors/search?page=${pageParam}&size=${API_PAGINATION_PAGE_SIZE}`,
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
        url: `/doctors/favorites?page=${pageParam}&size=${API_PAGINATION_PAGE_SIZE}`,
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
      NonNullable<Requests['getTimeslots']['args']>
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
      merge(currentCacheData, responseData, args) {
        const newTimeSlots = new Map();

        for (const dayWithTimeSlotNew of responseData) {
          newTimeSlots.set(dayWithTimeSlotNew.date, dayWithTimeSlotNew);
        }

        const startDateParam = args.arg?.params?.startDate.slice(0, 10) || '';
        const endDateParam = args.arg?.params?.endDate.slice(0, 10) || '';

        for (const dayWithTimeSlotsOld of currentCacheData) {
          if (
            !newTimeSlots.has(dayWithTimeSlotsOld.date) &&
            (dayWithTimeSlotsOld.date < startDateParam ||
              dayWithTimeSlotsOld.date > endDateParam)
          ) {
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

export default DoctorAPI;
