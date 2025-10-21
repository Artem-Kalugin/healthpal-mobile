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
  [DoctorCategoryType.vaccination]: 'Инфекционисты',
};

export const MapDoctorCategoryToDoctorLabel: {
  [x in DoctorCategoryType]: string;
} = {
  [DoctorCategoryType.dentistry]: 'Стоматолог',
  [DoctorCategoryType.cardiology]: 'Кардиолог',
  [DoctorCategoryType.pulmonology]: 'Пульмонолог',
  [DoctorCategoryType.general]: 'Терапевт',
  [DoctorCategoryType.neurology]: 'Невролог',
  [DoctorCategoryType.gastroenterology]: 'Гастроэнтеролог',
  [DoctorCategoryType.laboratory]: 'Врач-лаборант',
  [DoctorCategoryType.vaccination]: 'Инфекционист',
};

export const MapMedicalCenterTypeToLabel: { [x in MedicalCenterType]: string } =
  {
    [MedicalCenterType.hospital]: 'Больница',
    [MedicalCenterType.clinc]: 'Клиника',
    [MedicalCenterType.cabinet]: 'Кабинет',
  };
