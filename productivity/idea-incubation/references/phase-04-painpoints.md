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

## Gate

Use `continue` only when at least one material pain is supported. Prefer `need_data` for weak evidence. Use `stop` when strong evidence shows the pain is immaterial or already adequately solved.
