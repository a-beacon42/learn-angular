# Difficulty Rubric

Use this rubric to adjust level after each completed module.

## Metrics

- `question_count`: number of learner clarification questions.
- `hint_count`: number of hints needed to unblock progress.
- `completion_time`: minutes spent on the module.
- `expected_time`: target minutes for the level and module.
- `test_pass_rate`: passing tests divided by total tests (`0.0` to `1.0`).
- `optional_improvements_done`: count of non-required improvements.
- `consecutive_failures`: number of back-to-back failed attempts.

## Suggested expected_time by level

- Level 1: 25 minutes
- Level 2: 35 minutes
- Level 3: 45 minutes
- Level 4: 60 minutes
- Level 5: 75 minutes

## Demotion signals

Trigger each signal independently:

- High support usage:
  `question_count >= 5` OR `hint_count >= 3` OR `(question_count + hint_count) >= 7`
- Repeated failure:
  `consecutive_failures >= 2` OR `test_pass_rate < 0.60`
- Slow completion:
  `completion_time > expected_time * 1.5`

## Promotion signals

Trigger each signal independently:

- Fast completion:
  `completion_time < expected_time * 0.75`
- High pass rate:
  `test_pass_rate >= 0.90`
- Beyond requirements:
  `optional_improvements_done >= 1`

## Level decision policy

1. Count `demotion_signals` and `promotion_signals`.
2. Apply:
- If `demotion_signals > promotion_signals`, set delta to `-1`.
- Else if `promotion_signals > demotion_signals` and `promotion_signals >= 2`, set delta to `+1`.
- Else set delta to `0`.
3. Clamp to `1-5`.
4. Enforce maximum per-module change of `+1` or `-1`.

## Conflict handling

When both promotion and demotion evidence exists in similar strength, keep the level unchanged and target the weakest concepts in the next module.

