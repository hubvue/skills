# Status Schema

Maintain `status.json` as the machine-readable task state.

Recommended shape:

```json
{
  "task_id": "TASK-001-login-refactor",
  "title": "Login refactor",
  "current_phase": "implement",
  "phase_state": "in_progress",
  "workflow_state": "active",
  "completed_phases": ["intake", "research", "plan", "todo"],
  "pending_phases": ["implement", "test", "review"],
  "highest_completed_phase": "todo",
  "requested_target_phase": null,
  "last_explicit_phase_request": null,
  "reflow": {
    "active": false,
    "source_phase": null,
    "target_phase": null,
    "reason": null
  },
  "bugfix_loop_active": false,
  "test_status": "not_started",
  "review_status": "not_started",
  "verification": {
    "lint": "unknown",
    "typecheck": "unknown",
    "unit_test": "unknown",
    "build": "unknown"
  },
  "bug_summary": {
    "open": 0,
    "in_progress": 0,
    "fixed_pending_retest": 0,
    "closed": 0
  },
  "execution_mode": "single_agent",
  "agent_team": {
    "available": false,
    "asked": false,
    "enabled": false,
    "main_role": "project_manager"
  },
  "blockers": [],
  "next_action": "Implement todo items",
  "last_updated": "2026-03-10T00:00:00Z"
}
```

## Field Guidance

- `current_phase`
  One of: intake, research, plan, todo, implement, test, bugfix, review

- `phase_state`
  One of: not_started, in_progress, blocked, completed

- `workflow_state`
  One of: active, blocked, waiting_user_confirmation, reflowing, review_ready, completed

- `highest_completed_phase`
  Highest phase that has been meaningfully completed.

- `requested_target_phase`
  Current explicit target phase for this execution pass. Use `null` if no explicit phase target was requested.

- `last_explicit_phase_request`
  The most recent explicit phase named by the user, if any.

- `reflow`
  Tracks whether an upstream change is being propagated forward.

- `test_status`
  One of: not_started, in_progress, passed, failed, blocked, partial

- `review_status`
  One of: not_started, in_progress, passed, needs_followup, blocked

- `execution_mode`
  One of: single_agent, agent_team

- `agent_team.available`
  Whether the runtime supports agent team.

- `agent_team.asked`
  Whether the user has already been asked whether to enable agent team for this task.

- `agent_team.enabled`
  Whether the user approved agent team mode for this task.

## Important Semantics

### 1. No explicit phase requested

If the user did not specify a target phase:
- `requested_target_phase` should be `null`
- execute only one next appropriate phase
- after phase completion, set:
  - `workflow_state` = `waiting_user_confirmation`
  - `next_action` = next recommended phase

### 2. Explicit phase requested

If the user specified a target phase:
- set `requested_target_phase` to that phase
- execute continuously until that phase is completed
- after reaching the target, clear `requested_target_phase` back to `null`

### 3. Existing phase revision

If the user explicitly requests an already existing phase:
- treat it as revision/update, not recreation
- preserve `highest_completed_phase` unless the revision invalidates downstream phases
- if downstream invalidation occurs, activate `reflow`

### 4. Reflow semantics

If an upstream phase is revised while the task is already at a later phase:
- set:
  - `reflow.active` = true
  - `reflow.source_phase` = revised upstream phase
  - `reflow.target_phase` = original current/highest phase
  - `workflow_state` = `reflowing`
- once all downstream artifacts are synchronized and the original current phase is re-reached:
  - set `reflow.active` = false
  - clear `reflow.source_phase` and `reflow.target_phase`
  - restore normal workflow state

### 5. Test failure semantics

If test finds defects, set:
- `test_status` = failed
- `bugfix_loop_active` = true
- `current_phase` = bugfix

### 6. Bugfix completion semantics

If bugfixes are applied but not retested:
- keep defect status as `fixed_pending_retest`
- keep `bugfix_loop_active` = true
- set `current_phase` back to `test` only when the task is explicitly handed off for retest

### 7. Review gate semantics

Review should normally begin only when:
- testing has sufficiently converged
- no critical unresolved defects remain
- the task is not in an active bugfix loop

### 8. Agent team semantics

If Claude Code agent team capability is available:
- ask the user whether to enable it before substantive execution
- once asked, set `agent_team.asked` = true
- if user agrees:
  - `execution_mode` = `agent_team`
  - `agent_team.enabled` = true
- if user declines:
  - `execution_mode` = `single_agent`
  - `agent_team.enabled` = false

The main agent remains the single authority for:
- final artifact updates
- phase transitions
- status transitions
