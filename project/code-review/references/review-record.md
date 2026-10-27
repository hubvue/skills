# Review Record

Use this contract for findings, repair tracking, and the final decision. Keep a small review in one response. Reuse the existing PR or review document for a continuing review; create a persistent artifact only when requested or required by the project.

## Findings

Record each substantiated finding with:

- **ID and severity:** stable across rounds; use the project's severity scheme.
- **Location:** current file and the smallest useful line range, tied to the reviewed version.
- **Trigger:** a reachable input, state, sequence, or environment.
- **Actual vs. expected:** the observed or inferred behavior and the contract it violates.
- **Impact:** the concrete consequence, not a speculative worst case.
- **Evidence:** reproduction and result, or the complete static path with relevant callers and guards. Label unverified portions.
- **Repair direction:** the smallest correction that restores the contract; omit implementation detail that is not yet justified.
- **Disposition:** state plus evidence or a recorded acceptance decision.

Severity is independent of confidence. Unsupported but potentially serious concerns are evidence gaps to investigate, not confirmed high-severity defects. Distinguish new defects from existing ones.

If no project severity policy exists, use these defaults:

| Priority | Meaning | Default disposition |
| --- | --- | --- |
| P0 | Urgent, widespread severe failure or security consequence | Blocks; use the project's incident/exception process if one exists |
| P1 | Important behavior fails or significant data/security risk is established | Blocks until corrected or a formal project exception is granted |
| P2 | Demonstrable defect with limited impact | Correct, or obtain explicit acceptance from an authorized responsible person |
| P3 | Nonblocking improvement | Normally omit unless requested or materially useful |

An agent must not grant an exception or accept risk on behalf of a person. Do not infer authority from the fact that someone wrote the code. Apply established project roles; if material authority is unclear, record the missing decision.

## Dispositions

| State | Required basis |
| --- | --- |
| `OPEN` | Substantiated issue with no verified resolution |
| `FIXED` | Current-version code addresses the trigger; relevant verification confirms the correction |
| `DISMISSED` | Counterevidence shows the alleged defect is absent, unreachable under the contract, or incorrectly attributed |
| `ACCEPTED` | Named authorized decision-maker, reason, scope, and any required follow-up; project policy permits this disposition |

An author saying “intentional” is insufficient without the relevant contract or an authorized decision. A new commit, resolved thread, or passing unrelated test is insufficient for `FIXED`. Reopen a finding if later evidence invalidates its disposition; preserve its ID and prior rationale.

## Verification ledger

| Check | Version / snapshot | Command or procedure | Result and evidence |
| --- | --- | --- | --- |
| Relevant test/build/exercise | Exact commit or content snapshot | Actual command, environment details only when they affect behavior | Passed, failed, unavailable, or not applicable with reason; include significant output |

Keep committed CI evidence and local dirty-tree evidence distinguishable. Only reuse a check after a change when its inputs are demonstrably unaffected and reuse is allowed by project policy. Explicitly mark stale or missing results; do not silently carry a green status forward.

## Final report shape

Adapt to the user's required format while preserving these facts:

```text
Review: <base/head or local snapshot; scope; review or review-and-fix>
Decision: READY | CHANGES_REQUESTED | NEEDS_EVIDENCE | REPLAN
Change risk: <level and concrete reason; relevant approval policy>
Findings: <blocking count, IDs/severities, disposition and evidence>
Verification: <current-version checks, outcomes, unavailable evidence>
Remaining risk: <accepted issues, coverage limits, significant unknowns>
Repair rounds: <used/budget, only if repairs were performed>
Next action: <concrete action and responsible person/role when known>
```

List important findings before minor detail. Include unresolved evidence gaps even when a known defect determines `CHANGES_REQUESTED`. If required approvals remain pending, do not label the entire PR `READY`; distinguish a completed code examination from overall readiness. Do not invent extra approvals for a deliberately narrower review.
