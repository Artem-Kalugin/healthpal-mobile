import { createLoginSchema, LoginLabels } from '#api/Auth/dto/LoginDto';

import type { KeysFor } from '#i18n/types';

export const loginLabels = {
  phone: {
    required: 'signIn.validation.phone.required',
    format: 'signIn.validation.phone.format',
  },
  password: {
    required: 'signIn.validation.password.required',
    minLength: 'signIn.validation.password.minLength',
    maxLength: 'signIn.validation.password.maxLength',
    charset: 'signIn.validation.password.charset',
  },
} satisfies KeysFor<LoginLabels>;

export const loginSchema = createLoginSchema(loginLabels);
