export type RequestsFavorites = {
  addDoctor: PickApiData<'/favorites/doctors/{doctorId}', 'post'>;
  removeDoctor: PickApiData<'/favorites/doctors/{doctorId}', 'delete'>;
  addMedicalCenter: PickApiData<
    '/favorites/medical-centers/{medicalCenterId}',
    'post'
  >;
  removeMedicalCenter: PickApiData<
    '/favorites/medical-centers/{medicalCenterId}',
    'delete'
  >;
};
