import { Query } from '#api';

import { RequestsUser as Requests, TagsUserAPI } from './types';

export const UserAPI = Query.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    getCurrent: build.query<
      Requests['getCurrent']['response'],
      Requests['getCurrent']['args']
    >({
      query: () => ({
        url: '/users/me',
        method: 'get',
      }),
      providesTags: [TagsUserAPI.User],
    }),

    updateCurrent: build.mutation<
      Requests['updateCurrent']['response'],
      Requests['updateCurrent']['args']
    >({
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
          url: '/users/me',
          method: 'PATCH',
          data: formData,
        };
      },
      invalidatesTags: [TagsUserAPI.User],
    }),
  }),
});

export const {
  useGetCurrentQuery: useGetCurrentUserQuery,
  useUpdateCurrentMutation: useUpdateCurrentMutation,
} = UserAPI;
