import { z } from 'zod';

export type LoginLabels = {
  phone: { required: string; format: string };
  password: {
    required: string;
    minLength: string;
    maxLength: string;
    charset: string;
  };
};

const PHONE_REGEX = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
const PASSWORD_REGEX =
  /^(?:(?=.*\p{Ll})(?=.*\p{Lu})|(?=.*\p{Ll})(?=.*\d)|(?=.*\p{Lu})(?=.*\d)).+$/u;

export const createLoginSchema = (labels: LoginLabels) =>
  z.object({
    phone: z
      .string(labels.phone.required)
      .min(1, labels.phone.required)
      .regex(PHONE_REGEX, labels.phone.format),
    password: z
      .string(labels.password.required)
      .min(1, labels.password.required)
      .min(8, labels.password.minLength)
      .max(50, labels.password.maxLength)
      .regex(PASSWORD_REGEX, labels.password.charset),
  });

export type LoginDto = z.infer<ReturnType<typeof createLoginSchema>>;
