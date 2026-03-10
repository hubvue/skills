# Phase: review

## Purpose

Perform engineering review after testing has sufficiently converged, focusing on code/design quality and delivery readiness.

## Inputs

Read:
- `task.md`
- `plan.md`
- `todo.md`
- `implementation-log.md`
- `test-report.md`
- `bug-list.md`

## Outputs

Required:
- `review-notes.md`
- update `status.json`

Optional:
- `summary.md`

## Process

1. Confirm testing has converged enough for review.
2. Review whether implementation matches requirement and plan.
3. Check whether bugfixes introduced design debt or inconsistency.
4. Evaluate code/design quality, maintainability, and remaining risks.
5. Identify follow-up items if needed.
6. Produce a clear review conclusion.

## Completion Criteria

Complete when:
- engineering review findings are documented
- delivery readiness is explicitly stated
- remaining risks or follow-ups are identified
- task can be considered complete or explicitly needs follow-up

## Review Conclusion Examples

- approved
- approved_with_followups
- needs_followup
- blocked_by_unresolved_risk

## Output Guidance

Summarize:
- review conclusion
- main quality observations
- residual risks
- follow-up recommendations
