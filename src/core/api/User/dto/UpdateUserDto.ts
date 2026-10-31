import { z } from 'zod';

import { Gender } from '#generated/schema';

type NameLabels = {
  required: string;
  minLength: string;
  maxLength: string;
  format: string;
};

export type UpdateUserLabels = {
  name: NameLabels;
  surname: NameLabels;
  birthday: { required: string };
  gender: { required: string };
  nickname: { noSpaces: string };
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

export const createUpdateUserSchema = (labels: UpdateUserLabels) =>
  z.object({
    name: createNameSchema(labels.name),
    surname: createNameSchema(labels.surname),
    birthday: z
      .string(labels.birthday.required)
      .min(1, labels.birthday.required),
    gender: z.enum(Gender, labels.gender.required),
    nickname: z
      .string()
      .regex(/^[^\s]*$/, labels.nickname.noSpaces)
      .optional(),
  });

export type UpdateUserDto = z.infer<ReturnType<typeof createUpdateUserSchema>>;
