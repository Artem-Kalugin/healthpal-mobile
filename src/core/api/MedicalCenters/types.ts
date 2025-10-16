export type RequestsMedicalCenters = {
  medicalCenters: PickApiData<'/medical-centers', 'get'>;
  favorites: PickApiData<'/medical-centers/favorites', 'get'>;
};
