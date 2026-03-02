# Phase: Todo

## Goal

Convert the plan into an execution-ready checklist.

## Must do

- derive checklist items from `plan.md`
- group work into logical phases or workstreams
- preserve ordering when dependencies matter
- note blockers or prerequisites when relevant
- create or update `todo.md`

## Must not do

- do not introduce major new scope that is absent from the plan
- do not discard already completed items without explanation
- do not create vague checklist items that cannot guide implementation

## Required output

- `todo.md`

## Recommended `todo.md` structure

- Task ID
- Title
- Execution Groups / Phases
- Checkbox Items
- Optional Blockers / Dependencies
- Revision Notes

Example shape:

```md
# Todo

## Phase 1 - API alignment
- [ ] Review current contract
- [ ] Update request payload mapping
- [ ] Normalize response shape

## Phase 2 - UI updates
- [ ] Update form validation
- [ ] Add loading and error states
```

## Update mode

If `todo.md` already exists:
- keep completed items that remain valid
- mark invalidated items as revised or obsolete instead of silently deleting them
- add new items for new plan changes
- preserve a readable revision trail

## Todo quality bar

A good todo list should make implementation feel mechanical rather than improvised.
