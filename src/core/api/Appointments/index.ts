import { Query } from '#api';
import { API_PAGINATION_PAGE_SIZE, PaginationConfig } from '#api/config';

import { RequestsAppointment as Requests, TagsAppointmentAPI } from './types';

const AppointmentAPI = Query.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    appointments: build.infiniteQuery<
      Requests['appointments']['response'],
      Requests['appointments']['args'],
      number
    >({
      infiniteQueryOptions: PaginationConfig,
      query: ({ pageParam, queryArg }) => ({
        url: `/appointments?page=${pageParam}&size=${API_PAGINATION_PAGE_SIZE}`,
        method: 'get',
        ...queryArg,
      }),
      providesTags: [TagsAppointmentAPI.Appointment],
    }),
    createAppointment: build.mutation<
      Requests['createAppointment']['response'],
      Requests['createAppointment']['args']
    >({
      query: args => ({
        url: '/appointments',
        method: 'post',
        ...args,
      }),
      invalidatesTags: [TagsAppointmentAPI.Appointment],
    }),

    rescheduleAppointment: build.mutation<
      Requests['rescheduleAppointment']['response'],
      Requests['rescheduleAppointment']['args']
    >({
      query: args => ({
        url: `/appointments/{id}/reschedule`,
        method: 'patch',
        ...args,
      }),
      invalidatesTags: [TagsAppointmentAPI.Appointment],
    }),
    cancelAppointment: build.mutation<
      Requests['cancelAppointment']['response'],
      NonNullable<Requests['cancelAppointment']['args']>
    >({
      query: args => ({
        url: `/appointments/{id}/cancel`,
        method: 'patch',
        ...args,
      }),
      invalidatesTags: [TagsAppointmentAPI.Appointment],
    }),
  }),
});

export const {
  useAppointmentsInfiniteQuery,
  useCreateAppointmentMutation,
  useRescheduleAppointmentMutation,
  useCancelAppointmentMutation,
} = AppointmentAPI;

export default AppointmentAPI;
