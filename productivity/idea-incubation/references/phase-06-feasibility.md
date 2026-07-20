# Phase 06: Feasibility

## Purpose

Assess technical, product, business, cost, time, operational, legal, security, and MVP feasibility.

## Inputs

- `03-scenarios.md`
- `04-painpoints.md`
- `05-value.md`
- relevant research artifacts and `sources/sources.json`

## Work

1. Identify required capabilities, dependencies, integrations, and unknowns.
2. Assess product, delivery, operational, and business constraints.
3. Estimate relative cost and time ranges rather than false precision.
4. Identify legal, policy, copyright, safety, privacy, and security risks.
5. Propose a reduced-scope hypothesis when the full idea is infeasible.

Suggested search questions:

- Do stable APIs, platforms, or open-source implementations exist?
- What are the current limits, costs, and policy constraints?
- Which dependency or risk dominates feasibility?

## Input quality gate

Require a validated pain and value hypothesis, a critical scenario, and known constraints or explicit acknowledgement that they are unknown. Use this internal question priority for private constraints:

1. “当前已知最硬的实施约束是什么？”
2. “首个版本必须依赖哪个现有系统或能力？”
3. “哪个风险一旦成立就会让首版不可行？”

Pass when the dominant dependencies and feasibility unknowns can be named and a reduced-scope hypothesis can be assessed.

## Output

Write `06-feasibility.md` with feasibility by dimension, dependencies, risks, uncertainty, MVP feasibility, fallback options, Evidence Block, phase conclusion, and downstream handoff.

Write `research/06-feasibility-research.md`.

## Output quality gate

Verify all relevant feasibility dimensions, dominant dependency, uncertainty, relative cost and time, legal/security/privacy constraints, MVP path, and fallback are covered without false precision.

## Gate

`continue` when a credible MVP path exists. Use `revise` toward a reduced hypothesis before `stop`; use `need_data` when a decisive feasibility unknown can be resolved.
