import { Matches } from 'class-validator';

export class RequestOtpDto {
  @Matches(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/, {
    message:
      'Телефон должен быть в формате +7 (XXX) XXX-XX-XX (11 цифр после плюса)',
  })
  phone: string;
}
