# Adaptive Angular Tutor Workspace

This repository contains the `adaptive-angular-tutor` skill scaffold and starter assets used for guided Angular tutoring modules.

## What This Tool Is

`adaptive-angular-tutor` is a reusable skill that helps run Angular learning modules with adaptive difficulty.

It is organized around six module phases:
1. Assess
2. Teach
3. Build From Scratch
4. Debug
5. Refactor
6. Review

Difficulty adjusts from level `1` to `5` using learner metrics.

## Project Layout

- `skills/adaptive-angular-tutor/SKILL.md`: operational instructions for the tutor skill
- `skills/adaptive-angular-tutor/references/`: rubric + module blueprints
- `skills/adaptive-angular-tutor/scripts/generate_exercise.py`: produces build/debug/refactor exercise packets
- `skills/adaptive-angular-tutor/scripts/score_attempt.py`: computes next difficulty level
- `skills/adaptive-angular-tutor/assets/starter-projects/`: module starter templates

## How To Use

### 1. Generate an exercise packet

```bash
cd /Users/alexbeacon/Desktop/code-projects/learn-angular/tutorial-2/skills/adaptive-angular-tutor
python3 scripts/generate_exercise.py --module 3 --level 2
```

JSON output:

```bash
python3 scripts/generate_exercise.py --module 3 --level 2 --format json
```

Accepted `--module` values:
- numeric id (`1`..`6`)
- module slug (example: `routing-lazy-loaded-features`)
- title fragment (example: `routing`)

### 2. Pick starter variant

Go to the generated module folder in `assets/starter-projects` and choose a variant:
- `build-starter`: implement feature requirements
- `debug-broken`: fix seeded defects
- `refactor-baseline`: improve structure/performance without behavior changes

Example:

```bash
cd assets/starter-projects/module-3-routing/debug-broken
```

Each variant includes:
- `README.md`: context and key files
- `TASKS.md`: completion checklist
- module-specific Angular source under `src/app`

### 3. Score learner attempt and adapt level

```bash
python3 scripts/score_attempt.py --json '{
  "current_level": 2,
  "question_count": 4,
  "hint_count": 1,
  "completion_time": 35,
  "expected_time": 35,
  "test_pass_rate": 0.85,
  "optional_improvements_done": 0,
  "consecutive_failures": 0
}'
```

The script returns:
- `next_level`
- `decision` (`promote`, `hold`, or `demote`)
- triggered promotion/demotion signals

## Module Starter Notes

- Modules `1`, `2`, and `6` use a lightweight single-component exercise scaffold.
- Modules `3`, `4`, and `5` use dedicated structures:
  - Module 3: route trees + lazy-loaded feature files
  - Module 4: reactive form + validator files
  - Module 5: API/store/model boundaries

## Typical Tutor Loop

1. Generate packet (`generate_exercise.py`)
2. Run learner through chosen variant
3. Collect metrics (questions, hints, time, pass rate, improvements)
4. Score attempt (`score_attempt.py`)
5. Pick next module and level

## Validation

Syntax checks for scripts:

```bash
python3 -m py_compile scripts/generate_exercise.py scripts/score_attempt.py
```

If `quick_validate.py` is available in your environment, run it against the skill folder.
