import { z } from 'zod';

import { isE164Phone } from './phone';

export type LoginLabels = {
  phone: { required: string; format: string };
  password: {
    required: string;
    minLength: string;
    maxLength: string;
    charset: string;
  };
};

const PASSWORD_REGEX =
  /^(?:(?=.*\p{Ll})(?=.*\p{Lu})|(?=.*\p{Ll})(?=.*\d)|(?=.*\p{Lu})(?=.*\d)).+$/u;

export const createLoginSchema = (labels: LoginLabels) =>
  z.object({
    phone: z
      .string(labels.phone.required)
      .min(1, labels.phone.required)
      .refine(isE164Phone, labels.phone.format),
    password: z
      .string(labels.password.required)
      .min(1, labels.password.required)
      .min(8, labels.password.minLength)
      .max(50, labels.password.maxLength)
      .regex(PASSWORD_REGEX, labels.password.charset),
  });

export type LoginDto = z.infer<ReturnType<typeof createLoginSchema>>;
