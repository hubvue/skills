---
name: idea-incubation
description: Incubate, validate, and refine a raw product idea into an evidence-backed, decision-ready requirement through a durable 12-phase workflow. Use when starting or resuming idea discovery, running a named incubation phase, revising an earlier conclusion, reviewing an idea workspace, or deciding whether an idea should become a formal requirement.
---

# Idea Incubation

Act as the single workflow controller for evidence-driven idea incubation. Treat phases as internal workflow states, not separate skills.

## Core principles

1. Persist every phase result; chat history is not the system of record.
2. Only this skill advances phases, changes workflow state, or finalizes decisions.
3. Search only when external, current, or uncertain information can change a decision.
4. Separate user facts, sourced facts, inferences, and assumptions.
5. Heal missing or stale prerequisites before running a later phase.
6. Reflow affected downstream artifacts after an upstream revision.
7. Require one explicit phase name per invocation; run additional phases only for dependency healing or forward reflow.
8. Pause, defer, or reject weak ideas instead of forcing a requirement.

## CLI contract

```text
/idea-incubation <phase> [phase-input] [--workspace <path>] [--research <depth>] [--no-web]
```

Examples:

```text
/idea-incubation intake "A tool that summarizes product feedback"
/idea-incubation motivation
/idea-incubation painpoints --research deep
/idea-incubation users "Focus the first release on product managers"
/idea-incubation assemble
```

The first positional argument must be one of the canonical phase names below. Do not introduce action subcommands such as `start`, `run`, `continue`, `resume`, `status`, or `review`.

- `intake` with a raw idea creates a new workspace when none is selected.
- A phase that has not run executes after healing any missing or stale prerequisites.
- A phase that already exists is revised or re-executed. Preserve valid content, apply supplied phase input, and reflow affected downstream phases through the previous highest meaningful phase.
- Resolve the workspace from `--workspace` when provided; otherwise use the active idea workspace from the conversation or repository context.
- Stop after the named phase and any required dependency healing or forward reflow complete.

Research depths are `none`, `light`, `standard`, and `deep`. `--no-web` forces `none` but still requires a documented no-search decision.

## Canonical phase order

| Phase | Artifact | Research artifact | Default depth |
|---|---|---|---|
| `intake` | `00-idea-intake.md` | `research/00-intake-research.md` | light |
| `motivation` | `01-motivation.md` | `research/01-motivation-research.md` | standard |
| `users` | `02-users.md` | `research/02-users-research.md` | standard |
| `scenarios` | `03-scenarios.md` | `research/03-scenarios-research.md` | standard |
| `painpoints` | `04-painpoints.md` | `research/04-painpoints-research.md` | deep |
| `value` | `05-value.md` | `research/05-value-research.md` | deep |
| `feasibility` | `06-feasibility.md` | `research/06-feasibility-research.md` | deep |
| `goals` | `07-goals.md` | `research/07-goals-research.md` | light |
| `solution` | `08-solution.md` | `research/08-solution-research.md` | deep |
| `scope` | `09-scope.md` | `research/09-scope-research.md` | standard |
| `acceptance` | `10-acceptance.md` | `research/10-acceptance-research.md` | light |
| `assemble` | `11-requirement.md` | `research/11-assemble-research.md` | light |

Accept legacy identifiers when resuming: `idea_intake`, `motivation_clarify`, `user_identify`, `scenario_restore`, `painpoint_validate`, `value_assess`, `feasibility_assess`, `goal_define`, `solution_design`, `scope_define`, `acceptance_criteria`, and `requirement_assemble`. Normalize them to the canonical phases above.

## References

Before mutating a workspace, read:

- `references/artifact-rules.md`
- `references/status-schema.md`
- `references/research-policy.md`

Before executing a phase, also read its complete reference:

- `intake`: `references/phase-00-intake.md`
- `motivation`: `references/phase-01-motivation.md`
- `users`: `references/phase-02-users.md`
- `scenarios`: `references/phase-03-scenarios.md`
- `painpoints`: `references/phase-04-painpoints.md`
- `value`: `references/phase-05-value.md`
- `feasibility`: `references/phase-06-feasibility.md`
- `goals`: `references/phase-07-goals.md`
- `solution`: `references/phase-08-solution.md`
- `scope`: `references/phase-09-scope.md`
- `acceptance`: `references/phase-10-acceptance.md`
- `assemble`: `references/phase-11-assemble.md`

## Execution algorithm

1. Parse the phase name, phase input, workspace override, research override, and Web Search permission.
2. Resolve the workspace. For a new idea, generate `idea-YYYYMMDD-short-slug` and bootstrap it.
3. Load and normalize `status.json`, including legacy phase identifiers.
4. Determine the previous highest meaningful phase and requested phase.
5. Include missing or stale prerequisites in the execution range.
6. Before each phase, read its reference and inputs, mark it `running`, and decide whether to search.
7. Always write both the phase document and research document. The research document contains evidence or a no-search rationale.
8. Update `sources/sources.json` when sources were used, then update `status.json` after artifact writes succeed.
9. Apply the decision transition and stop when the requested phase and any required reflow complete, or when a gate requires it.

## Decision transitions

- `continue`: mark the phase `passed` and advance only as far as the command permits.
- `revise`: require `targetPhase`, reason, affected artifacts, and questions; mark affected phases `stale` and reflow.
- `need_data`: mark the phase `needs_data`, set workflow status to `paused`, record missing information, and stop.
- `stop`: mark the phase `stopped`, set workflow status to `closed`, write `decision.md`, choose `idea_pool`, `deferred`, or `rejected`, and stop.

Gate rules:

- `painpoints`: low evidence normally means `need_data`; strong counter-evidence may mean `stop`.
- `value`: weak value maps to `idea_pool` or `deferred`.
- `feasibility`: attempt a reduced-scope hypothesis before rejection.
- `scope`: an oversized MVP revises `solution` or `scope`.
- `acceptance`: untestable outcomes revise `goals`, `solution`, or `scope`.
- `assemble`: complete the assembly only after all checks pass; choose the justified final decision, and reserve `approved_requirement` for an approval-quality requirement.

## Reflow rules

1. Preserve still-valid content and append revision context.
2. Increment the revised phase's revision number.
3. Mark affected downstream phases `stale`; do not delete their artifacts.
4. Re-execute them in order through the previous highest meaningful phase.
5. Stop if a refreshed phase returns `need_data` or `stop`.
6. Never leave a phase `passed` when a required input is stale.

## Completion

Complete the workflow only when `assemble` finishes, all twelve phase and research documents exist, no required phase is unresolved, all sources are registered, and `11-requirement.md`, `decision.md`, and `sources/source-summary.md` exist. The final decision must be `approved_requirement`, `idea_pool`, `deferred`, or `rejected`.

At the end of each invocation, report the requested phase, phases changed, artifacts written, current state, blockers, and next recommended phase command.
