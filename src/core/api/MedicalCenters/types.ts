export type RequestsMedicalCenters = {
  medicalCenters: PickApiData<'/medical-centers', 'get'>;
  favorites: PickApiData<'/medical-centers/favorites', 'get'>;
  addFavorite: PickApiData<'/medical-centers/{id}/favorite', 'post'>;
  removeFavorite: PickApiData<'/medical-centers/{id}/favorite', 'delete'>;
};
