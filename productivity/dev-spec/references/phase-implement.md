# Phase: implement

## Purpose

Execute the planned engineering work and perform engineering self-verification.

## Inputs

Read:
- `task.md`
- `plan.md`
- `todo.md`

## Outputs

Required:
- `implementation-log.md`
- update `status.json`

Optional:
- update `todo.md`
- update `plan.md` if implementation reveals necessary design changes

## Process

1. Execute todo items in a sensible order.
2. Record major implementation changes.
3. Keep todo item statuses updated.
4. Run relevant engineering self-checks where possible:
   - lint
   - typecheck
   - unit test
   - build
   - smoke validation
5. Record self-verification results in `implementation-log.md`.
6. If implementation materially diverges from the original plan, update `plan.md`.

## Completion Criteria

Complete when:
- the intended implementation is in place at a meaningful level
- implementation changes are recorded
- self-verification has been attempted/documented
- the task is ready for formal test design/execution

## Output Guidance

Summarize:
- what was implemented
- major files/modules affected
- self-verification outcome
- plan changes if any
- next phase: test
