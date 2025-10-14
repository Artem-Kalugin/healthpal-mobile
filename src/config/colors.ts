import { DoctorCategoryType } from '#generated/schema';

export const colors = {
  main: {
    white: '#FFFFFF',
    midnightBlue: '#1C2A3A',
  },
  error: {
    normal: '#EF0000',
  },
  primary: {
    normal: '#1c64f2',
    pale: '#b185e0',
    light: '#e0d1f2',
    vivid: '#e643b5',
  },
  white: '#FFFFFF',
  black: '#333333',
  transparent: '#00000000',
  grayscale: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2A37',
    900: '#111928',
  },
};

export const MapDoctorCategoryToColor: { [x in DoctorCategoryType]: string } = {
  [DoctorCategoryType.dentistry]: '#80c78a',
  [DoctorCategoryType.cardiology]: '#f78078',
  [DoctorCategoryType.pulmonology]: '#6bb5f0',
  [DoctorCategoryType.general]: '#b87fd0',
  [DoctorCategoryType.neurology]: '#ffb84d',
  [DoctorCategoryType.gastroenterology]: '#a1887f',
  [DoctorCategoryType.laboratory]: '#33d6e6',
  [DoctorCategoryType.vaccination]: '#ff8c66',
};
