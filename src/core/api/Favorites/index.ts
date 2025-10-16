import { Query } from '#api';

import { RequestsFavorites as Requests } from './types';

export const FavoritesAPI = Query.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    addDoctor: build.mutation<
      Requests['addDoctor']['response'],
      Requests['addDoctor']['args']
    >({
      query: args => ({
        url: `/favorites/doctors/{doctorId}`,
        method: 'post',
        ...args,
      }),
    }),
    removeDoctor: build.mutation<
      Requests['removeDoctor']['response'],
      Requests['removeDoctor']['args']
    >({
      query: args => ({
        url: `/favorites/doctors/{doctorId}`,
        method: 'delete',
        ...args,
      }),
    }),
    addMedicalCenter: build.mutation<
      Requests['addMedicalCenter']['response'],
      Requests['addMedicalCenter']['args']
    >({
      query: args => ({
        url: `/favorites/medical-centers/{medicalCenterId}`,
        method: 'post',
        ...args,
      }),
    }),
    removeMedicalCenter: build.mutation<
      Requests['removeMedicalCenter']['response'],
      Requests['removeMedicalCenter']['args']
    >({
      query: args => ({
        url: `/favorites/medical-centers/{medicalCenterId}`,
        method: 'delete',
        ...args,
      }),
    }),
  }),
});

export const {
  useAddDoctorMutation,
  useRemoveDoctorMutation,
  useAddMedicalCenterMutation,
  useRemoveMedicalCenterMutation,
} = FavoritesAPI;
