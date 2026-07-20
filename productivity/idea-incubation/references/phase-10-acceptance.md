# Phase 10: Acceptance

## Purpose

Define testable functional, workflow, exception, non-functional, and completion criteria for the MVP.

## Inputs

- `07-goals.md`
- `08-solution.md`
- `09-scope.md`
- relevant research artifacts and `sources/sources.json`

## Work

1. Derive acceptance criteria only from in-scope behavior.
2. Cover happy paths, state transitions, errors, recovery, and edge cases.
3. Add relevant performance, reliability, security, privacy, compatibility, and accessibility criteria.
4. Define a practical Definition of Done and verification method.
5. Trace criteria back to goals and scope.

Suggested search questions:

- Which platform, safety, privacy, or compatibility rules apply?
- Which quality thresholds and test methods are credible?

## Input quality gate

Require passed goals, solution, and scope plus observable behavior for every MVP capability. Use this internal question priority for owner-defined thresholds:

1. “哪个结果必须被客观验证才能判断首版成功？”
2. “哪个异常场景最不能被遗漏？”
3. “哪项质量约束属于发布硬门槛？”

Pass when each in-scope outcome can be verified and any user-owned release threshold is known or explicitly treated as an assumption.

## Output

Write `10-acceptance.md` with functional, workflow, exception, non-functional, and DoD criteria; test guidance; traceability; Evidence Block; phase conclusion; and downstream handoff.

Write `research/10-acceptance-research.md`.

## Output quality gate

Verify complete traceability to scope and goals, testable happy paths and state transitions, errors and recovery, relevant non-functional criteria, verification methods, and an executable Definition of Done.

## Gate

`continue` when every MVP outcome is testable. Use `revise` toward `goals`, `solution`, or `scope` when acceptance cannot be stated objectively.
