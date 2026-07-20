# Status Schema

Use schema version 2 and one canonical state vocabulary.

## Top-level shape

```json
{
  "schemaVersion": 2,
  "skill": "idea-incubation",
  "ideaId": "idea-20260720-example",
  "title": "Example idea",
  "currentPhase": "painpoints",
  "highestMeaningfulPhase": "scenarios",
  "workflowStatus": "paused",
  "decision": "pending",
  "activeRun": {
    "requestedPhase": "painpoints",
    "mode": "target",
    "reflowCeiling": null,
    "startedAt": "2026-07-20T10:30:00+08:00"
  },
  "pendingQuestion": {
    "id": "q-painpoints-001",
    "phase": "painpoints",
    "field": "observed_frequency",
    "question": "How often does this problem occur in the current workflow?",
    "reason": "Frequency can change the pain validation decision.",
    "askedAt": "2026-07-20T10:32:00+08:00"
  },
  "phases": {
    "intake": {
      "status": "passed",
      "decision": "continue",
      "artifact": "00-idea-intake.md",
      "researchArtifact": "research/00-intake-research.md",
      "evidenceLevel": "low",
      "revision": 1,
      "qualityGate": {
        "input": "ready",
        "output": "passed",
        "missingFields": [],
        "questionCount": 0,
        "lastCheckedAt": "2026-07-20T10:05:00+08:00"
      },
      "error": null,
      "updatedAt": "2026-07-20T10:05:00+08:00"
    }
  },
  "missingInformation": ["Observed pain frequency"],
  "nextActions": ["Answer q-painpoints-001"],
  "createdAt": "2026-07-20T10:00:00+08:00",
  "updatedAt": "2026-07-20T10:32:00+08:00"
}
```

`phases` must contain exactly the twelve canonical phase keys. The example shows one complete phase record only to define its shape; bootstrap every other phase with `status: pending`, `decision: null`, its canonical artifact paths, `evidenceLevel: null`, `revision: 0`, unchecked gates, and `error: null`.

## Workflow status

- `active`: ready to execute or currently progressing.
- `paused`: waiting for one pending user question, external evidence, or recoverable failure.
- `completed`: assembly passed both gates and produced a final decision.
- `closed`: a gate ended incubation before assembly with `idea_pool`, `deferred`, or `rejected`.

`activeRun.mode` is `target`, `revision`, `reflow`, or `recovery`. Keep the run while paused so an answer can continue to the stored `requestedPhase` and `reflowCeiling`; set it to `null` only after the planned range completes or the workflow closes.

## Phase status and decisions

- `pending`: not started; decision is `null`.
- `running`: currently executing; decision is `null`.
- `passed`: valid against the complete canonical prefix; decision is `continue`.
- `stale`: invalidated by an upstream revision; decision is `revise` only when this phase requested the revision, otherwise `null`.
- `needs_data`: waiting for context or evidence; decision is `need_data`.
- `blocked`: recoverable dependency, tool, or interrupted-write failure; decision is `retry`.
- `stopped`: ended incubation with a terminal decision; decision is `stop`.

`revise` requires a canonical `targetPhase`, reason, affected artifacts, and unresolved questions. Record it in the phase conclusion and workflow log, mark the requesting phase `stale`, and route to the target.

Final decisions are `pending`, `approved_requirement`, `idea_pool`, `deferred`, and `rejected`.

## Quality-gate state

- Input gate: `unchecked`, `needs_context`, or `ready`.
- Output gate: `unchecked`, `passed`, or `failed`.
- Increment `questionCount` when a new question is persisted, not when an answer arrives.
- Keep `missingFields` limited to decision-relevant gaps.
- A `passed` phase requires input `ready` and output `passed`.
- The first passed artifact has revision `1`; increment only after a later revision passes its output gate.

## Pending question

- At most one `pendingQuestion` may exist in a workspace.
- Its phase must equal `currentPhase`.
- Its phase must use input gate `needs_context`, status `needs_data`, decision `need_data`, and a positive question count.
- Its ID is stable until answered, withdrawn, or explicitly marked unavailable.
- Persist the raw answer in `logs/workflow.log` before clearing it.
- A paused question loop uses `needs_data/need_data`; do not use `blocked/retry` for missing user context.

## Derived fields

- Derive `highestMeaningfulPhase` as the last phase in the longest continuous prefix whose phases are `passed`, whose gates passed, and whose artifacts exist.
- Set `currentPhase` to the running phase, paused phase, stopped phase when closed, first phase after the valid prefix, or `assemble` when completed.
- Derive these fields after every transition; never advance them merely because a later artifact exists.

## Invariants

- A phase is `passed` only when its phase and research artifacts exist and both quality gates pass.
- No phase may be `passed` when an earlier canonical phase is unresolved.
- `completed` requires `assemble.status = passed`, no pending question, and a non-pending final decision.
- `closed` requires `idea_pool`, `deferred`, or `rejected`.
- `active` and `paused` workflows require final decision `pending`.
- `paused` due to user context requires exactly one pending question; a research-only or recovery pause may have none.
- `running` left by an earlier invocation must enter interruption recovery before new routing.
- A `blocked` phase requires a non-null `error` describing the recoverable failure.
- Reopening a terminal workflow resets the top-level decision to `pending` but preserves prior decisions in artifacts and workflow events.
- Timestamps use ISO 8601 with timezone.

## Migration from schema version 1

1. Normalize legacy phase identifiers.
2. Add all missing canonical phase records.
3. For a previously passed phase, verify both artifacts and the phase conclusion before marking its gates `ready/passed`; otherwise mark it `stale`.
4. Convert an unresolved `running` phase through interruption recovery.
5. Add `activeRun`, `pendingQuestion`, gate state, error state, and question counters.
6. Recompute the valid prefix and derived fields.
