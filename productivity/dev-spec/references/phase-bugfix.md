# Phase: bugfix

## Purpose

Resolve defects found during testing, synchronize design if needed, and return the task to retest.

## Inputs

Read:
- `bug-list.md`
- `test-report.md`
- `plan.md`
- `todo.md`
- `implementation-log.md`

## Outputs

Required:
- update `bug-list.md`
- update `implementation-log.md`
- update `status.json`

Optional but often required:
- update `plan.md`
- update `todo.md`
- update `test-report.md` after retest outcome

## Process

1. Select unresolved defects from `bug-list.md`.
2. Analyze root cause for each targeted defect.
3. Apply fixes.
4. Record fix summary.
5. Decide whether the fix requires design synchronization.
6. If design changed materially, update `plan.md`.
7. Mark bug status as:
   - in_progress
   - fixed_pending_retest
   - closed (only after retest confirms)
8. Return the task to `test` for retest.

## Completion Criteria

A bugfix pass is complete when:
- targeted defects have recorded root cause and fix summary
- implementation log is updated
- plan is updated if required
- the task is explicitly handed back to test/retest

## Important Rule

Do not close a bug immediately after code changes unless retest evidence exists.

## Output Guidance

Summarize:
- defects addressed
- root causes
- fixes applied
- whether plan/todo changed
- next phase: test (retest)
