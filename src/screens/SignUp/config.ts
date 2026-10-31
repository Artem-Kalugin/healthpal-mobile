import {
  createCreateUserSchema,
  CreateUserLabels,
} from '#api/Auth/dto/CreateUserDto';

import type { KeysFor } from '#i18n/types';

export const createUserLabels = {
  phone: {
    required: 'signUp.validation.phone.required',
    format: 'signUp.validation.phone.format',
  },
  password: {
    required: 'signUp.validation.password.required',
    minLength: 'signUp.validation.password.minLength',
    maxLength: 'signUp.validation.password.maxLength',
    charset: 'signUp.validation.password.charset',
  },
  name: {
    required: 'signUp.validation.name.required',
    minLength: 'signUp.validation.name.minLength',
    maxLength: 'signUp.validation.name.maxLength',
    format: 'signUp.validation.name.format',
  },
  surname: {
    required: 'signUp.validation.surname.required',
    minLength: 'signUp.validation.surname.minLength',
    maxLength: 'signUp.validation.surname.maxLength',
    format: 'signUp.validation.surname.format',
  },
} satisfies KeysFor<CreateUserLabels>;

export const createUserSchema = createCreateUserSchema(createUserLabels);
