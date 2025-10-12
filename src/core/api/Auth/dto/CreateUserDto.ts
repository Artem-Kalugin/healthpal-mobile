import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

import { LoginDto } from './LoginDto';

export class CreateUserDto extends LoginDto {
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
  //@ts-expect-error
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
  //@ts-expect-error
  surname: string;
}
