import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
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
