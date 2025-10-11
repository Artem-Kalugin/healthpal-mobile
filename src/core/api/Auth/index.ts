import { Query } from '#api';

import { RequestsAuth as Requests } from './types';

const AuthAPI = Query.injectEndpoints({
  endpoints: build => ({
    verifyPhone: build.mutation<
      Requests['verifyPhone']['response'],
      Requests['verifyPhone']['args']
    >({
      query: args => ({
        url: '/auth/recovery/request-otp',
        method: 'post',
        ...args,
      }),
    }),
    verifyCode: build.mutation<
      Requests['verifyCode']['response'],
      Requests['verifyCode']['args']
    >({
      query: args => ({
        url: '/auth/recovery/verify-otp',
        method: 'post',
        ...args,
      }),
    }),
    login: build.mutation<
      Requests['login']['response'],
      Requests['login']['args']
    >({
      query: args => ({
        url: '/auth/login',
        method: 'post',
        ...args,
      }),
    }),
    register: build.mutation<
      Requests['register']['response'],
      Requests['register']['args']
    >({
      query: args => ({
        url: '/auth/register',
        method: 'post',
        ...args,
      }),
    }),
    completeRegistation: build.mutation<
      Requests['completeRegistation']['response'],
      Requests['completeRegistation']['args']
    >({
      query: args => ({
        url: '/auth/complete-registration',
        method: 'post',
        ...args,
      }),
    }),
    resetPassword: build.mutation<
      Requests['resetPassword']['response'],
      Requests['resetPassword']['args']
    >({
      query: args => ({
        url: '/auth/recovery/reset-password',
        method: 'post',
        ...args,
      }),
    }),
  }),
});

export const {
  useVerifyPhoneMutation,
  useVerifyCodeMutation,
  useLoginMutation,
  useCompleteRegistationMutation,
  useResetPasswordMutation,
  useRegisterMutation,
} = AuthAPI;
