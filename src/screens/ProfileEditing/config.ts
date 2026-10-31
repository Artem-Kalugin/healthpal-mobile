import {
  createUpdateUserSchema,
  UpdateUserLabels,
} from '#api/User/dto/UpdateUserDto';

import type { KeysFor } from '#i18n/types';

export const updateUserLabels = {
  name: {
    required: 'profileEditing.validation.name.required',
    minLength: 'profileEditing.validation.name.minLength',
    maxLength: 'profileEditing.validation.name.maxLength',
    format: 'profileEditing.validation.name.format',
  },
  surname: {
    required: 'profileEditing.validation.surname.required',
    minLength: 'profileEditing.validation.surname.minLength',
    maxLength: 'profileEditing.validation.surname.maxLength',
    format: 'profileEditing.validation.surname.format',
  },
  birthday: {
    required: 'profileEditing.validation.birthday.required',
  },
  gender: {
    required: 'profileEditing.validation.gender.required',
  },
  nickname: {
    noSpaces: 'profileEditing.validation.nickname.noSpaces',
  },
} satisfies KeysFor<UpdateUserLabels>;

export const updateUserSchema = createUpdateUserSchema(updateUserLabels);
