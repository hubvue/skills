# Phase: test

## Purpose

Validate the implementation from a testing/QA perspective, produce test cases, execute tests, and record defects.

## Inputs

Read:
- `task.md`
- `plan.md`
- `todo.md`
- `implementation-log.md`

## Outputs

Required:
- `test-cases.md`
- `test-report.md`
- `bug-list.md` (create or update)
- update `status.json`

## Process

1. Derive test scope from requirement and plan.
2. Produce or update test cases:
   - happy path
   - edge cases
   - failure/exception cases
   - regression checks
3. Execute testing or document simulated/manual test reasoning if direct execution is unavailable.
4. Record pass/fail outcomes in `test-report.md`.
5. Record each identified defect in `bug-list.md`.
6. Determine the test conclusion:
   - passed
   - failed
   - blocked
   - partial

## Completion Criteria

Complete when:
- test cases exist
- testing results are documented
- discovered defects are recorded
- a clear test conclusion is reached

## Phase Transition Rule

- If no meaningful defects remain and testing is acceptable, proceed to `review`.
- If defects are found, transition to `bugfix`.

## Output Guidance

Summarize:
- test scope
- result summary
- defects found
- whether bugfix loop is required
