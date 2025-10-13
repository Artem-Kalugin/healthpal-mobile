// types.ts
export type RequestsMedicalCenters = {
  medicalCenters: PickApiData<'/medical-centers', 'get'>;
};
