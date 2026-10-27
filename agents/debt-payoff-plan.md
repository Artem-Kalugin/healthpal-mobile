# Debt payoff plan

Plan for `architecture-debt.md`, sorted from fast and safe (Tier 1) to long and risky (Tier 4). Items that are not debt live in `not-a-debt.md`. Verify every step with `pnpm lint` and `pnpm exec tsc`. Code changes only with owner approval.

## Tier 1: mechanical, minutes, ~zero risk

1. Typo `//@ts-expect-errors` → `//@ts-expect-error` (`FormTextInput.tsx:66`).
2. `import type { FetchArgs }` in `core/services/Fetch/index.ts` (it is only a type).
3. Remove the IIFE in `core/services/Haptics.ts:51`.
4. `function` → arrow: `FakeSplashScreenOverlay`, `FocusAwareStatusBar`, `core/api/utils.ts`, `screens/Notifications/utils.ts`, `screens/Profile/utils.ts`.
5. Add descriptions to `@ts-expect-error` (~14 places; `Calendar` already has them). Drop the ones where mobile is responsible for the types. Delete the commented-out ones in `store/index.ts:53,58`.
6. Reasons or real types for 4 `any` (`Logger.ts:14`, `modals/Select.tsx:15`, `navigation/Modals/types.tsx:65`, `store/index.ts:45`) and 12 `eslint-disable`.
7. `Doctor/FavoriteButton` and `MedicalCenter/FavoriteButton`: `onPress` as the entry, internal `handle*` called inside.
8. Delete the local empty `navigation/Lists/` (not tracked by git).

## Tier 2: small, isolated

9. Relative `../` between modules → aliases (`#ui-kit/Text`, `#ui-kit/Icon`, `#core/utils`, ...). Many files, mechanical replacement.
10. Broken `tsconfig` aliases (`#utils`, `#components`, `#styles`): remove or fix after checking nobody uses them. Includes `core/utils.tsx` vs the alias expecting a folder with `index`.
11. Optional: rename `usePrefetchApp` → `useAppData` (cosmetic, see `not-a-debt.md`).
12. Move `getSortedMedicalCentersByDistance` from `screens/Map/config.ts` to `utils`, and `getButtonStyle` from `ui-kit/Button/config.tsx` out of `config`.
13. `ui-kit/Image/index.tsx`: move 5 complex types to `types.ts`.
14. `providers/OTPTimer/use-timer.ts` → `hooks/useTimer.ts`, remove its runtime import of the parent `index`.

## Tier 3: refactoring across many files

15. `export default` → named exports (30 files). Every import site changes. Go layer by layer; `store/slices` and `core/api` have the most usages.
16. Flat files → module folders with `index` (`ui-kit`: `Brand`, `Divider`, `Icon`, `Loader`, `Rating`, `StatisticsFact`; `modals`: `DateTimePicker`, `Dialog`, `ImagePicker`, `Select`). Barrels are only proposed to the owner.
17. `ui-kit/Inputs` → lowercase `inputs/`; move `Calendar` (`Day`, `Header`) and `Swiper` (`PaginationDot`, `SlideContainer`) pieces to `components/`; stop children importing parent internals (`./config`, `./utils`).
18. Imports of module internals bypassing `index` → by-name re-export from `index` (`#ui-kit/Calendar/utils`, `#ui-kit/Inputs/MaskedInput`, `#api/Auth/dto/*`, `#api/User/dto/*`, `#api/Doctor/types`, `#services/Permissions/config`, `OTPTimer/use-timer`).
19. Incomplete barrels: `modals/index.ts` lacks `Select`; `screens/index.ts` lacks 8 screens. Needs the barrel decision with the owner.
20. `export *` in 5 barrels (34 lines) → re-export by name. Same decision as item 19.
21. `ui-kit/Swiper/utils.ts` side effects (`withSpring`, `runOnJS`, writes `translation.value`) → hook or `index`. Animation regression risk; needs a manual check on the simulator (only with explicit confirmation).

## Tier 4: architectural decisions, need thinking

22. `ui-kit/Image` reads the token from `#store`: move to `components/infrastructure` or pass the token via props (changes the component API).
23. `domain/Appointment/Card` imports `navigation` and `../Doctor/Item`: `onPress` via props, `renderDoctor` assembled by the screen. Touches the screens that use the card.
24. `core/services → store` at runtime (`Location`, `Token`): write `injectStore` and rework both services. Affects init order.
25. `core/api` domains import each other (`Auth` → `User/types` `TagsUserAPI`): move tags to root `api/types.ts`. Subtle risk with RTK Query cache tags.
26. `store/slices/favoritesAdded.ts`, `favoritesRemoved.ts` import the `#store` barrel: break the cycle.
27. `useErrorHandler` imports `isBEValidationError` from `#api/utils` at runtime: decide where the function lives.

## Separate decisions (no code until decided)

See "Rule questions" in `not-a-debt.md`: `config` → `#generated/schema`, navigation naming vs the skill, capitalized `components/domain` entity folders. Whatever is decided there may add items to this plan.
