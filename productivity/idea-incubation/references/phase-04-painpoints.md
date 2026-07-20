# Phase 04: Painpoints

## Purpose

Validate whether the current workflow contains real, frequent, severe, and poorly solved pain.

## Inputs

- `02-users.md`
- `03-scenarios.md`
- their research artifacts
- `sources/sources.json`

## Work

1. Derive pains from observed workflow friction rather than from the proposed feature.
2. Assess frequency, severity, reach, urgency, and current workaround cost.
3. Evaluate existing alternatives and why they remain insufficient.
4. Distinguish direct user evidence from inferred pain.

Suggested search questions:

- Do users complain about this problem publicly?
- How often does it occur and what does it cost?
- Which alternatives exist, and why are users still dissatisfied?

## Input quality gate

Require a concrete current workflow, at least one observable friction, and some basis for judging materiality. Use this internal question priority for private or experiential evidence:

1. “当前流程中最严重的一处阻碍是什么？”
2. “你如何知道用户真实遇到了这个阻碍？”
3. “这个阻碍通常多久发生一次？”
4. “用户目前最常用的替代办法是什么？”

Pass when a pain can be evaluated by frequency, severity, reach, urgency, or workaround cost without deriving it solely from the proposed feature.

## Output

Write `04-painpoints.md` with:

- current problems and pain inventory;
- frequency and severity assessment;
- alternatives and their limitations;
- evidence strength;
- disconfirmation criteria;
- Evidence Block;
- phase conclusion and downstream handoff.

Write `research/04-painpoints-research.md`.

## Output quality gate

Verify that each material pain traces to workflow evidence, alternatives are considered, direct evidence is separated from inference, disconfirmation criteria exist, and weak evidence produces `need_data` rather than a forced pass.

## Gate

Use `continue` only when at least one material pain is supported. Prefer `need_data` for weak evidence. Use `stop` when strong evidence shows the pain is immaterial or already adequately solved.
