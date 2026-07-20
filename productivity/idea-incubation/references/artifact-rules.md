# Artifact Rules

## Workspace

Create one durable workspace per idea:

```text
.idea-incubation/ideas/<idea-id>/
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

For legacy workspaces under `.idea-workspace/ideas/`, continue in place unless the user requests migration. Normalize legacy identifiers in `status.json` without discarding artifacts.

## Bootstrap

1. Generate `idea-YYYYMMDD-short-slug`.
2. Create `research/`, `sources/`, and `logs/`.
3. Initialize every canonical phase as `pending`.
4. Initialize `sources/sources.json` as `{ "sources": [] }`.
5. Run `intake` before any later phase.

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
status: passed | needs_data | blocked | stopped
decision: continue | revise | need_data | stop
evidenceLevel: high | medium | low
targetPhase: <required only for revise>
```

`11-requirement.md` follows `phase-11-assemble.md` and still includes an Evidence Block and explicit conclusion.

## Write discipline

- Preserve prior conclusions when revising; mark superseded content explicitly.
- Write phase and research artifacts before marking the phase `passed`.
- Update `sources/sources.json` before `status.json`.
- Record transitions, revisions, pauses, and final decisions in `logs/workflow.log`.
- A failed or blocked phase still writes its phase and research documents.
- Never keep a downstream phase `passed` when an upstream dependency is `stale`.
