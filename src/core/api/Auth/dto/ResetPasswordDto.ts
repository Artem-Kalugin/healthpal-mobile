import { z } from 'zod';

export type ResetPasswordLabels = {
  password: {
    required: string;
    minLength: string;
    maxLength: string;
    charset: string;
  };
  confirmPassword: { mismatch: string };
};

const PASSWORD_REGEX =
  /^(?:(?=.*\p{Ll})(?=.*\p{Lu})|(?=.*\p{Ll})(?=.*\d)|(?=.*\p{Lu})(?=.*\d)).+$/u;

export const createResetPasswordSchema = (labels: ResetPasswordLabels) =>
  z
    .object({
      password: z
        .string(labels.password.required)
        .min(8, labels.password.minLength)
        .max(50, labels.password.maxLength)
        .regex(PASSWORD_REGEX, labels.password.charset),
      confirmPassword: z.string(labels.confirmPassword.mismatch),
    })
    .refine(values => values.confirmPassword === values.password, {
      path: ['confirmPassword'],
      error: labels.confirmPassword.mismatch,
    });

export type ResetPasswordDto = z.infer<
  ReturnType<typeof createResetPasswordSchema>
>;
