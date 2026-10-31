import {
  createResetPasswordSchema,
  ResetPasswordLabels,
} from '#api/Auth/dto/ResetPasswordDto';

import type { KeysFor } from '#i18n/types';

export const resetPasswordLabels = {
  password: {
    required: 'passwordRecoverySetPassword.validation.password.required',
    minLength: 'passwordRecoverySetPassword.validation.password.minLength',
    maxLength: 'passwordRecoverySetPassword.validation.password.maxLength',
    charset: 'passwordRecoverySetPassword.validation.password.charset',
  },
  confirmPassword: {
    mismatch: 'passwordRecoverySetPassword.validation.confirmPassword.mismatch',
  },
} satisfies KeysFor<ResetPasswordLabels>;

export const resetPasswordSchema =
  createResetPasswordSchema(resetPasswordLabels);
