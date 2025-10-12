export type RequestsUser = {
  getCurrent: PickApiData<'/users/me', 'get'>;
  updateCurrent: PickApiData<'/users/me', 'patch'>;
};

export enum TagsUserAPI {
  User = 'User',
}
