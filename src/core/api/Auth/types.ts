export type RequestsAuth = {
  verifyPhone: PickApiData<'/auth/recovery/request-otp', 'post'>;
  verifyCode: PickApiData<'/auth/recovery/verify-otp', 'post'>;
  resetPassword: PickApiData<'/auth/recovery/reset-password', 'post'>;
  login: PickApiData<'/auth/login', 'post'>;
  register: PickApiData<'/auth/register', 'post'>;
  completeRegistation: PickApiData<'/auth/complete-registration', 'post'>;
};
