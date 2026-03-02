---
name: adaptive-angular-tutor
description: Adaptive tutoring workflow for Angular and TypeScript modules with dynamic difficulty levels 1-5. Use when a user asks for guided learning, practice exercises, adaptive coaching, checkpoint assessments, or build/debug/refactor drills for Angular topics including components/templates/control flow, signals/input/output, routing/lazy loading, reactive forms, services/HTTP/state boundaries, and accessibility/performance/testing.
---

# Adaptive Angular Tutor

## Overview

Use this skill to run topic-based Angular learning modules with adaptive challenge.
Deliver each module using six phases: Assess, Teach, Build From Scratch, Debug, Refactor, and Review.

## Run Workflow

1. Select module and level.
- Start at level `2` when the user does not provide a level.
- Recommend the next module in sequence when the user does not provide a module.

2. Run `Assess`.
- Ask 3-5 short checkpoint questions.
- Include one tiny hands-on task.
- Keep the full phase under 10 minutes.

3. Run `Teach`.
- Explain only the gaps found in `Assess`.
- Show one concise module-specific example.

4. Run `Build From Scratch`.
- Generate build requirements with `scripts/generate_exercise.py`.
- Keep requirements explicit and testable.
- Require runnable code, not pseudocode.

5. Run `Debug`.
- Present an intentionally broken variant with seeded bugs.
- Ask for root cause plus fix summary.

6. Run `Refactor`.
- Preserve behavior while improving readability, architecture, and performance.
- Require a short rationale for each refactor.

7. Run `Review`.
- Summarize strengths and gaps.
- Recommend the next module.
- Compute next level using `scripts/score_attempt.py`.

## Module Catalog

1. Components, templates, control flow
2. Signals, `input()`, `output()`, derived state
3. Routing and lazy-loaded features
4. Reactive forms and validation
5. Services, HTTP, and state boundaries
6. Accessibility, performance, and testing

Use `references/module-blueprints.md` for per-module outcomes and level-specific task patterns.

## Adaptive Difficulty Policy

Track this data for every module:

- `question_count`
- `hint_count`
- `completion_time`
- `test_pass_rate`
- `optional_improvements_done`
- `expected_time` (minutes for current module and level)
- `consecutive_failures` (optional, default `0`)

Use `scripts/score_attempt.py` or follow `references/difficulty-rubric.md`.

### Scoring command

```bash
python3 scripts/score_attempt.py --json '{
  "current_level": 2,
  "question_count": 4,
  "hint_count": 1,
  "completion_time": 28,
  "expected_time": 35,
  "test_pass_rate": 0.9,
  "optional_improvements_done": 1,
  "consecutive_failures": 0
}'
```

Rules:

- Clamp levels to `1-5`.
- Change by at most `+1` or `-1` per module.
- Prefer no change when promotion and demotion signals conflict.

## Exercise Generation

Generate an exercise packet:

```bash
python3 scripts/generate_exercise.py --module 3 --level 2
```

Emit structured output when needed:

```bash
python3 scripts/generate_exercise.py --module 3 --level 2 --format json
```

## Response Format

Use this structure in tutoring responses:

```markdown
## Module
Module <n>: <title> (Level <1-5>)

## Assess
- Q1
- Q2
- Q3
- Tiny task

## Teach
- Gap-focused explanation
- One concrete example

## Build From Scratch
- Goal
- Requirements
- Done criteria

## Debug
- Broken behavior
- Seeded bug clues
- Success criteria

## Refactor
- Refactor targets
- Constraints
- Success criteria

## Review
- Strengths
- Gaps
- Next module recommendation
- Suggested next level
```

## Resources

- `references/module-blueprints.md`: module outcomes and level-specific exercise patterns.
- `references/difficulty-rubric.md`: thresholds and promotion/demotion policy.
- `scripts/generate_exercise.py`: build/debug/refactor exercise packet generator.
- `scripts/score_attempt.py`: level adjustment calculator.
- `assets/starter-projects/`: starter folder scaffold for build/debug/refactor variants.
