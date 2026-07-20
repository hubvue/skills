---
name: idea-incubation
description: Incubate, validate, and refine a raw product idea into an evidence-backed, decision-ready requirement through one durable 12-phase workflow. Use when starting or resuming idea discovery, executing or revising a named incubation phase, answering a pending phase question, or deciding whether an idea should become a formal requirement.
---

# Idea Incubation

Act as the single workflow controller for evidence-driven idea incubation. Treat phases as internal workflow states, not separate skills.

## Core principles

1. Persist every phase result; chat history is not the system of record.
2. Only this skill advances phases, changes workflow state, or finalizes decisions.
3. Search only when external, current, or uncertain information can change a decision.
4. Separate user facts, sourced facts, inferences, and assumptions.
5. Heal missing or stale prerequisites before running a later phase.
6. Reflow downstream artifacts after an upstream revision.
7. Require one explicit phase name per new command; a pending-question answer resumes its stored phase and target without another command.
8. Pause, defer, or reject weak ideas instead of forcing a requirement.
9. Run input and output quality gates for every phase; never pass a phase with insufficient context or output.
10. When user context is required, ask exactly one question per turn, persist the answer, and reevaluate before asking another.

## CLI contract

```text
/idea-incubation <phase> [phase-input]
```

Examples:

```text
/idea-incubation intake "A tool that summarizes product feedback"
/idea-incubation motivation
/idea-incubation painpoints
/idea-incubation users "Focus the first release on product managers"
/idea-incubation assemble
```

The first positional argument must be one of the canonical phase names below. Do not introduce action subcommands or public flags such as `start`, `run`, `continue`, `resume`, `status`, `review`, `--workspace`, or `--research`.

- `intake` with a raw idea creates a new workspace when none is active.
- A phase that has not run executes after healing missing or stale prerequisites.
- A valid phase invoked without new input is idempotent: report its current result without changing artifacts or revision counters.
- A phase invoked with new material information is revised. Preserve valid content and reflow every later phase through the previous highest meaningful phase.
- Resolve the workspace through the durable active-workspace rules. Ask one selection question only when multiple candidates remain ambiguous.
- Stop after the named phase and required dependency healing or forward reflow complete.

Choose research depth internally from `none`, `light`, `standard`, and `deep` according to the phase default, current uncertainty, and research policy.

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
- `references/routing-rules.md`
- `references/quality-gates.md`

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

Use `references/validation-scenarios.md` when changing or forward-testing workflow behavior.

## Execution algorithm

1. Parse the canonical phase and optional phase input.
2. Resolve or create the active workspace using `artifact-rules.md`; do not guess when multiple workspaces remain ambiguous.
3. Load, migrate, and validate `status.json`. Recover any interrupted `running`, `blocked`, or pending-question state before new work.
4. If the user is answering `pendingQuestion`, append the answer to `logs/workflow.log`, clear the pending question, and resume that phase even without another slash command.
5. Use `routing-rules.md` to determine idempotency, dependency healing, revision mode, reflow ceiling, and the ordered execution range.
6. Before each phase, read its reference and inputs and run the input quality gate. If required user context is missing, persist one highest-value question, set the phase to `needs_data`, ask only that question, and stop the turn.
7. When the input gate is ready, mark the phase `running`, choose research depth internally, perform research, and draft the phase output.
8. Run the output quality gate. If analysis reveals one decision-critical user-context gap, persist and ask one question; otherwise record explicit assumptions for non-critical gaps.
9. Write the phase and research artifacts, update `sources/sources.json`, and append workflow events.
10. Apply the phase decision and only then commit the resulting transition to `status.json`.
11. Run `node scripts/validate-workspace.js <idea-workspace>`. Repair validation failures or transition the responsible phase to `blocked/retry`, then validate again.
12. Stop when the requested phase plus required healing or reflow completes, or when a gate pauses or closes the workflow.

## Question loop

Follow `quality-gates.md` whenever a phase lacks required context. Ask exactly one atomic question in a turn. Do not bundle subquestions or reveal the remaining queue. After each answer, persist it, reevaluate all available context, and either proceed or ask the next single highest-value question. A phase may use as many turns as necessary, but must not repeat an answered or explicitly unavailable question.

## Decision transitions

- `continue`: mark the phase `passed` and advance only as far as the command permits.
- `revise`: require `targetPhase`, reason, affected artifacts, and unresolved questions; mark the requesting and later affected phases `stale`, then reflow from the target.
- `need_data`: mark the phase `needs_data`, set workflow status to `paused`, record missing information and one pending question when user context is required, and stop.
- `retry`: mark an interrupted or failed phase `blocked`, set workflow status to `paused`, record the recoverable failure, and resume only after recovery checks pass.
- `stop`: mark the phase `stopped`, set workflow status to `closed`, write `decision.md`, choose `idea_pool`, `deferred`, or `rejected`, and stop.

Gate rules:

- `painpoints`: low evidence normally means `need_data`; strong counter-evidence may mean `stop`.
- `value`: weak value maps to `idea_pool` or `deferred`.
- `feasibility`: attempt a reduced-scope hypothesis before rejection.
- `scope`: an oversized MVP revises `solution` or `scope`.
- `acceptance`: untestable outcomes revise `goals`, `solution`, or `scope`.
- `assemble`: complete only after every check passes; reserve `approved_requirement` for an approval-quality requirement.

## Reflow rules

1. Snapshot the previous highest meaningful phase before changing state.
2. Preserve still-valid content, append revision context, and increment the revised phase only after its output gate passes.
3. Mark every later phase through the snapshot ceiling `stale`; do not delete artifacts.
4. Re-execute stale phases in canonical order through that ceiling, stopping on `need_data`, `retry`, or `stop`.
5. Never leave a phase `passed` when any earlier phase in the canonical prefix is unresolved.

## Lifecycle rules

- Treat a valid, unchanged, already-passed phase as a no-op.
- Resume a paused question loop from the pending phase when the user replies.
- Recover incomplete writes before routing new work; never trust `running` as completed.
- Reopen `completed` or `closed` workflows only when the user supplies new material information or explicitly requests reevaluation. Reset the final decision to `pending`, preserve prior decisions, and route the revision normally.
- Keep terminal workflows unchanged when invoked without new information; report their decision and required reopening context.

## Completion

Complete the workflow only when `assemble` finishes, all twelve phase and research documents exist, no required phase is unresolved, all sources are registered, and `11-requirement.md`, `decision.md`, and `sources/source-summary.md` exist. The final decision must be `approved_requirement`, `idea_pool`, `deferred`, or `rejected`.

At the end of a completed invocation, report the requested phase, phases changed, artifacts written, current state, blockers, and next recommended phase command. When a quality gate pauses for context, report only a concise reason and the single pending question.
