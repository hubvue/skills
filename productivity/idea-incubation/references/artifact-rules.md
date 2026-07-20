# Artifact Rules

## Workspace

Create one durable workspace per idea and one durable active-workspace pointer:

```text
.idea-incubation/
  active.json
  ideas/<idea-id>/
    00-idea-intake.md
    01-motivation.md
    02-users.md
    03-scenarios.md
    04-painpoints.md
    05-value.md
    06-feasibility.md
    07-goals.md
    08-solution.md
    09-scope.md
    10-acceptance.md
    11-requirement.md
    decision.md
    status.json
    research/
      00-intake-research.md
      01-motivation-research.md
      02-users-research.md
      03-scenarios-research.md
      04-painpoints-research.md
      05-value-research.md
      06-feasibility-research.md
      07-goals-research.md
      08-solution-research.md
      09-scope-research.md
      10-acceptance-research.md
      11-assemble-research.md
    sources/
      sources.json
      source-summary.md
    logs/
      workflow.log
```

`active.json` contains:

```json
{
  "schemaVersion": 1,
  "ideaId": "idea-20260720-example",
  "workspace": "ideas/idea-20260720-example",
  "updatedAt": "2026-07-20T10:00:00+08:00"
}
```

When workspace selection is ambiguous, use the same file as a durable selection pause:

```json
{
  "schemaVersion": 1,
  "ideaId": null,
  "workspace": null,
  "pendingSelection": {
    "id": "select-001",
    "question": "Which idea do you want to continue?",
    "requestedPhase": "scope",
    "phaseInput": null,
    "candidates": [
      { "ideaId": "idea-20260720-example", "title": "Example idea", "workspace": "ideas/idea-20260720-example" }
    ],
    "askedAt": "2026-07-20T10:00:00+08:00"
  }
}
```

For legacy workspaces under `.idea-workspace/ideas/`, continue in place unless the user requests migration. Normalize legacy identifiers in `status.json` without discarding artifacts.

## Workspace resolution

Resolve in this order:

1. an answer to `active.json.pendingSelection`;
2. an idea ID explicitly named by the user;
3. a valid selected `active.json` pointer;
4. the only existing idea workspace;
5. a new descriptive workspace when `intake` receives a raw idea and no workspace is selected;
6. a new `idea-YYYYMMDD-draft` workspace when no workspace exists and the requested workflow lacks a raw idea, so `activeRun` and the first intake question can be persisted.

Update `active.json` after an explicit or unique selection. When no pointer exists and multiple candidates remain, persist one `pendingSelection`, list concise titles, ask exactly one question asking which idea to use, and do not mutate any phase. After the answer, resolve the selection, clear `pendingSelection`, and continue the stored request. When a draft is created for a later requested phase, store that target in `activeRun`, ask the intake gate's first question, then heal forward after the answer.

When an active workspace exists, treat `/idea-incubation intake <input>` as an intake revision unless the input explicitly says it is a new idea. If a new idea is explicit, create and activate a new workspace without altering the prior one.

## Bootstrap

1. Generate `idea-YYYYMMDD-short-slug`, or `idea-YYYYMMDD-draft` until a raw idea is available.
2. Create `research/`, `sources/`, and `logs/`.
3. Initialize all twelve canonical phase records as `pending`.
4. Initialize `sources/sources.json` as `{ "sources": [] }`.
5. Initialize schema-version-2 gate, question, run, and error state.
6. Write or update `.idea-incubation/active.json`.
7. Run `intake` before any later phase.

## Phase document contract

Every numbered phase document except the final assembled requirement contains:

1. Phase goal
2. Inputs read
3. Known information
4. Phase-specific analysis and output
5. Missing information
6. Risks and uncertainty
7. Evidence Block
8. Phase conclusion
9. Downstream handoff

The phase conclusion contains:

```yaml
status: passed | stale | needs_data | blocked | stopped
decision: continue | revise | need_data | retry | stop
evidenceLevel: high | medium | low
targetPhase: <required only for revise>
```

`11-requirement.md` follows `phase-11-assemble.md` and still includes an Evidence Block and explicit conclusion.

## Write discipline

- Preserve prior conclusions when revising; mark superseded content explicitly.
- Write phase and research artifacts before marking the phase `passed`.
- Update `sources/sources.json` before `status.json`.
- Record transitions, gates, questions, answers, revisions, pauses, recovery, and final decisions in `logs/workflow.log`.
- When the input gate fails before drafting, persist the question in status and log; do not fabricate phase or research content merely to create files.
- When analysis has begun, preserve a failed or blocked draft and research record with an explicit non-passed conclusion.
- Never keep a downstream phase `passed` when an upstream dependency is `stale`.
- Set `revision` to `1` when the first output passes. Increment it only after a revised output passes; questions and failed attempts do not change it.

## Workflow log

Use append-only JSON Lines. Each line contains `at`, `event`, `phase`, optional `runId`, and `data`.

Required event names are `workspace_selected`, `phase_started`, `quality_gate_passed`, `quality_gate_failed`, `question_asked`, `question_answered`, `research_completed`, `phase_passed`, `phase_stale`, `phase_blocked`, `phase_stopped`, `workflow_reopened`, and `workflow_completed`.

Persist the exact user answer in `question_answered.data.answer`. Never store the answer only in chat history. Do not rewrite previous events when correcting state; append a reconciliation event.

## Structural validation

Run `node scripts/validate-workspace.js <idea-workspace>` after migration and after every state-changing invocation. The validator checks the active pointer, canonical phase records, valid status/decision pairs, gate state, artifact existence, source uniqueness, question invariants, valid-prefix derivation, terminal state, and JSONL log syntax.

A validation failure is not a quality-gate pass. Repair inconsistent writes when safe; otherwise record the responsible phase as `blocked/retry` with the validator errors.
