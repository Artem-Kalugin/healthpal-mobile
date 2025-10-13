import {
  DoctorCategoryType,
  Gender,
  MedicalCenterType,
} from '#generated/schema';

export const MapGenderToLabel: { [x in Gender]: string } = {
  [Gender.FEMALE]: 'Женский',
  [Gender.MALE]: 'Мужской',
};

export const MapDoctorCategoryToLabel: { [x in DoctorCategoryType]: string } = {
  [DoctorCategoryType.dentistry]: 'Стоматологи',
  [DoctorCategoryType.cardiology]: 'Кардиологи',
  [DoctorCategoryType.pulmonology]: 'Пульмонологи',
  [DoctorCategoryType.general]: 'Терапевты',
  [DoctorCategoryType.neurology]: 'Неврологи',
  [DoctorCategoryType.gastroenterology]: 'Гастроэнтерологи',
  [DoctorCategoryType.laboratory]: 'Лаборатория',
  [DoctorCategoryType.vaccination]: 'Вакцинация',
};

export const MapMedicalCenterTypeToLabel: { [x in MedicalCenterType]: string } =
  {
    [MedicalCenterType.hospital]: 'Больница',
    [MedicalCenterType.clinc]: 'Клиника',
    [MedicalCenterType.cabinet]: 'Кабинет',
  };
