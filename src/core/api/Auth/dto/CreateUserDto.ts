import { z } from 'zod';

import { createLoginSchema, LoginLabels } from './LoginDto';

type NameLabels = {
  required: string;
  minLength: string;
  maxLength: string;
  format: string;
};

export type CreateUserLabels = LoginLabels & {
  name: NameLabels;
  surname: NameLabels;
};

/** Letters of any script, parts separated by a hyphen, an apostrophe or a space ("Anna-Maria", "O'Connor", "van der Berg"). */
const NAME_PATTERN = /^\p{L}+(?:[-'’ ]\p{L}+)*$/u;

const createNameSchema = (labels: NameLabels) =>
  z
    .string(labels.required)
    .min(1, labels.required)
    .min(2, labels.minLength)
    .max(16, labels.maxLength)
    .regex(NAME_PATTERN, labels.format);

export const createCreateUserSchema = (labels: CreateUserLabels) =>
  createLoginSchema(labels).extend({
    name: createNameSchema(labels.name),
    surname: createNameSchema(labels.surname),
  });

export type CreateUserDto = z.infer<ReturnType<typeof createCreateUserSchema>>;
