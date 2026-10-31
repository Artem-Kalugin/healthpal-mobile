import { z } from 'zod';

export type RequestOtpLabels = {
  phone: { format: string };
};

const PHONE_REGEX = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

export const createRequestOtpSchema = (labels: RequestOtpLabels) =>
  z.object({
    phone: z
      .string(labels.phone.format)
      .regex(PHONE_REGEX, labels.phone.format),
  });

export type RequestOtpDto = z.infer<ReturnType<typeof createRequestOtpSchema>>;
