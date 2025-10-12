import { Matches } from 'class-validator';

export class RequestOtpDto {
  @Matches(/^\d{10}$/, {
    message:
      'Телефон должен быть в формате +7 (XXX) XXX-XX-XX (11 цифр после плюса)',
  })
  phone: string;
}
