type paths = import('../generated/schema').paths;

declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}

type ExcludeUnknown<T> = {
  [K in keyof T as T[K] extends unknown
    ? unknown extends T[K]
      ? never
      : K
    : K]: T[K];
};

type ExcludeUndefined<T> = {
  [K in keyof T as T[K] extends undefined
    ? undefined extends T[K]
      ? never
      : K
    : K]: T[K];
};

type text = string | number;

declare type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
declare type SetStateArg<T> = React.SetStateAction<T>;

declare type SetStateProps<T> = Required<{
  [K in keyof T as K extends string ? `set${Capitalize<K>}` : never]: SetState<
    T[K]
  >;
}>;

declare type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

declare type PickApiBody<
  T extends keyof paths,
  U extends keyof Omit<paths[T], 'parameters'>,
> = NonNullable<paths[T][U]['requestBody']>['content']['application/json'] &
  paths[T][U]['requestBody']['content']['multipart/form-data'];

type HttpMethods =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace';

type PickAvailableMethods<T extends Partial<Record<HttpMethods, any>>> = {
  [M in HttpMethods]: T[M] extends true ? M : never;
}[HttpMethods] extends infer U
  ? keyof { [M in U extends HttpMethods ? U : never]: true }
  : never;

declare type PickApiData<
  T extends keyof paths,
  U extends keyof Omit<paths[T], 'parameters'>,
> = {
  response: paths[T][U]['responses']['200']['content']['application/json'];
  args: ExcludeUndefined<
    ExcludeUnknown<{
      path: paths[T][U]['parameters']['path'];
      params?: paths[T][U]['parameters']['query'];
      data?: PickApiBody<T, U>;
    }>
  > | null;
};

type td = PickParam<'/medical-centers', 'get'>;
type tp = paths['/medical-centers']['get']['parameters']['query'];
declare namespace NodeJS {
  interface ProcessEnv {
    readonly EXPO_PUBLIC_YANDEX_MAPKIT_KEY: string;
    readonly EXPO_PUBLIC_API_URL: string;
  }
}
