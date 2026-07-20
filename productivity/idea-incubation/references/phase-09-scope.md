# Phase 09: Scope

## Purpose

Define the MVP, explicit non-scope, future scope, and the reasoning behind each tradeoff.

## Inputs

- `06-feasibility.md`
- `07-goals.md`
- `08-solution.md`
- `research/08-solution-research.md`
- `sources/sources.json`

## Work

1. Break the solution into independently understandable capabilities.
2. Classify each capability as MVP, excluded, or future.
3. Preserve the smallest end-to-end path that can test the core value hypothesis.
4. Remove expensive features with low validation value.
5. Record scope risks and explicit tradeoff reasons.

Suggested search questions:

- What is the minimum useful capability in comparable products?
- Which features do users value first?
- Which features are costly but weak for validation?

## Input quality gate

Require a coherent solution, its capability inventory, the core value hypothesis, and known delivery constraints. Use this internal question priority for prioritization decisions:

1. “首版必须验证的唯一核心价值假设是什么？”
2. “哪项能力即使有价值也不能进入首版？”
3. “首版不可突破的交付约束是什么？”

Pass when one end-to-end validation path can be preserved and every proposed capability can be classified.

## Output

Write `09-scope.md` with feature inventory, MVP, non-scope, future scope, tradeoff rationale, scope risks, Evidence Block, phase conclusion, and downstream handoff.

Write `research/09-scope-research.md`.

## Output quality gate

Verify that MVP, non-scope, and future scope are mutually clear; the MVP remains end to end; exclusions have reasons; costly low-validation features are removed; scope risks are explicit.

## Gate

`continue` when the MVP is bounded and still tests the value hypothesis. Use `revise` for an oversized or internally inconsistent solution.
