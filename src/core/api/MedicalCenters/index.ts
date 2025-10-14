import { Query } from '#api';

import { RequestsMedicalCenters as Requests } from './types';

const MedicalCentersAPI = Query.injectEndpoints({
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
  }),
});

export const { useMedicalCentersQuery, useLazyMedicalCentersQuery } =
  MedicalCentersAPI;
