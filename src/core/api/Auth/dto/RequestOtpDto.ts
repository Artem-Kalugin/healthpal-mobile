import { z } from 'zod';

import { isE164Phone } from './phone';

export type RequestOtpLabels = {
  phone: { format: string };
};

export const createRequestOtpSchema = (labels: RequestOtpLabels) =>
  z.object({
    phone: z
      .string(labels.phone.format)
      .refine(isE164Phone, labels.phone.format),
  });

export type RequestOtpDto = z.infer<ReturnType<typeof createRequestOtpSchema>>;
