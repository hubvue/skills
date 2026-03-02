# Update Rules

## Modes

This workflow supports two primary modes:

### Create mode
Use when:
- the task does not exist yet
- the artifact does not exist yet
- the user explicitly asks to create a new task

### Update mode
Use when:
- the task already exists
- the user is refining, continuing, or revising existing work
- the artifact already exists and should be extended

## Default rule

Default to **update mode** when an artifact already exists.

Do not overwrite by default.

## Rebuild rule

Only rebuild or replace an artifact when:
- the user explicitly asks for a rebuild
- the current artifact is clearly unusable and the reason is stated
- preserving the old version separately is still possible

If rebuilding:
- say that you are rebuilding
- preserve old context in a revision note when possible

## Preserve history

Preserve history for:
- scope changes
- revised assumptions
- plan changes
- completed todo state
- implementation deviations
- review outcomes

History may be preserved via:
- changelog entries
- revision history sections
- obsolete/revised markers
- appended notes

## Revision conventions

Recommended conventions:

- **Change Log** for research updates
- **Revision History** for plan changes
- **Revision Notes** for todo changes
- **Deviations** for implementation divergence
- **Phase History** for task lifecycle updates

## Obsolete / revised handling

When an earlier item is no longer valid:
- do not silently delete it
- mark it as obsolete, superseded, revised, or invalidated
- explain why when helpful

Examples:
- a todo item can be marked "obsolete after API contract change"
- a plan section can be marked "superseded by revision 2"
- a research assumption can be marked "invalidated by new requirement"

## Iterative requirement changes

When the same task changes over time:
- update `task.md` scope and notes
- update `research.md` findings and assumptions
- update `plan.md` revision history
- update `todo.md` while preserving valid completion state
- update `implementation-log.md` with what changed this round
- update `status.json` to reflect the current phase and next action

## Anti-patterns to avoid

Avoid these behaviors:
- full-document overwrite with no revision trail
- deleting completed todo history
- pretending a revised requirement was always the original requirement
- implementing based on stale plan without noting the mismatch
- merging unrelated tasks because they appear nearby in conversation
