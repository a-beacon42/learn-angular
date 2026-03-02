#!/usr/bin/env python3
"""Compute next difficulty level for adaptive Angular tutoring modules."""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass, asdict
from typing import Any, Dict

MIN_LEVEL = 1
MAX_LEVEL = 5
DEFAULT_EXPECTED_TIME = {
    1: 25.0,
    2: 35.0,
    3: 45.0,
    4: 60.0,
    5: 75.0,
}


@dataclass
class AttemptMetrics:
    current_level: int
    question_count: int
    hint_count: int
    completion_time: float
    expected_time: float
    test_pass_rate: float
    optional_improvements_done: int
    consecutive_failures: int = 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Compute next adaptive tutoring level from attempt metrics."
    )
    parser.add_argument(
        "--json",
        dest="json_payload",
        help="JSON object payload with attempt metrics.",
    )
    parser.add_argument(
        "--file",
        help="Path to a JSON file with attempt metrics.",
    )
    return parser.parse_args()


def read_payload(args: argparse.Namespace) -> Dict[str, Any]:
    if args.json_payload:
        return json.loads(args.json_payload)

    if args.file:
        with open(args.file, "r", encoding="utf-8") as handle:
            return json.load(handle)

    if not sys.stdin.isatty():
        raw = sys.stdin.read().strip()
        if raw:
            return json.loads(raw)

    raise ValueError(
        "Missing metrics payload. Provide --json, --file, or pipe JSON on stdin."
    )


def to_int(payload: Dict[str, Any], key: str, default: Any = None) -> int:
    value = payload.get(key, default)
    if value is None:
        raise ValueError(f"Missing required field: {key}")
    return int(value)


def to_float(payload: Dict[str, Any], key: str, default: Any = None) -> float:
    value = payload.get(key, default)
    if value is None:
        raise ValueError(f"Missing required field: {key}")
    return float(value)


def parse_metrics(payload: Dict[str, Any]) -> AttemptMetrics:
    current_level = to_int(payload, "current_level")
    if current_level < MIN_LEVEL or current_level > MAX_LEVEL:
        raise ValueError("current_level must be between 1 and 5")

    question_count = to_int(payload, "question_count")
    hint_count = to_int(payload, "hint_count")
    completion_time = to_float(payload, "completion_time")
    test_pass_rate = to_float(payload, "test_pass_rate")
    optional_improvements_done = to_int(payload, "optional_improvements_done")
    consecutive_failures = to_int(payload, "consecutive_failures", 0)

    if question_count < 0 or hint_count < 0 or optional_improvements_done < 0:
        raise ValueError("Counts must be non-negative values")
    if completion_time <= 0:
        raise ValueError("completion_time must be greater than 0")
    if not 0.0 <= test_pass_rate <= 1.0:
        raise ValueError("test_pass_rate must be between 0.0 and 1.0")
    if consecutive_failures < 0:
        raise ValueError("consecutive_failures must be non-negative")

    expected_time = to_float(
        payload,
        "expected_time",
        DEFAULT_EXPECTED_TIME[current_level],
    )
    if expected_time <= 0:
        raise ValueError("expected_time must be greater than 0")

    return AttemptMetrics(
        current_level=current_level,
        question_count=question_count,
        hint_count=hint_count,
        completion_time=completion_time,
        expected_time=expected_time,
        test_pass_rate=test_pass_rate,
        optional_improvements_done=optional_improvements_done,
        consecutive_failures=consecutive_failures,
    )


def compute_level_change(metrics: AttemptMetrics) -> Dict[str, Any]:
    demotion_signals = []
    promotion_signals = []

    if (
        metrics.question_count >= 5
        or metrics.hint_count >= 3
        or (metrics.question_count + metrics.hint_count) >= 7
    ):
        demotion_signals.append("high_question_or_hint_usage")

    if metrics.consecutive_failures >= 2 or metrics.test_pass_rate < 0.60:
        demotion_signals.append("repeated_failure_or_low_pass_rate")

    if metrics.completion_time > (metrics.expected_time * 1.5):
        demotion_signals.append("slow_completion")

    if metrics.completion_time < (metrics.expected_time * 0.75):
        promotion_signals.append("fast_completion")

    if metrics.test_pass_rate >= 0.90:
        promotion_signals.append("high_pass_rate")

    if metrics.optional_improvements_done >= 1:
        promotion_signals.append("optional_improvements")

    demotion_count = len(demotion_signals)
    promotion_count = len(promotion_signals)

    if demotion_count > promotion_count:
        delta = -1
        decision = "demote"
    elif promotion_count > demotion_count and promotion_count >= 2:
        delta = 1
        decision = "promote"
    else:
        delta = 0
        decision = "hold"

    next_level = max(MIN_LEVEL, min(MAX_LEVEL, metrics.current_level + delta))

    # Keep the contract explicit: never move more than one level per module.
    if next_level > metrics.current_level + 1:
        next_level = metrics.current_level + 1
    if next_level < metrics.current_level - 1:
        next_level = metrics.current_level - 1

    return {
        "current_level": metrics.current_level,
        "next_level": next_level,
        "delta": next_level - metrics.current_level,
        "decision": decision,
        "demotion_signals": demotion_signals,
        "promotion_signals": promotion_signals,
        "metrics": asdict(metrics),
    }


def main() -> int:
    args = parse_args()
    try:
        payload = read_payload(args)
        metrics = parse_metrics(payload)
        result = compute_level_change(metrics)
    except Exception as exc:  # pragma: no cover - defensive CLI handling
        print(f"error: {exc}", file=sys.stderr)
        return 1

    print(json.dumps(result, indent=2, sort_keys=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

