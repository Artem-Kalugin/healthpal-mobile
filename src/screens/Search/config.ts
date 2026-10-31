import type { RequestsDoctor } from '#api/Doctor/types';

import {
  DoctorSort,
  PathsDoctorsSearchGetParametersQueryOrder,
} from '#generated/schema';

export const FOLDABLE_HEADER_HEIGHT = 164;

// the values are the keys of `search.sort` in the catalogs
export enum SortOptions {
  'rating' = 'rating',
  'practiceStartYear' = 'practiceStartYear',
  'reviewsCount' = 'reviewsCount',
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
    sort: DoctorSort.reviews,
    order: PathsDoctorsSearchGetParametersQueryOrder.DESC,
  },
  [SortOptions.practiceStartYear]: {
    sort: DoctorSort.practiceStartYear,
    order: PathsDoctorsSearchGetParametersQueryOrder.ASC,
  },
  [SortOptions.rating]: {
    sort: DoctorSort.rating,
    order: PathsDoctorsSearchGetParametersQueryOrder.DESC,
  },
};
