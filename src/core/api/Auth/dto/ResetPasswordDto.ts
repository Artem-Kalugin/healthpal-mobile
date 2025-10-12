import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'PasswordsMatch', async: false })
class PasswordsMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments): boolean {
    const { object } = args;
    return confirmPassword === (object as any).password;
  }

  defaultMessage(): string {
    return 'Пароли не совпадают';
  }
}

export class ResetPasswordDto {
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
  password: string;

  @Validate(PasswordsMatchConstraint)
  confirmPassword: string;
}
