type paths = import('../generated/schema').paths;

declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}

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
  args: paths[T][U]['parameters']['path'] extends object
    ? {
        path: paths[T][U]['parameters']['path'];
        params?: paths[T][U]['parameters']['query'];
        data?: PickApiBody<T, U>;
      }
    : paths[T][U]['parameters']['query'] extends object
      ? {
          params?: paths[T][U]['parameters']['query'];
          data?: PickApiBody<T, U>;
        }
      : PickApiBody<T, U> extends object
        ? {
            data?: PickApiBody<T, U>;
          }
        : null;
};

declare namespace NodeJS {
  interface ProcessEnv {
    readonly EXPO_PUBLIC_YANDEX_MAPKIT_KEY: string;
    readonly EXPO_PUBLIC_API_URL: string;
  }
}
