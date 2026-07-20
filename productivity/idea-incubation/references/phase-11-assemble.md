# Phase 11: Assemble

## Purpose

Consolidate the coherent phase artifacts into the final requirement, decision record, and evidence summary.

## Inputs

- `00-idea-intake.md` through `10-acceptance.md`
- all twelve research documents available through this phase
- `sources/sources.json`
- `status.json`

## Work

1. Verify that required artifacts exist and no required phase is stale or unresolved.
2. Reconcile contradictions across users, scenarios, painpoints, value, feasibility, goals, solution, scope, and acceptance.
3. Verify that facts, inferences, assumptions, source IDs, and evidence levels are consistent.
4. Search only when a decisive fact may have changed since an earlier phase.
5. Assemble rather than mechanically concatenate phase documents.

## Outputs

Write `11-requirement.md` with:

- requirement name and original idea;
- background and evidence-backed problem;
- target users and scenarios;
- painpoints and value;
- feasibility and constraints;
- goals and success metrics;
- solution and core flow;
- MVP and non-scope;
- acceptance criteria;
- risks, fallback, and future work;
- evidence-level summary;
- Evidence Block;
- final conclusion.

Also write:

- `research/11-assemble-research.md`;
- `decision.md` with decision, rationale, evidence level, unresolved risks, and next actions;
- `sources/source-summary.md` grouped by claim and phase.

## Gate

Use `revise` or `need_data` while required artifacts remain inconsistent or incomplete. Once assembly succeeds, mark the phase `passed`, set the workflow to `completed`, and choose the justified final decision. Reserve `approved_requirement` for an approval-quality requirement; otherwise choose `idea_pool`, `deferred`, or `rejected`.
