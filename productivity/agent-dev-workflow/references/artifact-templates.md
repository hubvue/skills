# Artifact Templates

These templates are structural guides, not rigid formatting mandates. Keep them concise, reviewable, and easy to update.

## `task.md`

```md
# Task

- Task ID: TASK-001-example
- Title: Example task
- Status: in_progress
- Current Phase: research
- Created At: YYYY-MM-DD
- Updated At: YYYY-MM-DD

## Original Request
...

## Scope
...

## Non-Goals
...

## Constraints
...

## Dependencies
...

## Related Tasks
...

## Phase History
- YYYY-MM-DD: intake created
- YYYY-MM-DD: research updated

## Notes
...
```

## `research.md`

```md
# Research

- Task ID: TASK-001-example
- Title: Example task
- Research Objective: Understand current implementation and risks

## Current Understanding
...

## Relevant Files / Modules
- path/to/file.ts - why it matters
- path/to/component.tsx - why it matters

## Data / Control / UI Flow
...

## Constraints Discovered
...

## Risks
...

## Unknowns
...

## Recommendations for Plan
...

## Change Log
- YYYY-MM-DD: initial research
- YYYY-MM-DD: updated for new requirement
```

## `plan.md`

```md
# Plan

- Task ID: TASK-001-example
- Title: Example task

## Goal
...

## Scope Confirmation
...

## Research Summary
...

## Proposed Approach
...

## File / Module Impact
- path/to/file.ts
- path/to/other-file.ts

## Step-by-Step Change Strategy
1. ...
2. ...
3. ...

## Trade-Offs / Alternatives
...

## Risks
...

## Validation / Testing Strategy
...

## Open Questions
...

## Review / Annotation Notes
...

## Revision History
- YYYY-MM-DD: initial plan
- YYYY-MM-DD: revised for scope change
```

## `todo.md`

```md
# Todo

- Task ID: TASK-001-example
- Title: Example task

## Phase 1 - Preparation
- [ ] ...
- [ ] ...

## Phase 2 - Main Implementation
- [ ] ...
- [ ] ...

## Phase 3 - Validation
- [ ] ...
- [ ] ...

## Blockers / Dependencies
...

## Revision Notes
- YYYY-MM-DD: initial todo
```

## `implementation-log.md`

```md
# Implementation Log

- Task ID: TASK-001-example
- Title: Example task
- Updated At: YYYY-MM-DD HH:MM

## Files Changed
- ...
- ...

## Work Completed
...

## Deviations
...

## Verification Performed
- typecheck: pass/fail/not run
- tests: pass/fail/not run
- build: pass/fail/not run

## Remaining Issues
...

## Next Actions
...
```

## `review-notes.md`

```md
# Review Notes

- Task ID: TASK-001-example

## Review Round
1

## Human Comments
...

## Constraints Added
...

## Questions
...

## Resolution Notes
...
```

## `decision-log.md`

```md
# Decision Log

- Task ID: TASK-001-example

## Decision
...

## Alternatives Considered
...

## Reason
...

## Impact
...

## Timestamp
YYYY-MM-DD HH:MM
```

## `status.json`

```json
{
  "task_id": "TASK-001-example",
  "title": "Example task",
  "current_phase": "plan",
  "status": "in_progress",
  "available_artifacts": {
    "task.md": true,
    "research.md": true,
    "plan.md": true,
    "todo.md": false,
    "implementation-log.md": false,
    "review-notes.md": false,
    "decision-log.md": false,
    "status.json": true
  },
  "blockers": [],
  "next_recommended_phase": "todo",
  "last_updated": "YYYY-MM-DDTHH:MM:SSZ"
}
```

## Template guidance

Across all artifacts:
- preserve revision history
- prefer additive updates over destructive rewrite
- make unknowns explicit
- keep sections stable so later updates remain readable
