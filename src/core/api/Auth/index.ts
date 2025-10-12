import { Query } from '#api';
import { TagsUserAPI } from '#api/User/types';

import { RequestsAuth as Requests } from './types';

const AuthAPI = Query.injectEndpoints({
  overrideExisting: true,
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
      invalidatesTags: [TagsUserAPI.User],
      query: args => {
        const formData = new FormData();

        const { ...rest } = args.data;

        Object.entries(rest).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });

        if (args.data?.avatar) {
          formData.append('avatar', {
            uri: args.data?.avatar,
            type: 'image/jpeg',
            name: 'avatar.jpg',
          } as any);
        }

        return {
          url: '/auth/complete-registration',
          method: 'post',
          'Content-Type': 'multipart/form-data',
          data: formData,
        };
      },
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
