# Task Structure

Each task should live in its own directory.

Recommended layout:

/<PROJECT-WORKSPACE>/.ai/tasks/<TASK-ID>/
  task.md
  research.md
  plan.md
  todo.md
  implementation-log.md
  test-cases.md
  test-report.md
  bug-list.md
  review-notes.md
  status.json

Optional:
  summary.md
  attachments/
  snippets/
  screenshots/

## File Purpose

- `task.md`
  Requirement intake artifact. Captures product request, goals, scope, acceptance criteria, constraints.

- `research.md`
  Engineering context artifact. Captures current project understanding, impacted modules, architecture notes, risks, unknowns.

- `plan.md`
  Technical solution artifact. Captures the intended implementation design.

- `todo.md`
  Executable task breakdown artifact. Converts plan into discrete implementation work items.

- `implementation-log.md`
  Implementation trace artifact. Records what changed, commands run, self-verification, deviations from plan.

- `test-cases.md`
  Test design artifact. Captures test points, scenarios, preconditions, expected results.

- `test-report.md`
  Test execution artifact. Captures actual test execution results, pass/fail summary, environment, evidence.

- `bug-list.md`
  Defect tracking artifact. Captures bug records, severity, status, root cause, fix summary, retest result.

- `review-notes.md`
  Engineering review artifact. Captures final engineering review, design/code quality observations, readiness conclusion.

- `status.json`
  Machine-readable task state artifact.

## Naming

Task IDs should be short, stable, and unique.

Example:
- TASK-001-login-refactor
- TASK-002-export-template
- TASK-003-batch-render

## Artifact Expectations

Artifacts should be:
- durable
- incrementally updated
- concise but sufficient
- easy for both humans and agents to navigate
