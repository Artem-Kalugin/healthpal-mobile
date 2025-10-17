import { RequestsDoctor } from '#api/Doctor/types';

import {
  PathsDoctorsSearchGetParametersQueryOrder,
  PathsDoctorsSearchGetParametersQuerySort,
} from '#generated/schema';

export const FOLDABLE_HEADER_INITIAL_HEIGHT = 150;

export enum SortOptions {
  'rating' = 'Наивысший рейтинг',
  'practiceStartYear' = 'Наибольший стаж',
  'reviewsCount' = 'Больше всего отзывов',
}

export const SortOptionsDTO: {
  [x in SortOptions]: NonNullable<
    Pick<
      NonNullable<NonNullable<RequestsDoctor['getSearch']['args']>['params']>,
      'order' | 'sort'
    >
  >;
} = {
  [SortOptions.reviewsCount]: {
    sort: PathsDoctorsSearchGetParametersQuerySort.reviews,
    order: PathsDoctorsSearchGetParametersQueryOrder.DESC,
  },
  [SortOptions.practiceStartYear]: {
    sort: PathsDoctorsSearchGetParametersQuerySort.practiceStartYear,
    order: PathsDoctorsSearchGetParametersQueryOrder.ASC,
  },
  [SortOptions.rating]: {
    sort: PathsDoctorsSearchGetParametersQuerySort.rating,
    order: PathsDoctorsSearchGetParametersQueryOrder.DESC,
  },
};
