export type RequestsDoctor = {
  doctorCategories: PickApiData<'/doctor-categories', 'get'>;
  doctor: PickApiData<'/doctors/{id}', 'get'>;
  search: PickApiData<'/doctors/search', 'get'>;
};
