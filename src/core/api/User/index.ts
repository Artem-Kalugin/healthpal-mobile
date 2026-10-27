import { RtkAppApi } from '#api';

import { RequestsUser as Requests, TagsUserAPI } from './types';

const UserAPI = RtkAppApi.injectEndpoints({
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
      NonNullable<Requests['updateCurrent']['args']>
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
          // @ts-expect-error React Native FormData accepts a { uri, type, name } file object, but its typings only know the DOM `string | Blob`
          formData.append('avatar', {
            uri: args.data?.avatar,
            type: 'image/jpeg',
            name: 'avatar.jpg',
          });
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

export default UserAPI;
