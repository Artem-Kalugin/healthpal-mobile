import {
  createRequestOtpSchema,
  RequestOtpLabels,
} from '#api/Auth/dto/RequestOtpDto';

import type { KeysFor } from '#i18n/types';

export const requestOtpLabels = {
  phone: {
    format: 'passwordRecoveryPhoneInput.validation.phone.format',
  },
} satisfies KeysFor<RequestOtpLabels>;

export const requestOtpSchema = createRequestOtpSchema(requestOtpLabels);
