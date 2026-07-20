# Routing Rules

Use deterministic phase routing. The public interface remains `/idea-incubation <phase> [phase-input]`.

## Valid prefix

Every phase requires a valid canonical prefix: all earlier phases must be `passed`, their phase and research artifacts must exist, their decisive evidence must remain sufficiently current, and none may be `stale`, `needs_data`, `blocked`, or `stopped`.

`highestMeaningfulPhase` is the last phase in the longest continuous valid prefix starting at `intake`. Derive it after every state change; do not advance it independently.

`currentPhase` is:

1. the phase being executed when one is `running`;
2. the phase awaiting context or recovery when paused;
3. otherwise the first phase after `highestMeaningfulPhase`;
4. `assemble` when the workflow is completed.

## Route decision table

| Condition | Route |
|---|---|
| New `intake` with sufficient raw idea | Bootstrap, then run `intake` |
| Requested phase has missing or invalid earlier phases | Run from the earliest invalid phase through the target |
| Requested phase is `passed`, valid, has sufficiently current evidence, and has no new input | No-op; report the existing result |
| Requested phase has new material input | Revise it and reflow through the snapshot ceiling |
| Requested phase is `needs_data` and the user answers the pending question | Persist the answer and reevaluate that phase's input gate |
| Requested phase is `blocked` | Run recovery checks, then retry the blocked phase |
| Workflow is `completed` or `closed`, with no new information | No-op; preserve the terminal decision |
| Workflow is terminal and receives new material information or explicit reevaluation | Reopen, reset final decision to `pending`, and route as a revision |

New material input means a user fact, constraint, correction, decision, evidence, or explicit reevaluation request that can change the phase conclusion. Rephrasing, requesting a summary, or invoking the same valid phase without input is not material.

Keep `activeRun.requestedPhase`, mode, and reflow ceiling while a question pauses execution. After the answer passes the paused phase gate, continue the original planned range without requiring another slash command. Clear `activeRun` only when that range completes or the workflow closes.

## Revision and reflow

1. Snapshot `highestMeaningfulPhase` before revision.
2. Set workflow status to `active` and final decision to `pending` when reopening a terminal workflow.
3. Revise the requested phase first.
4. Mark every later phase through the snapshot ceiling `stale`.
5. Re-execute stale phases in canonical order through the ceiling.
6. Stop immediately when any phase pauses, blocks, or closes the workflow.
7. If the target is later than the snapshot ceiling, heal the valid prefix and continue through the target.

This conservative all-later-phases rule is intentional. It prevents an agent from silently declaring a downstream artifact unaffected without revalidating it.

## Interruption recovery

When a phase is left `running` from a previous invocation:

1. Inspect the phase artifact, research artifact, source registry, and latest workflow events.
2. If both artifacts are complete and pass the output gate, reconcile the missing registry or status update and apply the recorded conclusion.
3. If writes are partial or inconsistent, preserve them as superseded draft content, mark the phase `blocked` with decision `retry`, and record `interrupted_write`.
4. Re-run the input gate before retrying; do not increment revision until the output gate passes.
5. Never infer completion only from an artifact's existence.

## Loop safety

Do not auto-revise the same target repeatedly without new evidence. If the same contradiction survives two reflow attempts, set `needs_data` and ask one decision-focused question. If the issue is an execution failure, use `blocked` and `retry` instead.
