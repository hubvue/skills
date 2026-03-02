# Task Structure

## Task concept

A task is an isolated work item representing one coherent requirement, fix, feature, refactor, or investigation.

A task should be:
- specific enough to track
- small enough to reason about
- stable enough to survive multiple iterations

## Task id rules

Use stable, human-readable task ids.

Preferred format:
- `TASK-001-login-refactor`
- `TASK-002-batch-export`
- `TASK-003-fix-save-permission`

Guidelines:
- prefix with `TASK-`
- include a short descriptive slug
- keep slugs concise
- preserve the same task id across later updates

## Recommended directory structure

```text
.ai/
  tasks/
    TASK-001-login-refactor/
      task.md
      research.md
      plan.md
      todo.md
      implementation-log.md
      review-notes.md
      decision-log.md
      status.json
      artifacts/
```

## Artifact responsibilities

### `task.md`
Task home page and lifecycle record.
Includes scope, status, phase history, constraints, and notes.

### `research.md`
Current-system understanding for this task.
Captures relevant modules, flows, risks, and unknowns.

### `plan.md`
Reviewable implementation strategy for this task.

### `todo.md`
Execution-ready checklist derived from the plan.

### `implementation-log.md`
What was actually changed, verified, deferred, or found during implementation.

### `review-notes.md`
Human comments, constraints, approvals, questions, and annotation history.

### `decision-log.md`
Important decisions, alternatives, reasons, and impacts.

### `status.json`
Machine-readable task status snapshot.

## New task vs update

Treat the request as a **new task** when:
- it introduces a separate feature/fix/refactor
- it has meaningfully different scope
- it should have independent planning and execution history

Treat the request as an **update to an existing task** when:
- it refines the same work item
- it adds constraints to the same feature/fix
- it extends or revises the same implementation effort

When uncertain:
- prefer keeping tasks separate if mixing them would reduce clarity
- state the assumption explicitly

## Multi-task isolation

Never merge two independent tasks silently.

If tasks are related:
- keep them separate
- cross-reference them in `task.md`
- mention dependency or linkage in notes

Examples:
- "Add SSO login" and "Refactor payment retries" -> separate tasks
- "Login refactor" and "Add OTP to same login refactor" -> likely same task
