# Phase 08: Solution

## Purpose

Design the smallest coherent solution that can achieve the goals within known constraints.

## Inputs

- `02-users.md` through `07-goals.md`
- relevant research artifacts
- `sources/sources.json`

## Work

1. Define the solution concept and its explicit boundary.
2. Design the core user flow, modules, inputs, outputs, and processing logic.
3. Cover errors, empty states, degraded behavior, and operational fallback.
4. Compare alternatives and record tradeoffs.
5. Keep solution decisions traceable to goals, painpoints, and feasibility.

Suggested search questions:

- How do comparable products solve the problem?
- Which interaction and architecture patterns are mature?
- Which existing implementations can reduce risk?

## Input quality gate

Require a target user, critical scenario, validated pain, goals, and feasibility constraints. Use this internal question priority only for product choices that cannot be derived:

1. “用户完成核心任务时必须保留的关键动作是什么？”
2. “首版最不能接受的失败结果是什么？”
3. “哪项现有能力必须被复用？”

Pass when the smallest coherent solution can be designed without relying on an unresolved feasibility assumption.

## Output

Write `08-solution.md` with solution overview, core flow, modules, user path, system logic, failure handling, alternatives, tradeoffs, Evidence Block, phase conclusion, and downstream handoff.

Write `research/08-solution-research.md`.

## Output quality gate

Verify traceability to goals and painpoints, a complete core flow, explicit boundary, inputs/outputs, failure and degraded behavior, alternatives, tradeoffs, and no scope detail unsupported by the evidence.

## Completion

`continue` when the solution is coherent enough to scope, covers the critical scenario, and does not depend on unresolved feasibility assumptions.
