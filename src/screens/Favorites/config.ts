import { FavoritesRoutes } from './../../navigation/Main/Favorites/types';

export const FavoritesEmptyListWarnings = {
  [FavoritesRoutes.FavoriteDoctors]: {
    title: 'У вас пока нет избранных врачей 💙',
    subtitle: 'Добавьте тех, кому доверяете, чтобы всегда иметь их под рукой.',
  },
  [FavoritesRoutes.FavoriteMedicalCenters]: {
    title: 'Вы ещё не добавили медцентры 💙',
    subtitle: 'Добавьте понравившиеся, чтобы быстро находить их позже.',
  },
};

export const FavoritesListEnd = {
  [FavoritesRoutes.FavoriteDoctors]: 'Кажется, мы отобразили всех врачей',
  [FavoritesRoutes.FavoriteMedicalCenters]:
    'Кажется, мы отобразили все мед. центры',
};
