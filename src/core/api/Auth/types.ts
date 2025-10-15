export type RequestsAuth = {
  verifyPhone: PickApiData<'/auth/recovery/otp/request', 'post'>;
  verifyCode: PickApiData<'/auth/recovery/otp/verify', 'post'>;
  resetPassword: PickApiData<'/auth/recovery/reset-password', 'post'>;
  login: PickApiData<'/auth/login', 'post'>;
  register: PickApiData<'/auth/register', 'post'>;
  completeRegistation: PickApiData<'/auth/complete-registration', 'post'>;
};
