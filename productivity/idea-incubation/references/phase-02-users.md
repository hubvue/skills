# Phase 02: Users

## Purpose

Identify a focused first user group, secondary users, non-target users, and the characteristics that affect adoption.

## Inputs

- `00-idea-intake.md`
- `01-motivation.md`
- research artifacts for phases 00 and 01
- `sources/sources.json`

## Work

1. Enumerate plausible user groups.
2. Select the core target and first adopters.
3. Distinguish primary, secondary, buyer, operator, and non-target roles where relevant.
4. Describe current goals, constraints, behaviors, and adoption signals.
5. Avoid unsupported demographic personas.

Suggested search questions:

- Who uses or discusses comparable tools?
- Which users show the strongest unmet need?
- Who pays, decides, operates, and benefits?

## Input quality gate

Require a valid motivation, plausible candidate users, and enough user-specific context to choose a first target. Use this internal question priority when selection cannot be derived:

1. “你最希望首个版本先服务哪一类用户？”
2. “这类用户最关键的共同特征是什么？”
3. “哪一类人明确不属于首个版本的目标用户？”

Pass when the first target is narrower than a generic population and materially different user roles are distinguishable.

## Output

Write `02-users.md` with:

- candidate user groups;
- core target and first adopters;
- evidence-based user characteristics;
- current goals and difficulties;
- secondary and non-target users;
- Evidence Block;
- phase conclusion and downstream handoff.

Write `research/02-users-research.md`.

## Output quality gate

Verify that primary, secondary, buyer, operator, beneficiary, and non-target roles are separated where relevant; first-adopter selection has evidence or rationale; personas do not contain invented demographics.

## Completion

`continue` when the first target group is specific enough to restore a real workflow. Use `need_data` when the target remains a broad population with materially different needs.
