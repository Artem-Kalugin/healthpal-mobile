export type RequestsDoctor = {
  getDoctorCategories: PickApiData<'/doctor-categories', 'get'>;
  getDoctor: PickApiData<'/doctors/{id}', 'get'>;
  getSearch: PickApiData<'/doctors/search', 'get'>;
  getFavorites: PickApiData<'/doctors/favorites', 'get'>;
  addFavorite: PickApiData<'/doctors/{id}/favorite', 'post'>;
  removeFavorite: PickApiData<'/doctors/{id}/favorite', 'delete'>;
  getSchedule: PickApiData<'/doctors/{doctorId}/schedule', 'get'>;
  getTimeslotsRange: PickApiData<'/doctors/{doctorId}/time-slots/range', 'get'>;
  getTimeslots: PickApiData<'/doctors/{doctorId}/time-slots', 'get'>;
};
