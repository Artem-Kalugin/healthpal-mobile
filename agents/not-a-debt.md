# Not a debt

Items that looked like tech debt (or were listed in `architecture-debt.md`) but are not. Do not re-add them there. Each entry says why.

## Allowed exceptions

- **`function` for `FormTextInput<T>`**: a legitimate generic. `function` is allowed for generics (`<T,>` is awkward in `.tsx`).
- **`core/hooks/usePrefetchApp.ts` imports `core/api` at runtime**: a lifecycle hook is the allowed exception in `architecture-layers`. Only a cosmetic rename to `useAppData` is optional (see `debt-payoff-plan.md`). `useErrorHandler` importing `isBEValidationError` is still debt.
- **Memoization in existing code**: accepted, the rule applies to the agent only.

## Observations, not violations

- **`on*` / `handle*` split barely used** (~26 `const on*` vs 2 `const handle*`, ~68 inline lambdas in `on*` props): not a violation by itself. The only real violation is `handle*` passed as a prop in the two `FavoriteButton` files, which stays in `architecture-debt.md`.

## Owner decisions

- **`ui-kit/inputs`: `TextInput` and `MaskedInput` import `InputLabel` and `InputErrorBlock`** (sibling imports). Owner decision: these two pieces belong to the inputs domain, so they stay in `inputs/` instead of moving to a shared layer.

## Not tracked in git

- **Empty folder `navigation/Lists/`**: git does not store empty folders (`git ls-files src/navigation/Lists` is empty), so it is not in the repository. Local leftover, delete locally.

## Rule questions, not code debt

Decide the rule first; code changes only follow from the decision.

- **`config` imports `#generated/schema`** (`config/colors.ts`, `config/locale.ts`): the use is runtime enums (`Gender.FEMALE`, etc.). By the skill `config` knows only `assets`; decide whether to relax the rule or move the types.
- **Navigation naming**: code has `Main`, `Main/Tab`, `Main/Favorites`, `Main/Tab/Appointments`, `PasswordRecovery`; the skill has `Tabs/Home`. Direction: code is aligned to the skills, what the project does not have is removed from the skills' scope. To be decided in a separate session.
- **`components/domain` entity folders are capitalized** (`Appointment`, `Doctor`, `DoctorsCategory`, `MedicalCenter`, `Notification`, `Review`); the skill requires kebab-case backend entities. Check `generated/__entities.ts` whether `DoctorsCategory` and `Notification` are separate backend entities. Same session as above.

## To confirm before treating as debt

- **`@ts-expect-error` in tests** (~10): probably outside the scope of the rule (mobile is not responsible for test typings). Confirm with the owner.
- **`Fetch/index.ts` `FetchArgs` import**: a type-only import from `#api/types`. A missing `import type`, not a layer violation (fixed in Tier 1 of the plan).
