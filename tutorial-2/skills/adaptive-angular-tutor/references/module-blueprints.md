# Module Blueprints

## Table of Contents

1. Level Patterns
2. Module 1: Components, templates, control flow
3. Module 2: Signals, input, output, derived state
4. Module 3: Routing and lazy-loaded features
5. Module 4: Reactive forms and validation
6. Module 5: Services, HTTP, and state boundaries
7. Module 6: Accessibility, performance, and testing

## Level Patterns

Use these patterns across all modules:

- Level 1:
  Guided prompts, small scope, 1-2 files touched, 2 seeded bugs, 2 refactor targets.
- Level 2:
  Moderate scaffolding, 2-4 files touched, 3 seeded bugs, 3 refactor targets.
- Level 3:
  Reduced scaffolding, feature-level scope, 4 seeded bugs, 4 refactor targets.
- Level 4:
  Open-ended constraints, integration scope, 5 seeded bugs, 5 refactor targets.
- Level 5:
  Minimal scaffolding, architecture ownership, 6 seeded bugs, 6 refactor targets.

## Module 1: Components, templates, control flow

Learning outcomes:

- Render collections with modern Angular control flow syntax.
- Structure parent and child component boundaries.
- Keep template state predictable and maintainable.

Build focus by level:

- L1: Single component with hardcoded data and `@if` empty state.
- L2: Extract reusable card with `input()`.
- L3: Add filters with derived view-model state.
- L4: Add interaction events with `output()` and persisted UI state.
- L5: Add keyboard-first interaction and render optimization guards.

Debug seed areas:

- Incorrect `@for` tracking expression.
- Shared boolean causing all rows to expand.
- Child component mutating input data.
- Event payload shape mismatch between child and parent.
- Missing null-safe template access.

Refactor targets:

- Remove duplicated template branches.
- Clarify state ownership names.
- Replace ad-hoc conditionals with focused computed state.

## Module 2: Signals, input, output, derived state

Learning outcomes:

- Model local state with signals and computed values.
- Drive parent-child communication using `input()` and `output()`.
- Avoid unnecessary recomputation in reactive updates.

Build focus by level:

- L1: Counter and filter signals in one component.
- L2: Split stateful parent and presentational child components.
- L3: Compose multiple computed signals with dependency discipline.
- L4: Coordinate sibling updates through shared state service boundary.
- L5: Add optimistic updates and rollback behavior for failed writes.

Debug seed areas:

- Writing to computed signal.
- Derivation closes over stale values.
- Event emission outside expected transaction boundary.
- Signal update loop from coupled effects.
- Parent mutation races with child output handling.

Refactor targets:

- Isolate read/write signal APIs.
- Normalize event payload contracts.
- Collapse duplicate derivations into reusable computed helpers.

## Module 3: Routing and lazy-loaded features

Learning outcomes:

- Configure route trees with standalone components.
- Lazy-load features and protect routes.
- Keep route state and feature state aligned.

Build focus by level:

- L1: Two-route app with default redirect.
- L2: Add feature lazy loading and simple guard.
- L3: Add nested routes and route params.
- L4: Add preloading strategy and route-level data resolvers.
- L5: Add advanced navigation recovery for failed lazy chunks.

Debug seed areas:

- Relative navigation path built incorrectly.
- Guard returns wrong async type.
- Lazy route path typo causes chunk load failures.
- Resolver blocks navigation because stream never completes.
- Route param is parsed as string and breaks numeric logic.

Refactor targets:

- Centralize route constants.
- Replace duplicated guard logic with composable policy functions.
- Separate navigation side effects from view rendering.

## Module 4: Reactive forms and validation

Learning outcomes:

- Build form models with nested groups and arrays.
- Implement synchronous and asynchronous validation.
- Display stable, accessible validation feedback.

Build focus by level:

- L1: Basic `FormGroup` with required validators.
- L2: Add custom validator and validation message map.
- L3: Add `FormArray` and async uniqueness checks.
- L4: Add dynamic sections with conditional validators.
- L5: Add autosave with dirty tracking and conflict prompts.

Debug seed areas:

- Validator returns wrong error shape.
- Async validator leaks subscriptions.
- Form control disabled state desynchronizes with template.
- Error message mapping misses nested control paths.
- Submit button enabled when pending async validation exists.

Refactor targets:

- Extract validator utilities.
- Consolidate form setup factory functions.
- Minimize template branching for error display.

## Module 5: Services, HTTP, and state boundaries

Learning outcomes:

- Organize state and effects around service boundaries.
- Handle HTTP errors, retries, and cancellation.
- Keep UI state decoupled from transport details.

Build focus by level:

- L1: Service returning mock observable data.
- L2: HTTP integration with loading and error states.
- L3: Add cache policy and invalidation triggers.
- L4: Add optimistic writes with rollback and retries.
- L5: Add state boundary tests for partial failure scenarios.

Debug seed areas:

- Missing unsubscribe or cancellation in inflight requests.
- Service leaks transport DTO shape into UI.
- Retry loop retries non-idempotent writes.
- Error handler swallows failure and reports success.
- Race condition between refresh and optimistic updates.

Refactor targets:

- Separate API client layer from view-model service.
- Introduce explicit state machine for request lifecycle.
- Remove duplicated network error formatting.

## Module 6: Accessibility, performance, and testing

Learning outcomes:

- Apply semantic markup and keyboard accessibility.
- Profile and reduce unnecessary rendering work.
- Build focused unit and integration tests for confidence.

Build focus by level:

- L1: Keyboard operable component with labels and roles.
- L2: Add performance baseline checks and basic tests.
- L3: Add targeted change-detection optimization and harness tests.
- L4: Add performance budgets and regression test gates.
- L5: Add accessibility audit script plus critical path test suite.

Debug seed areas:

- Interactive element not reachable via keyboard order.
- ARIA attribute conflicts with native semantics.
- Expensive template function called every detection cycle.
- Test setup depends on timing and flakes intermittently.
- Performance assertion misses slow path from list updates.

Refactor targets:

- Replace ambiguous div/button hybrids with semantic elements.
- Convert brittle tests into deterministic harness interactions.
- Move heavy formatting from template to memoized computations.

