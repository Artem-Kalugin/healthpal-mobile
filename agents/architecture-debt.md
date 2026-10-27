# Architecture debt

Known deviations from the rules in `CLAUDE.md`. Do not copy these patterns into new code. Counts come from a grep pass over `src/` and are approximate.

Not covered here: `export *` barrels per layer and the "one barrel per layer" rule (to be reviewed together with `architecture-layers`). Memoization in existing code is accepted (the rule applies to the agent only).

## Exports

- **`export default`**: 30 files. `components/infrastructure` (~6, some as `export default React.memo(X)`), `core/hooks` (5), `store/slices` (5), `core/api/*` (5), `core/services` (2), `ui-kit/Swiper` (3), `ui-kit/ButtonGoBack`, `modals`, `navigation`, `navigation/Modals`, `providers/Toaster`. Target: named exports.
- **`export *` in barrels**: `config/index.ts`, `modals/index.ts`, `screens/index.ts`, `ui-kit/index.tsx`, `core/services/Fetch/interceptors/index.ts` (34 `export *` lines). Target: re-export by name.

## Typing and lint suppressions

- **`@ts-expect-error` without description**: ~17 places in source (`FormTextInput`, `OTPTimer`, `core/api/index.ts`, `useErrorHandler`, `Location`, `DoctorDetails`, `ProfileEditing`, `Search`, `store/index.ts`, `ui-kit/Button`), ~10 more in tests. Typo `//@ts-expect-errors` in `FormTextInput.tsx:66`. Target: a description on each, and drop the ones where mobile is responsible for the types.
- **`any` without a stated reason**: `core/services/Logger.ts:14`, `modals/Select.tsx:15`, `navigation/Modals/types.tsx:65`, `store/index.ts:45` (+1 in a test).
- **`eslint-disable` without explanation**: 12 places (e.g. `ui-kit/Button` `react-native/no-unused-styles`, `FakeSplashScreenOverlay`, `ModalWrapper`).

## Functions

- **`function` outside generics**: `FakeSplashScreenOverlay.tsx:33`, `FocusAwareStatusBar.tsx:6`, `core/api/utils.ts`, `screens/Notifications/utils.ts`, `screens/Profile/utils.ts`. (`FormTextInput<T>` is a legitimate generic.) Target: arrow functions.
- **IIFE**: `core/services/Haptics.ts:51` — `(async () => HapticsExpo.selectionAsync())()`, the wrapper adds nothing.

## Handlers

- **`handle*` passed as a prop**: `components/domain/Doctor/FavoriteButton.tsx` and `components/domain/MedicalCenter/FavoriteButton.tsx` use `onPress={handlePress}`. Target: `onPress` entry that calls an internal `handle*`.
- **`on*` / `handle*` split barely used**: ~26 `const on*` vs 2 `const handle*`; ~68 inline lambdas in `on*` props. Not a violation by itself, but the `on*` entry → `handle*` internals scheme is not followed.

## Module shape (`architecture-unit`)

- **Flat files at a layer root instead of module folders**: `ui-kit` (`Brand`, `Divider`, `Icon`, `Loader`, `Rating`, `StatisticsFact`), `modals` (`DateTimePicker`, `Dialog`, `ImagePicker`, `Select`). Target: a folder with `index` per module.
- **Arbitrary files next to `index` instead of `components/`**: `ui-kit/Calendar` (`Day`, `Header`), `ui-kit/Swiper` (`PaginationDot`, `SlideContainer`), `providers/OTPTimer/use-timer.ts` (a hook outside `hooks/`, kebab-case file name).
- **`ui-kit/Inputs`**: capitalized folder without `index`, holds four sibling modules (`TextInput`, `MaskedInput`, `InputLabel`, `InputErrorBlock`). Target: lowercase category `inputs/` with modules inside.
- **Child imports its parent's internals**: `Calendar/Day`, `Calendar/Header` → `./config`; `Swiper/PaginationDot`, `Swiper/SlideContainer` → `./utils`; `OTPTimer/use-timer.ts` → `.` (runtime import of the parent's `index`).
- **Relative imports between modules**: `../Icon`, `../Text` in `ui-kit/Calendar` and `ui-kit/Inputs/*`. Target: `#ui-kit/Icon`, `#ui-kit/Text`.
- **Logic in `config`**: `screens/Map/config.ts` (`getSortedMedicalCentersByDistance` is a top-level function, belongs in `utils`), `ui-kit/Button/config.tsx` (`getButtonStyle` standalone function).
- **Side effects in `utils`**: `ui-kit/Swiper/utils.ts` (`withSpring`, `runOnJS`, writes `translation.value`). Target: a hook or `index`.
- **More than 2 complex types in `index`**: `ui-kit/Image/index.tsx` (5). Target: `types.ts`.

## Layer order (`architecture-layers`)

- **`core/services` → `store` at runtime** (allowed: `injectStore` and type-only): `Location/index.ts` imports `store` and `AppActions` and calls `getState` / `dispatch`; `Token/index.ts` imports `RuntimeActions` from `#store/slices/runtime`. `injectStore` does not exist in the code yet.
- **`core/services` → `api` at runtime**: `Fetch/index.ts` imports `FetchArgs` from `#api/types` without `import type` (add `type` if it is only a type).
- **`ui-kit` → `store`**: `ui-kit/Image/index.tsx` reads the token via `useSelector` from `#store`. Target: move to `components/infrastructure` or pass the token through props.
- **`components/domain` → `navigation`**: `domain/Appointment/Card.tsx` imports `#navigation/Main/types`, `#navigation/types` and calls `navigate`. Target: `onPress` through props, the screen navigates.
- **Import between `domain` entities**: `domain/Appointment/Card.tsx` → `../Doctor/Item` (also a relative path out of the module). Target: render function (`renderDoctor`) assembled by the screen.
- **`core/api` domains import each other**: `api/Auth/index.ts` imports `TagsUserAPI` (enum, runtime) from `#api/User/types`. Target: tags in the root `api/types.ts`.
- **`core/hooks` → `api` at runtime**: `usePrefetchApp.ts` imports `DoctorAPI`, `MedicalCentersAPI`, `OnboardingAPI`, `UserAPI`. Target: rename to `useAppData` (a lifecycle hook, the allowed exception). `useErrorHandler.ts` imports the function `isBEValidationError` from `#api/utils`.

## Imports and barrels (`architecture-layers`)

- **Relative `../` between modules instead of aliases**: `../../core/utils` in `screens/Map`, `Search`, `ProfileEditing`, `SignUp`; `../utils` in `core/api/index.ts`, `hooks/useModalState.ts`, `hooks/usePrefetchApp.ts`; `store/slices/index.ts` → `../../core/api/index`; `services/Location` → `../Permissions`, `../Permissions/config`; `services/Token` → `../Logger`; in `ui-kit` also `Button/config.tsx`, `Checkbox`, `CodeInput`, `Tag` (`../Text`, `../Icon`, `../Loader`).
- **Broken `tsconfig` aliases**: `#utils` points to `src/core/utils/index` (the real file is `core/utils.tsx`, nobody uses the alias); `#components` points to a missing `src/components/index`; `#styles` points to a missing `src/styles`.
- **`store/slices/favoritesAdded.ts`, `favoritesRemoved.ts` import the `#store` barrel**: allowed only because `store` and `core/api` are one layer, but a slice knowing the store root is a cycle.
- **Imports of module internals (not via `index`)**: `#ui-kit/Calendar/utils` (`screens/ScheduleAppointment`), `#ui-kit/Inputs/MaskedInput` (`infrastructure/FormTextInput`), `#components/infrastructure/providers/OTPTimer/use-timer` (`PasswordRecoveryPhoneInput`, `PasswordRecoveryCodeInput`), `#api/Auth/dto/*`, `#api/User/dto/*`, `#api/Doctor/types` from `screens`, `#services/Permissions/config` (`modals/ImagePicker`). Direct imports of a module's `utils` are debt: target is a by-name re-export from the module `index` (`export { toDateString } from './utils'`).
- **Incomplete barrels**: `modals/index.ts` lacks `Select` (`navigation/Modals` imports `#modals/Select`); `screens/index.ts` lacks `DoctorDetails`, `Notifications`, `ScheduleAppointment`, `Search`, `Favorites`, `Home`, `Map`, `Appointments` (`navigation` imports them by path). The barrel must list every module.
- **`config` imports `#generated/schema`**: `config/colors.ts`, `config/locale.ts`. By the skill `config` knows only `assets`; decide whether to move the types or relax the rule.

## Structure and naming vs the skill

Direction: the code is aligned to the skills (donor structure); what the project does not have is removed from the skills' scope, not invented. To be decided in a separate session.

- **Navigation naming**: code has `Main`, `Main/Tab`, `Main/Favorites`, `Main/Tab/Appointments`, `PasswordRecovery`; the skill has `Tabs/Home`. Target: rename the code to the skill.
- **`components/domain` entity folders are capitalized** (`Appointment`, `Doctor`, `DoctorsCategory`, `MedicalCenter`, `Notification`, `Review`); the skill requires kebab-case backend entities. Check `generated/__entities.ts` whether `DoctorsCategory` and `Notification` are separate backend entities.
- **Empty folder** `navigation/Lists/`. Target: delete.
- **`core/utils`**: a single file `utils.tsx` while the alias expects a folder with `index` (see broken aliases).

## Approved deviations

- **`ui-kit/inputs`: `TextInput` and `MaskedInput` import `InputLabel` and `InputErrorBlock`** (sibling imports). Owner decision: these two pieces belong to the inputs domain, so they stay in `inputs/` instead of moving to a shared layer.
