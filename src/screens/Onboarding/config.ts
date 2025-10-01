import { Images } from '#config';

export const slides: {
  image: number;
  title: string;
  description: string;
}[] = [
  {
    image: Images.onboarding1,
    title: 'Онлайн-приём у врачей',
    description:
      'Получайте медицинские консультации у специалистов онлайн — удобно и без лишних хлопот.',
  },
  {
    image: Images.onboarding2,
    title: 'Связь с узкими специалистами',
    description:
      'Обращайтесь к нужным врачам-специалистам онлайн и получайте профессиональную помощь.',
  },
  {
    image: Images.onboarding3,
    title: 'Тысячи специалистов онлайн',
    description:
      'Огромный выбор врачей разных направлений — найдите именно того, кто поможет в вашей ситуации.',
  },
];
