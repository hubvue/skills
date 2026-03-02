# Phase: Implement

## Goal

Execute the plan through the todo list with minimal improvisation and clear logging.

## Must do

- implement according to `plan.md` and `todo.md`
- update checkbox progress in `todo.md`
- create or update `implementation-log.md`
- record files changed
- record completed work
- record deviations from the plan
- run relevant verification such as typecheck, tests, build, or lint where possible
- report incomplete work honestly

## Must not do

- do not silently expand scope
- do not make major design changes without documenting them
- do not pretend verification happened if it did not
- do not continue broad implementation if the plan is clearly invalid

## Required outputs

- updated `todo.md`
- `implementation-log.md`

## Recommended `implementation-log.md` sections

- Task ID
- Title
- Update Timestamp
- Files Changed
- Work Completed
- Deviations
- Verification Performed
- Remaining Issues
- Next Actions

## If the plan breaks during implementation

If implementation reveals that the plan is wrong, incomplete, or unsafe:
- document the issue in `implementation-log.md`
- stop broad uncontrolled execution
- recommend returning to `plan`
- update the plan if explicitly requested or clearly necessary

## Implementation quality bar

A good implementation phase should leave behind:
- visible progress
- visible verification
- visible deviations
- an obvious next step
