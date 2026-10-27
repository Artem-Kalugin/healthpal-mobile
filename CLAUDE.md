# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

HealthPal: app for booking doctor appointments and browsing medical centers. React Native 0.81 + Expo 54, TypeScript (strict), iOS and Android. Package manager is **pnpm** (enforced by `preinstall`).

## Approval

Do not write or change code without my explicit approval. If you are not sure whether approval was given, ask again.

## Simulator and builds

Never interact with the simulator/emulator or run builds (`pnpm ios*`, `pnpm android*`, `expo run`, `xcodebuild`, `gradlew`, etc.) without my explicit confirmation.

## Architecture

Code structure and dependency rules live in skills: read `architecture-unit` (module shape) and `architecture-layers` (layer imports, barrels) before creating or moving files or adding cross-module imports. Known deviations: `agents/architecture-debt.md`.

## Agent docs

`agents/` holds documentation for the agent about current statuses and plans. Explore if user references.

## Commands

- Verify changes with `pnpm lint` and `pnpm exec tsc` (the pre-commit hook runs both).
- `pnpm script:fetch-types` — regenerate `generated/` from the backend OpenAPI doc. Run after BE contract changes.
- `pnpm exec plop` — generators for adding icons/images (inject via `/* PLOP_INJECT_* */` markers); prefer over hand-editing.
- Native changes (deps, `app.config.ts`/`app.json`, env vars) need `pnpm ios:new` / `pnpm android:new`; JS changes don't.
- Commits follow conventional commits (commitlint).
- Tests are jest (`jest-expo`), colocated as `*.test.ts(x)`; run with `pnpm test`.

## Code style

Follow the surrounding code; the patterns below are the ones to keep. Existing deviations are listed in `agents/architecture-debt.md` — don't copy them.

- Branch on a variant with a lookup map (`ButtonSizeStyles[size]`), not an if/else chain or `switch` over an enum/union.
- Arrow functions everywhere outside classes (classes are for `core/services` and class-validator DTOs in `core/api/*/dto`). No IIFE.
- `function` only for generics (`<T,>` is awkward in `.tsx`) and named inner providers. Elsewhere don't write it; suggest it only if an arrow loses functionality.
- Named exports only; `export default` just where a tool requires it (`*.config.*`).
- Barrels re-export by name (`export { Button } from './Button'`); existing `export *` barrels are debt, don't repeat them.
- Barrels are never created by AI, only proposed. 1 barrel per architecture layer (exception: module namespaces, owner approval first).
- `async`/`await` over `.then`; early returns over nesting.
- Handlers: `on*` for the user-triggered event entry point, `handle*` for internal handlers and non-entries. `<Button onPress={onSubmit}>`, not `<Button onPress={handleSubmitRequest}>`; `handleSubmitRequest` is called inside `onSubmit`.
- Don't add `useCallback`, `useMemo` or `React.memo` by default and never "just in case". If memoization is needed for correctness (stable dependency, list `renderItem`, a measured hot spot), propose it with the reason and let the owner decide. React Compiler is not enabled.
- `react-hooks/exhaustive-deps` is off on purpose (known compromise); the planned fix is `useEffectEvent`. Keep dependency arrays correct by hand.
- No `any`, `@ts-ignore` or `eslint-disable` in new code without a stated reason.
- `@ts-expect-error` is allowed only with a description, and only when mobile is not responsible for the code (e.g. backend missed a contract for an entity, a library does not provide its types).

## Conventions and tooling

- `/ios` and `/android` are generated prebuild artifacts (gitignored): never edit them. Native config lives in `app.config.ts` (dynamic, overrides `app.json`) and `expo-config-plugins/`.
- State: `runtime` slice is not persisted; Redux serializable/immutable checks are disabled.
- Forms go through `useAppForm`. SVGs are imported as components (icons (svgs with fixed small size) only as `Icon` component).
- `patches/` holds patch-package patches applied on `postinstall`.
