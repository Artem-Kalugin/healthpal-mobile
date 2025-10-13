import {
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Gender } from '#generated/schema';

export class UpdateUserDto {
  @MaxLength(16, {
    message: 'Имя не может быть длинее 16 символов',
  })
  @MinLength(2, {
    message: 'Имя не может быть короче 2 символов',
  })
  @Matches(/^[А-Яа-яЁё]+(?:-[А-Яа-яЁё]+)*$/, {
    message: 'Имя может содержать только буквы кириллицы и дефис внутри слова',
  })
  @IsNotEmpty({ message: 'Пожалуйста, введите имя' })
  name: string;

  @MaxLength(16, {
    message: 'Фамилия не может быть длинее 16 символов',
  })
  @MinLength(2, {
    message: 'Фамилия не может быть короче 2 символов',
  })
  @Matches(/^[А-Яа-яЁё]+(?:-[А-Яа-яЁё]+)*$/, {
    message:
      'Фамилия может содержать только буквы кириллицы и дефис внутри слова',
  })
  @IsNotEmpty({ message: 'Пожалуйста, введите фамилию' })
  surname: string;

  @IsNotEmpty({ message: 'Пожалуйста, выберите день рождения' })
  birthday: string;

  @IsNotEmpty({ message: 'Пожалуйста, выберите пол' })
  gender: Gender;

  @IsOptional()
  @Matches(/^[^\s]*$/, {
    message: 'Имя пользователя не может содержать пробелов',
  })
  nickname?: string;
}
