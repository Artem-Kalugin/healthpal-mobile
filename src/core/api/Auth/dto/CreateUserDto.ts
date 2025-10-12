import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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

  @Matches(/^\d{10}$/, {
    message:
      'Телефон должен быть в формате +7 (XXX) XXX-XX-XX (11 цифр после плюса)',
  })
  @IsNotEmpty({ message: 'Пожалуйста, введите номер телефона' })
  //@ts-expect-error
  phone: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  @MaxLength(50, { message: 'Пароль не должен превышать 50 символов' })
  @Matches(
    /^(?:(?=.*\p{Ll})(?=.*\p{Lu})|(?=.*\p{Ll})(?=.*\d)|(?=.*\p{Lu})(?=.*\d)).+$/u,
    {
      message:
        'Пароль должен содержать как минимум два типа символов: строчные, прописные или цифры',
    },
  )
  @IsNotEmpty({ message: 'Пожалуйста, введите пароль' })
  //@ts-expect-error
  password: string;
}
