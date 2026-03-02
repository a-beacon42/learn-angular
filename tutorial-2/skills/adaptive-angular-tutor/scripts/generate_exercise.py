#!/usr/bin/env python3
"""Generate adaptive Angular tutoring exercise packets."""

from __future__ import annotations

import argparse
import json
import sys
from typing import Any, Dict, List, Tuple

LEVEL_PROFILES: Dict[int, Dict[str, Any]] = {
    1: {
        "label": "Guided",
        "question_count": 3,
        "debug_bug_count": 2,
        "refactor_target_count": 2,
        "expected_time": 25,
    },
    2: {
        "label": "Supported",
        "question_count": 4,
        "debug_bug_count": 3,
        "refactor_target_count": 3,
        "expected_time": 35,
    },
    3: {
        "label": "Applied",
        "question_count": 4,
        "debug_bug_count": 4,
        "refactor_target_count": 4,
        "expected_time": 45,
    },
    4: {
        "label": "Advanced",
        "question_count": 5,
        "debug_bug_count": 5,
        "refactor_target_count": 5,
        "expected_time": 60,
    },
    5: {
        "label": "Expert",
        "question_count": 5,
        "debug_bug_count": 6,
        "refactor_target_count": 6,
        "expected_time": 75,
    },
}

MODULES: Dict[int, Dict[str, Any]] = {
    1: {
        "slug": "components-templates-control-flow",
        "title": "Components, templates, control flow",
        "assess_questions": [
            "What problem does a stable track expression solve in @for loops?",
            "When should template branching stay in the parent component versus a child component?",
            "How do @if and @switch improve readability compared with deeply nested ternaries?",
            "What data shape should a reusable RecipeCard receive through input()?",
            "Which template mistakes usually cause full-list rerenders?",
        ],
        "tiny_task": (
            "Create a standalone component that renders a recipe title list and "
            "toggles details with @if."
        ),
        "teach_focus": (
            "Render from explicit state and keep component boundaries clear between "
            "data orchestration and display."
        ),
        "teach_example": (
            "Use a selectedCategory signal and a computed filteredRecipes signal, "
            "then render with @for (recipe of filteredRecipes(); track recipe.id)."
        ),
        "build_goal": "Build a recipe explorer with filterable cards and detail panes.",
        "build_requirements": [
            "Render recipe cards with @for and stable tracking.",
            "Show loading and empty states with @if/@else blocks.",
        ],
        "build_level_addons": {
            1: "Keep all logic in one component with hardcoded data.",
            2: "Extract RecipeCard as child component with input() contract.",
            3: "Add category and text filters with derived state.",
            4: "Add card actions via output() and preserve UI state on refresh.",
            5: "Add keyboard navigation and protect against unnecessary rerenders.",
        },
        "debug_scenario": (
            "A migration to modern template control flow introduced inconsistent "
            "rendering behavior."
        ),
        "debug_bugs": [
            "Track by index resets card expansion state after filtering.",
            "A shared boolean opens every card at once.",
            "Child component mutates an input object in place.",
            "Filter updates trigger expensive recompute on each key stroke.",
            "Template reads a nullable field without safe access.",
            "Event payload type no longer matches the parent handler contract.",
        ],
        "refactor_targets": [
            "Extract view-model shaping into computed state helpers.",
            "Rename ambiguous booleans to intent-revealing names.",
            "Remove duplicated conditional template fragments.",
            "Move display-only conditionals to presentational components.",
            "Reduce repeated map/filter operations in render paths.",
            "Document state ownership between parent and child components.",
        ],
        "starter_key": "module-1-components",
    },
    2: {
        "slug": "signals-input-output-derived-state",
        "title": "Signals, input(), output(), derived state",
        "assess_questions": [
            "What is the difference between writable signals and computed signals?",
            "How do input() and output() help keep parent-child contracts explicit?",
            "Which signal anti-patterns usually cause update loops?",
            "When should derived state live in computed() versus imperative code?",
            "What contract should an output event payload include?",
        ],
        "tiny_task": (
            "Build a small panel with one writable signal and one computed summary."
        ),
        "teach_focus": (
            "Model state as single sources of truth and derive read-only projections."
        ),
        "teach_example": (
            "Store selectedIds in a writable signal and expose selectedCount via "
            "computed(() => selectedIds().length)."
        ),
        "build_goal": "Build a preference dashboard with parent-child signal contracts.",
        "build_requirements": [
            "Use writable signals for editable state and computed for derived values.",
            "Wire parent-child communication with input() and output().",
        ],
        "build_level_addons": {
            1: "Implement in one feature component with two derived values.",
            2: "Split parent coordinator and presentational child panel.",
            3: "Coordinate multiple computed values and event fan-in.",
            4: "Introduce a shared local store service boundary for siblings.",
            5: "Add optimistic updates with rollback when simulated saves fail.",
        },
        "debug_scenario": (
            "A new state layer caused stale data and event timing issues across "
            "components."
        ),
        "debug_bugs": [
            "Code attempts to write directly to a computed signal.",
            "Derived signal closes over stale external mutable state.",
            "Event emission happens before parent state commit.",
            "Coupled effects cause recursive updates.",
            "Parent and child mutate the same object instance.",
            "Output payload omits field needed by parent reducer.",
        ],
        "refactor_targets": [
            "Encapsulate writable signals behind methods.",
            "Normalize output payload typing and event naming.",
            "Replace duplicated computed logic with reusable selectors.",
            "Reduce cross-component mutation paths.",
            "Move persistence side effects out of component classes.",
            "Document read/write boundaries for each signal.",
        ],
        "starter_key": "module-2-signals",
    },
    3: {
        "slug": "routing-lazy-loaded-features",
        "title": "Routing and lazy-loaded features",
        "assess_questions": [
            "How do lazy routes change bundle loading behavior?",
            "When should a guard block navigation versus reroute?",
            "What route config patterns keep nested routes maintainable?",
            "How should route params be validated before use?",
            "Where should resolver responsibilities end?",
        ],
        "tiny_task": "Add two routes and a default redirect in a standalone app.",
        "teach_focus": (
            "Treat the route tree as feature composition and isolate navigation "
            "policies from rendering."
        ),
        "teach_example": (
            "Use loadChildren for feature routes and co-locate guards/resolvers "
            "with the lazy feature."
        ),
        "build_goal": "Build a multi-feature app with lazy loading and guarded routes.",
        "build_requirements": [
            "Create route tree with at least one lazy-loaded feature.",
            "Add route-level protection and parameter validation.",
        ],
        "build_level_addons": {
            1: "Use two routes, redirect, and one route param.",
            2: "Add one lazy feature and a basic auth guard.",
            3: "Add nested child routes and route data handling.",
            4: "Add resolver-based data prefetch and preload strategy.",
            5: "Add failure recovery for lazy chunk errors and retry flow.",
        },
        "debug_scenario": (
            "Navigation appears flaky after route tree reorganization and lazy "
            "feature extraction."
        ),
        "debug_bugs": [
            "Relative navigation path resolves to the wrong segment.",
            "Guard returns the wrong async type and silently passes.",
            "Lazy route path typo breaks chunk loading.",
            "Resolver stream never completes and blocks navigation.",
            "Route param is treated as number without parsing.",
            "Redirect route ordering causes unreachable route branches.",
        ],
        "refactor_targets": [
            "Centralize route constants and link generation helpers.",
            "Extract guard policy into small reusable functions.",
            "Move route parsing to dedicated adapter utilities.",
            "Simplify nested outlet templates.",
            "Reduce duplicate resolver fetch logic.",
            "Add clear error-state navigation UX.",
        ],
        "starter_key": "module-3-routing",
    },
    4: {
        "slug": "reactive-forms-validation",
        "title": "Reactive forms and validation",
        "assess_questions": [
            "When do FormGroup, FormArray, and FormControl fit best?",
            "How should custom validator errors be shaped?",
            "What is the safe pattern for async validator cancellation?",
            "How do you avoid noisy validation UI on untouched controls?",
            "Which form state flags should gate submit actions?",
        ],
        "tiny_task": (
            "Build a small FormGroup with required and min-length validators."
        ),
        "teach_focus": (
            "Model form structure deliberately and separate validation rules from "
            "render concerns."
        ),
        "teach_example": (
            "Use a validator utility that returns typed error keys and map those "
            "keys to user-facing messages in one place."
        ),
        "build_goal": "Build a production-style editor form with robust validation.",
        "build_requirements": [
            "Implement reactive form model with explicit control typing.",
            "Show validation feedback only when interaction state justifies it.",
        ],
        "build_level_addons": {
            1: "Build one FormGroup with sync validators only.",
            2: "Add one custom validator and message mapping utility.",
            3: "Add FormArray plus async uniqueness validation.",
            4: "Add dynamic sections with conditional validator rules.",
            5: "Add autosave with dirty tracking and conflict recovery.",
        },
        "debug_scenario": (
            "Validation rules were added quickly and now form behavior is "
            "inconsistent across controls."
        ),
        "debug_bugs": [
            "Custom validator returns malformed error object.",
            "Async validator subscription is never canceled.",
            "Disabled state desynchronizes between form model and template.",
            "Nested control path is wrong when rendering errors.",
            "Submit button ignores pending async validation state.",
            "Reset logic keeps stale dirty/touched flags.",
        ],
        "refactor_targets": [
            "Extract validator factories into pure utility functions.",
            "Move form model creation into dedicated builder function.",
            "Consolidate validation message rendering to one helper.",
            "Reduce duplication in dynamic form section setup.",
            "Improve control naming for domain intent.",
            "Document validation invariants in code comments.",
        ],
        "starter_key": "module-4-forms",
    },
    5: {
        "slug": "services-http-state-boundaries",
        "title": "Services, HTTP, and state boundaries",
        "assess_questions": [
            "Where should HTTP DTO mapping happen?",
            "How do you separate request lifecycle state from view concerns?",
            "Which operations are safe to retry automatically?",
            "How should cancellation be handled during route changes?",
            "What boundaries prevent UI from depending on transport details?",
        ],
        "tiny_task": (
            "Create a service that returns mock observable data and exposes "
            "loading/error state."
        ),
        "teach_focus": (
            "Isolate data access, state transitions, and UI consumption into clear "
            "service boundaries."
        ),
        "teach_example": (
            "Map API DTOs inside an API client service, then expose view models via "
            "a separate facade service."
        ),
        "build_goal": "Build a data-driven feature with resilient HTTP state handling.",
        "build_requirements": [
            "Implement loading, success, and error states without leaking DTOs.",
            "Add cancellation or teardown handling for inflight requests.",
        ],
        "build_level_addons": {
            1: "Use mock data service and explicit state enum.",
            2: "Integrate HTTP client with error and retry policy.",
            3: "Add cache policy with explicit invalidation triggers.",
            4: "Add optimistic writes with rollback on failure.",
            5: "Add boundary tests for partial and concurrent failures.",
        },
        "debug_scenario": (
            "A feature works in happy paths but fails under retries, refreshes, and "
            "overlapping requests."
        ),
        "debug_bugs": [
            "Inflight requests continue after route teardown.",
            "Service leaks raw DTO shape into component templates.",
            "Retry policy repeats non-idempotent write calls.",
            "Error handler swallows failure and emits stale success state.",
            "Refresh and optimistic update paths race each other.",
            "Cache invalidation misses one mutation path.",
        ],
        "refactor_targets": [
            "Split API access and view-state facades.",
            "Introduce explicit request-state transitions.",
            "Centralize retry and error translation policies.",
            "Replace implicit mutation with immutable update helpers.",
            "Remove duplicated loading-state handling in components.",
            "Document service ownership and side-effect boundaries.",
        ],
        "starter_key": "module-5-services",
    },
    6: {
        "slug": "accessibility-performance-testing",
        "title": "Accessibility, performance, and testing",
        "assess_questions": [
            "How do you validate keyboard accessibility for interactive controls?",
            "Which performance symptoms indicate unnecessary change detection?",
            "What test split should exist between unit, integration, and e2e tests?",
            "How do you make asynchronous UI tests deterministic?",
            "Which accessibility checks should run before release?",
        ],
        "tiny_task": (
            "Audit one component for semantic roles and keyboard access, then list "
            "two fixes."
        ),
        "teach_focus": (
            "Treat accessibility and performance as first-class quality constraints, "
            "validated by stable tests."
        ),
        "teach_example": (
            "Replace clickable div wrappers with semantic buttons, then add harness "
            "tests for keyboard activation and focus order."
        ),
        "build_goal": (
            "Harden a feature with accessibility upgrades, performance fixes, and "
            "test coverage."
        ),
        "build_requirements": [
            "Implement semantic markup and keyboard-operable interactions.",
            "Add measurable performance and testing checks for core behavior.",
        ],
        "build_level_addons": {
            1: "Fix one component for semantics and keyboard access.",
            2: "Add baseline unit tests and one performance check.",
            3: "Add targeted optimization and integration harness tests.",
            4: "Add quality gates for accessibility and performance regressions.",
            5: "Add critical-path test suite and reproducible perf budget checks.",
        },
        "debug_scenario": (
            "Recent feature growth caused accessibility regressions, slow updates, "
            "and flaky tests."
        ),
        "debug_bugs": [
            "Focusable order skips an interactive control.",
            "ARIA role conflicts with native element behavior.",
            "Expensive template function runs every detection cycle.",
            "Test uses unstable timing assumptions and flakes.",
            "Performance assertion misses update path after list mutations.",
            "Screen-reader label no longer matches visible control intent.",
        ],
        "refactor_targets": [
            "Replace non-semantic click targets with semantic elements.",
            "Move expensive template work to memoized computations.",
            "Stabilize async tests with deterministic harness steps.",
            "Consolidate accessibility attributes into shared primitives.",
            "Reduce change-detection churn from repeated object recreation.",
            "Document performance and accessibility acceptance criteria.",
        ],
        "starter_key": "module-6-quality",
    },
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate adaptive Angular tutoring exercise content."
    )
    parser.add_argument(
        "--module",
        required=True,
        help="Module id (1-6), slug, or title fragment.",
    )
    parser.add_argument(
        "--level",
        required=True,
        type=int,
        choices=[1, 2, 3, 4, 5],
        help="Difficulty level (1-5).",
    )
    parser.add_argument(
        "--format",
        dest="output_format",
        choices=["markdown", "json"],
        default="markdown",
        help="Output format.",
    )
    return parser.parse_args()


def resolve_module(module_arg: str) -> Tuple[int, Dict[str, Any]]:
    candidate = module_arg.strip().lower()
    if not candidate:
        raise ValueError("module value cannot be empty")

    if candidate.isdigit():
        module_id = int(candidate)
        if module_id in MODULES:
            return module_id, MODULES[module_id]
        raise ValueError("module id must be between 1 and 6")

    for module_id, module in MODULES.items():
        if candidate == module["slug"] or candidate == module["title"].lower():
            return module_id, module

    for module_id, module in MODULES.items():
        haystack = f"{module['slug']} {module['title'].lower()}"
        if candidate in haystack:
            return module_id, module

    raise ValueError(f"Unknown module: {module_arg}")


def build_packet(module_id: int, module: Dict[str, Any], level: int) -> Dict[str, Any]:
    level_profile = LEVEL_PROFILES[level]
    assess_count = min(level_profile["question_count"], len(module["assess_questions"]))
    debug_count = min(level_profile["debug_bug_count"], len(module["debug_bugs"]))
    refactor_count = min(
        level_profile["refactor_target_count"], len(module["refactor_targets"])
    )

    assess_questions = module["assess_questions"][:assess_count]
    debug_bugs = module["debug_bugs"][:debug_count]
    refactor_targets = module["refactor_targets"][:refactor_count]

    build_requirements: List[str] = list(module["build_requirements"])
    build_requirements.append(module["build_level_addons"][level])

    starter_path = f"assets/starter-projects/{module['starter_key']}"

    return {
        "module": {
            "id": module_id,
            "slug": module["slug"],
            "title": module["title"],
        },
        "level": {
            "value": level,
            "label": level_profile["label"],
            "expected_time_minutes": level_profile["expected_time"],
        },
        "phases": {
            "assess": {
                "questions": assess_questions,
                "tiny_task": module["tiny_task"],
            },
            "teach": {
                "focus": module["teach_focus"],
                "example": module["teach_example"],
            },
            "build_from_scratch": {
                "goal": module["build_goal"],
                "requirements": build_requirements,
                "starter_path": f"{starter_path}/build-starter",
                "done_criteria": [
                    "Feature runs and meets all required behaviors.",
                    "Code compiles cleanly with no TODO placeholders.",
                    "Learner can explain state and component boundaries.",
                ],
            },
            "debug": {
                "scenario": module["debug_scenario"],
                "seeded_bugs": debug_bugs,
                "starter_path": f"{starter_path}/debug-broken",
                "success_criteria": [
                    "Each bug is mapped to its root cause.",
                    "Fixes are verified with focused checks or tests.",
                    "Learner explains how to prevent recurrence.",
                ],
            },
            "refactor": {
                "targets": refactor_targets,
                "starter_path": f"{starter_path}/refactor-baseline",
                "constraints": [
                    "Do not change external feature behavior.",
                    "Keep public interfaces compatible.",
                    "Justify each refactor with one measurable benefit.",
                ],
                "success_criteria": [
                    "Behavior remains stable after refactor.",
                    "Code readability and structure visibly improve.",
                    "At least one performance or maintainability gain is demonstrated.",
                ],
            },
            "review": {
                "prompts": [
                    "Summarize strongest demonstrated skill in this module.",
                    "List one conceptual gap and one implementation gap.",
                    "Recommend next module and suggested next level.",
                ]
            },
        },
    }


def render_markdown(packet: Dict[str, Any]) -> str:
    module = packet["module"]
    level = packet["level"]
    phases = packet["phases"]

    lines: List[str] = []
    lines.append(f"## Module")
    lines.append(
        f"Module {module['id']}: {module['title']} "
        f"(Level {level['value']} - {level['label']})"
    )
    lines.append("")

    lines.append("## Assess")
    for question in phases["assess"]["questions"]:
        lines.append(f"- {question}")
    lines.append(f"- Tiny task: {phases['assess']['tiny_task']}")
    lines.append("")

    lines.append("## Teach")
    lines.append(f"- Focus: {phases['teach']['focus']}")
    lines.append(f"- Example: {phases['teach']['example']}")
    lines.append("")

    lines.append("## Build From Scratch")
    lines.append(f"- Goal: {phases['build_from_scratch']['goal']}")
    lines.append(f"- Starter: `{phases['build_from_scratch']['starter_path']}`")
    for requirement in phases["build_from_scratch"]["requirements"]:
        lines.append(f"- Requirement: {requirement}")
    for criterion in phases["build_from_scratch"]["done_criteria"]:
        lines.append(f"- Done: {criterion}")
    lines.append("")

    lines.append("## Debug")
    lines.append(f"- Scenario: {phases['debug']['scenario']}")
    lines.append(f"- Starter: `{phases['debug']['starter_path']}`")
    for bug in phases["debug"]["seeded_bugs"]:
        lines.append(f"- Seeded bug: {bug}")
    for criterion in phases["debug"]["success_criteria"]:
        lines.append(f"- Success: {criterion}")
    lines.append("")

    lines.append("## Refactor")
    lines.append(f"- Starter: `{phases['refactor']['starter_path']}`")
    for target in phases["refactor"]["targets"]:
        lines.append(f"- Target: {target}")
    for constraint in phases["refactor"]["constraints"]:
        lines.append(f"- Constraint: {constraint}")
    for criterion in phases["refactor"]["success_criteria"]:
        lines.append(f"- Success: {criterion}")
    lines.append("")

    lines.append("## Review")
    for prompt in phases["review"]["prompts"]:
        lines.append(f"- {prompt}")
    lines.append(f"- Expected time: {level['expected_time_minutes']} minutes")
    lines.append("")

    return "\n".join(lines)


def main() -> int:
    args = parse_args()
    try:
        module_id, module = resolve_module(args.module)
        packet = build_packet(module_id, module, args.level)
    except Exception as exc:  # pragma: no cover - defensive CLI handling
        print(f"error: {exc}", file=sys.stderr)
        return 1

    if args.output_format == "json":
        print(json.dumps(packet, indent=2))
    else:
        print(render_markdown(packet))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

