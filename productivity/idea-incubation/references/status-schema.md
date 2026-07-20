# Status Schema

Use one canonical state vocabulary.

```json
{
  "schemaVersion": 1,
  "skill": "idea-incubation",
  "ideaId": "idea-20260720-example",
  "title": "Example idea",
  "currentPhase": "painpoints",
  "highestMeaningfulPhase": "scenarios",
  "workflowStatus": "active",
  "decision": "pending",
  "createdAt": "2026-07-20T10:00:00+08:00",
  "updatedAt": "2026-07-20T10:30:00+08:00",
  "phases": {
    "intake": {
      "status": "passed",
      "decision": "continue",
      "artifact": "00-idea-intake.md",
      "researchArtifact": "research/00-intake-research.md",
      "evidenceLevel": "low",
      "revision": 1,
      "updatedAt": "2026-07-20T10:05:00+08:00"
    }
  },
  "missingInformation": [],
  "nextActions": []
}
```

## Workflow status

- `active`: ready to execute or currently progressing.
- `paused`: waiting for user input, research, or a decision.
- `completed`: assembly finished and produced a final decision.
- `closed`: a gate ended the workflow before assembly with `idea_pool`, `deferred`, or `rejected`.

## Phase status

- `pending`: not started.
- `running`: currently executing.
- `passed`: completed and valid against current inputs.
- `stale`: invalidated by an upstream revision.
- `needs_data`: waiting for evidence or user input.
- `blocked`: stopped by an unresolved dependency or execution failure.
- `stopped`: the phase ended incubation with a terminal decision.

Phase decisions are `continue`, `revise`, `need_data`, and `stop`.

Final decisions are `pending`, `approved_requirement`, `idea_pool`, `deferred`, and `rejected`.

## Invariants

- A phase is `passed` only when both its phase and research artifacts exist.
- `completed` requires `assemble.status = passed` and a non-pending final decision.
- `closed` requires `decision` to be `idea_pool`, `deferred`, or `rejected`.
- `currentPhase` is the running, paused, or recommended next phase.
- `highestMeaningfulPhase` never advances past stale or failed work.
- `revise` requires a canonical `targetPhase` in the phase document and workflow log.
- Timestamps use ISO 8601 with timezone.
