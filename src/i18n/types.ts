import type {
  BEDoctorCategoryType,
  BEDoctorScheduleResponseDto,
  BEErrorCode,
  BEGender,
  BEMedicalCenterType,
  BEValidationCode,
  BEValidationIssueParametersDto,
} from '#generated/__entities';

import type { en } from './config/en';

export type Language = 'en' | 'ru';

export type Region = 'RU' | 'EU';

type PluralSuffix = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

type StripPlural<K extends string> = K extends `${infer B}_${PluralSuffix}`
  ? B
  : K;

type KeysOf<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${StripPlural<K>}`
    : KeysOf<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

type ShapeOf<T, S extends PluralSuffix> = {
  [K in keyof T as K extends `${infer B}_${PluralSuffix}`
    ? `${B}_${S}`
    : K]: T[K] extends string ? string : ShapeOf<T[K], S>;
};

export type Catalog = typeof en;

/** Keys of the source catalog; plural variants are addressed by the base key. */
export type TranslationKey = KeysOf<Catalog>;

/** Replaces every string of `T` with a translation key: `{...} satisfies KeysFor<Labels>`. */
export type KeysFor<T> = {
  [K in keyof T]: T[K] extends string ? TranslationKey : KeysFor<T[K]>;
};

/**
 * The shape a catalog of a language with plural suffixes `S` must have:
 * the keys of the source catalog, plural keys expanded to `S`.
 */
export type CatalogShape<S extends PluralSuffix> = ShapeOf<Catalog, S>;

type Assert<T extends true> = T;

/** `true` when both unions are the same set. */
type SameKeys<A extends string, B extends string> = [A] extends [B]
  ? [B] extends [A]
    ? true
    : false
  : false;

// A missing or an extra code in the source catalog is a compile error here.
// The generated codes are string enums: the template turns them into plain literals, as catalog keys are.
export type ServerErrorsExhaustive = Assert<
  SameKeys<keyof Catalog['serverErrors'], `${BEErrorCode}` | 'UNKNOWN'>
>;
export type ServerValidationExhaustive = Assert<
  SameKeys<
    StripPlural<keyof Catalog['serverValidation'] & string>,
    `${BEValidationCode}` | 'UNKNOWN'
  >
>;

export type RegionExhaustive = Assert<
  SameKeys<keyof Catalog['region'], Region | 'auto'>
>;
export type GenderExhaustive = Assert<
  SameKeys<keyof Catalog['gender'], `${BEGender}`>
>;
export type DoctorCategoriesExhaustive = Assert<
  SameKeys<keyof Catalog['doctorCategories'], `${BEDoctorCategoryType}`>
>;
export type DoctorCategoryExhaustive = Assert<
  SameKeys<keyof Catalog['doctorCategory'], `${BEDoctorCategoryType}`>
>;
export type MedicalCenterTypeExhaustive = Assert<
  SameKeys<keyof Catalog['medicalCenterType'], `${BEMedicalCenterType}`>
>;

export type WeekDayExhaustive = Assert<
  SameKeys<keyof Catalog['weekDay'], `${keyof BEDoctorScheduleResponseDto}`>
>;

/** A form error carried through react-hook-form as a `JSON.stringify`-ed string, translated at render. */
export type FormLabel = {
  key: TranslationKey;
  params?: BEValidationIssueParametersDto;
};

export type DateInput = Date | number | string;

export type IFormatters = {
  formatDate: (
    value: DateInput,
    options?: Intl.DateTimeFormatOptions,
  ) => string;
  formatTime: (value: DateInput) => string;
  formatDistance: (meters: number) => string;
};
