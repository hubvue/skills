# Update Rules

When updating an artifact:

1. Preserve the existing intent unless the user explicitly changes requirements.
2. Make changes incrementally.
3. Add a short revision note when the update materially changes meaning.
4. Mark invalidated sections as obsolete/superseded when useful.
5. Keep downstream artifacts aligned:
   - requirement changes may affect research/plan/todo/test-cases
   - research changes may affect plan/todo/implement/test/review
   - design changes may affect todo/implementation-log/test-cases/test-report
   - bugfix changes may affect plan/todo/test-report/bug-list

## Phase-Targeted Update Semantics

### 1. No explicit phase specified

If the user gives new information without specifying a target phase:
- apply it to the current next appropriate phase when possible
- do not automatically revise all later phases
- complete only the single next phase and then stop
- ask whether to continue

### 2. Explicit phase specified

If the user explicitly specifies a phase:
- treat that phase as the target of the request
- if the artifact does not yet exist, create or heal prerequisites and execute up to that phase
- if the artifact already exists, treat the request as a revision of that phase

### 3. Existing phase revision

When revising an existing phase artifact:
- preserve still-valid content
- update only the impacted sections
- append a revision note if meaning changes materially
- avoid rewriting the entire artifact unless the prior content is mostly invalid

Examples:
- revise `plan.md` to add fallback strategy
- revise `todo.md` to add telemetry tasks
- revise `test-cases.md` to add regression coverage

## Forward Reflow Rule

If the task is already at a later phase and the user modifies an upstream phase, the workflow must reflow forward.

Required behavior:
1. update the specified upstream artifact
2. identify all downstream artifacts affected by the change
3. revise or re-execute downstream artifacts sequentially
4. stop after reaching the original current phase unless the user asks for a different target

This prevents stale downstream artifacts.

Examples:
- current phase is `test`, user modifies `plan`
  -> update `plan.md`
  -> update `todo.md`
  -> update `implementation-log.md` if implementation assumptions changed
  -> update `test-cases.md` / `test-report.md` / `bug-list.md` as needed
  -> stop at `test`

- current phase is `review`, user modifies `research`
  -> update `research.md`
  -> propagate through `plan`, `todo`, `implement`, `test`, and `review`

## Current Phase Preservation Rule

When handling upstream revisions for an already-progressed task:
- preserve the current highest meaningful phase as the reflow target
- do not stop at the revised upstream phase unless the user explicitly asks to stop there

Examples:
- current phase `test` + plan feedback -> reflow to `test`
- current phase `review` + todo feedback -> reflow to `review`

## Dependency Healing Rule

If a requested phase depends on missing, stale, or insufficient prerequisite artifacts:
- reconstruct or refresh the prerequisites first
- then continue to the target phase

Do not skip required upstream reasoning merely because the user requested a later phase.

## Bugfix-triggered design sync

When fixing a bug, update `plan.md` if the fix changes any of the following:
- technical approach
- interface contract
- state machine / flow
- data model / payload shape
- fallback / error handling path
- boundary assumptions
- risk handling strategy

If the plan is updated due to a bugfix:
- add a revision entry in `plan.md`
- update impacted todo items if necessary
- mention the design-sync in `implementation-log.md` or the corresponding bug record

## Requirement Changes

If the user changes the product requirement mid-task:
- update `task.md`
- re-evaluate `research.md`
- revise `plan.md`
- revise `todo.md`
- revise implementation/test/review artifacts as needed to restore consistency with the new requirement

## Retest Rule

Never mark a bug closed immediately after code changes.
Use a progression such as:
- open
- in_progress
- fixed_pending_retest
- closed

## Agent Team Update Rule

If agent team mode is enabled:
- sub agents may draft updates for individual phases
- only the main agent may finalize artifact updates and status transitions
- if multiple sub agent outputs conflict, the main agent must reconcile them before updating artifacts
- artifact consistency across phases takes priority over speed of delegation
